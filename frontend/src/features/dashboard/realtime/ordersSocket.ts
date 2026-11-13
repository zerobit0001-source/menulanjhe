export type OrderRealtimeEvent =
  "ORDER_CREATED" | "ORDER_UPDATED" | "ORDER_CANCELLED";

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

function getWebSocketBaseUrl() {
  if (process.env.NEXT_PUBLIC_WS_URL) {
    return process.env.NEXT_PUBLIC_WS_URL;
  }

  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";

  return `${protocol}//${window.location.host}`;
}

export function createOrdersSocket({
  token,
  onMessage,
  onOpen,
  onClose,
  onError,
}: OrdersSocketOptions) {
  const socket = new WebSocket(
    `${getWebSocketBaseUrl()}/ws/v1/orders/?token=${encodeURIComponent(token)}`,
  );

  socket.onopen = () => {
    onOpen?.();
  };

  socket.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data) as OrderRealtimeMessage;

      onMessage?.(message);
    } catch (error) {
      console.error("Failed to parse orders WebSocket message:", error);
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
