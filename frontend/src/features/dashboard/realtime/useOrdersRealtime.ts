"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { baseApi } from "@/features/api/baseApi";
import type { AppDispatch } from "@/store";

import { createOrdersSocket, type OrderRealtimeMessage } from "./ordersSocket";

type ConnectionState =
  | "idle"
  | "connecting"
  | "connected"
  | "reconnecting"
  | "disconnected"
  | "error";

const RECONNECT_DELAYS = [1000, 2000, 5000, 10000];

export function useOrdersRealtime(enabled = true) {
  const dispatch = useDispatch<AppDispatch>();

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reconnectAttemptsRef = useRef(0);
  const stoppedRef = useRef(false);

  const [connectionState, setConnectionState] =
    useState<ConnectionState>("idle");

  const invalidateOrders = useCallback(() => {
    dispatch(baseApi.util.invalidateTags(["Order"]));
  }, [dispatch]);

  useEffect(() => {
    if (!enabled) {
      setConnectionState("idle");
      return;
    }

    stoppedRef.current = false;
    reconnectAttemptsRef.current = 0;

    const clearReconnectTimer = () => {
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
        reconnectTimerRef.current = null;
      }
    };

    const scheduleReconnect = () => {
      if (stoppedRef.current) {
        return;
      }

      clearReconnectTimer();

      const attempt = reconnectAttemptsRef.current;

      const delay =
        RECONNECT_DELAYS[Math.min(attempt, RECONNECT_DELAYS.length - 1)];

      reconnectAttemptsRef.current += 1;

      setConnectionState("reconnecting");

      reconnectTimerRef.current = setTimeout(() => {
        reconnectTimerRef.current = null;
        connect();
      }, delay);
    };

    const connect = async () => {
      if (stoppedRef.current) {
        return;
      }

      try {
        if (reconnectAttemptsRef.current === 0) {
          setConnectionState("connecting");
        } else {
          setConnectionState("reconnecting");
        }

        const response = await fetch("/api/v1/auth/ws-token", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to get WebSocket token");
        }

        const data = (await response.json()) as {
          access_token?: string;
        };

        if (!data.access_token) {
          throw new Error("WebSocket access token is missing");
        }

        if (stoppedRef.current) {
          return;
        }

        const socket = createOrdersSocket({
          token: data.access_token,

          onOpen: () => {
            reconnectAttemptsRef.current = 0;

            setConnectionState("connected");

            // Sync orders immediately after connecting.
            invalidateOrders();
          },

          onMessage: (message: OrderRealtimeMessage) => {
            switch (message.event) {
              case "ORDER_CREATED":
              case "ORDER_UPDATED":
              case "ORDER_CANCELLED":
                invalidateOrders();
                break;

              default:
                break;
            }
          },

          onError: () => {
            setConnectionState("error");
          },

          onClose: () => {
            socketRef.current = null;

            if (stoppedRef.current) {
              setConnectionState("disconnected");
              return;
            }

            scheduleReconnect();
          },
        });

        socketRef.current = socket;
      } catch (error) {
        console.error("Orders WebSocket connection failed:", error);

        setConnectionState("error");

        scheduleReconnect();
      }
    };

    connect();

    return () => {
      stoppedRef.current = true;

      clearReconnectTimer();

      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }

      setConnectionState("disconnected");
    };
  }, [enabled, invalidateOrders]);

  return {
    connectionState,
    isConnected: connectionState === "connected",
  };
}
