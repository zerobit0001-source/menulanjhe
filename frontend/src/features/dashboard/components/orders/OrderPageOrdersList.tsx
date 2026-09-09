import { dashboardOrders } from "../../data/orders/demoOrders";
import OrderPageOrderCard from "./OrderPageOrderCard";

export default function OrderPageOrdersList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {dashboardOrders.map((order) => (
        <OrderPageOrderCard order={order} key={order.id} />
      ))}
    </div>
  );
}
