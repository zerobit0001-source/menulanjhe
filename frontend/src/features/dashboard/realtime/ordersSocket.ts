export type OrderRealtimeEvent =
  | "ORDER_CREATED"
  | "ORDER_UPDATED"
  | "ORDER_CANCELLED";

export type OrderRealtimeMessage = {
  event: OrderRealtimeEvent;
  order: {
    id: string;
    status: string;
    table_id: string;
    total: string;
    created_at: string;
    [key: string]: unknown;
  };
};

type OrdersSocketOptions = {
  token: string;
  onMessage?: (message: OrderRealtimeMessage) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (event: Event) => void;
};

const WS_BASE_URL =
  process.env.NEXT_PUBLIC_WS_URL ?? "ws://127.0.0.1:8080";

export function createOrdersSocket({
  token,
  onMessage,
  onOpen,
  onClose,
  onError,
}: OrdersSocketOptions) {
  const socket = new WebSocket(
    `${WS_BASE_URL}/ws/v1/orders/?token=${encodeURIComponent(token)}`,
  );

  socket.onopen = () => {
    onOpen?.();
  };

  socket.onmessage = (event) => {
    try {
      const message = JSON.parse(
        event.data,
      ) as OrderRealtimeMessage;

      onMessage?.(message);
    } catch (error) {
      console.error(
        "Failed to parse orders WebSocket message:",
        error,
      );
    }
  };

  socket.onerror = (event) => {
    onError?.(event);
  };

  socket.onclose = () => {
    onClose?.();
  };

  return socket;
}