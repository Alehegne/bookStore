import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

interface OrderStatusBadgeProps {
  status: string;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const getStatusColor = (status: string) => {
    if (!status) return "bg-gray-100 text-gray-800 hover:bg-gray-100/80";

    switch (status.toLowerCase()) {
      case "pending":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100/80";
      case "shipped":
        return "bg-green-100 text-green-800 hover:bg-green-100/80";
      case "delivered":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100/80";
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100/80";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100/80";
    }
  };

  return (
    <Badge className={cn("px-3 py-1 font-medium", getStatusColor(status))}>
      {!status ? "Unknown" : status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}
