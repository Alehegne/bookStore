import Image from "next/image";
import { BookOpen } from "lucide-react";
import { useGetBookByIdQuery } from "@/app/Redux/features/backendConnection/bookApi";

interface BookItemProps {
  id: string;
}

export function BookItem({ id }: BookItemProps) {
  const { data: book } = useGetBookByIdQuery({ id });
  return (
    <div className="py-4 flex items-start gap-4">
      <div className="relative h-[120px] w-[80px] overflow-hidden rounded-md border bg-muted">
        <Image
          src={book?.coverImage || "/placeholder.svg"}
          alt={book?.title || "Book Cover"}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 space-y-1">
        <h3 className="font-medium">{book?.title}</h3>
        <div className="flex items-center text-muted-foreground">
          <BookOpen className="h-4 w-4 mr-1" />
          <span>{book?.author}</span>
        </div>
        <p className="text-sm text-muted-foreground">Paperback</p>
      </div>
      <div className="text-right">
        <p className="font-medium">${book?.newPrice.toFixed(2)}</p>
        <p className="text-sm text-muted-foreground">Qty: 1</p>
      </div>
    </div>
  );
}
