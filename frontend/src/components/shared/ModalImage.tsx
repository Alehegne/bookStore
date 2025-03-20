import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { book } from "@/types/types";
import clsx from "clsx";
import Image from "next/image";

export function ModalImage({
  children,
  slide,
  type,
}: {
  children: React.ReactNode;
  slide?: book;
  type: string;
}) {
  return (
    <Dialog>
      <div className="relative mb-0 p-0 bg-black w-full h-full overflow-hidden rounded-md border bg-muted">
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className=" rounded-md overflow-hidden">
          <DialogHeader className="display-none h-0 w-0">
            <DialogTitle className="sr-only">{slide?.title} image</DialogTitle>
            {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>  */}
          </DialogHeader>
          {slide?.coverImage && (
            <div
              className={clsx(
                "relative inset-0 mt-0 mb-0 w-[450px] h-[400px] overflow-hidden rounded-md"
                // type == "mobile"
                //   ? "w-[300px] h-[300px]"
                //   : "w-[500px] h-[500px] bg-gray-200",
                // type == "news" && "w-[500px] h-[300px] bg-gray-200"
              )}
            >
              <Image
                src={slide.coverImage}
                alt={slide.title}
                // width={`${type == "mobile" ? 300 : 500}`}
                // height={`${type == "news" ? 200 : 300}`}
                fill
                className="object-cover bg-black"
              />
            </div>
          )}
          {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div> */}
          {/* <DialogFooter>
          <Button type="submit">DownLoad the coverImage</Button>
        </DialogFooter> */}
        </DialogContent>
      </div>
    </Dialog>
  );
}
