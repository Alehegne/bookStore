"use client";

import { useState } from "react";
import type React from "react";
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
import { Textarea } from "@/components/ui/textArea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Swal from "sweetalert2";

const dummyAutho = [
  "alex",
  "fdhdfds",
  "dfhdfhfd",
  "fddfhdsfjdsfhfdssssssssssss",
  "fdhsdjsdhfdfds",
];
const dummyCategory = ["fiction", "novel", "Science", "Bible"];
const dummyPublisher = ["fiction", "novel", "Science", "Bible"];
const dummyLang = ["English", "spanish", "portugalese", "french"];

export function NewBookDialog({ children }: { children: React.ReactNode }) {
  const [open, onopenchange] = useState(false);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    isbn: "",
    publisher: "",
    published: "",
    edition: "",
    language: "",
    price: "",
    stock: "",
    threshold: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submitting..................");

    if (!formData.title || !formData.author || !formData.category) {
      Swal.fire({
        title: "Error!",
        text: "Please fill all required fields.",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
        showCloseButton: true,
        backdrop: "hidden",
        allowOutsideClick: false,
      }).then(() => {
        setLoading(false);
      });

      return;
    }

    setLoading(true);
    console.log("form data", formData);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Show success message
    Swal.fire({
      title: "success!",
      text: "successfull added",
      timer: 2000,
    });

    // Reset form and close dialog
    setLoading(false);
    setFormData({
      title: "",
      author: "",
      category: "",
      isbn: "",
      publisher: "",
      published: "",
      edition: "",
      language: "",
      price: "",
      stock: "",
      threshold: "",
      description: "",
    });
    onopenchange(false);
    setStep(1);
  };

  console.log("rendering ..................");

  const steps = [
    {
      title: "Basic Information",
      fields: (
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title <span className="text-red">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Book title"
              className="col-span-3"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="author" className="text-right">
              Author <span className="text-destructive">*</span>
            </Label>
            <Select
              onValueChange={(value) => handleSelectChange("author", value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select author" />
              </SelectTrigger>
              <SelectContent
                style={{ scrollbarWidth: "none" }}
                className="bg-white w-full overflow-x-hidden overflow-y-scroll"
              >
                {dummyAutho.map((author, index) => (
                  <SelectItem
                    className="hover:bg-gray-100"
                    key={index}
                    value={author}
                  >
                    {author}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category <span className="text-red-600">*</span>
            </Label>
            <Select
              onValueChange={(value) => handleSelectChange("category", value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent
                style={{ scrollbarWidth: "none" }}
                className="bg-white w-full overflow-x-hidden overflow-y-scroll"
              >
                {dummyCategory.map((cate, index) => (
                  <SelectItem
                    className="hover:bg-gray-100"
                    key={index}
                    value={cate}
                  >
                    {cate}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isbn" className="text-right">
              ISBN
            </Label>
            <Input
              id="isbn"
              placeholder="ISBN number"
              className="col-span-3"
              value={formData.isbn}
              onChange={handleChange}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Publishing Details",
      fields: (
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="publisher" className="text-right">
              Publisher
            </Label>
            <Select
              onValueChange={(value) => handleSelectChange("publisher", value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select publisher" />
              </SelectTrigger>

              <SelectContent
                style={{ scrollbarWidth: "none" }}
                className="bg-white w-full overflow-x-hidden overflow-y-scroll"
              >
                {dummyPublisher.map((pub, index) => (
                  <SelectItem
                    className="hover:bg-gray-100"
                    key={index}
                    value={pub}
                  >
                    {pub}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="published" className="text-right">
              Published
            </Label>
            <Input
              id="published"
              type="date"
              className="col-span-3"
              value={formData.published}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edition" className="text-right">
              Edition
            </Label>
            <Input
              id="edition"
              placeholder="e.g. First Edition"
              className="col-span-3"
              value={formData.edition}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="language" className="text-right">
              Language
            </Label>
            <Select
              onValueChange={(value) => handleSelectChange("language", value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent
                style={{ scrollbarWidth: "none" }}
                className="bg-white w-full overflow-x-hidden overflow-y-scroll"
              >
                {dummyLang.map((lang, index) => (
                  <SelectItem
                    className="hover:bg-gray-100"
                    key={index}
                    value={lang}
                  >
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
    },
    {
      title: "Inventory & Pricing",
      fields: (
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="0.00"
              className="col-span-3"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock" className="text-right">
              Stock
            </Label>
            <Input
              id="stock"
              type="number"
              placeholder="0"
              className="col-span-3"
              value={formData.stock}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="threshold" className="text-right">
              Low Stock Threshold
            </Label>
            <Input
              id="threshold"
              type="number"
              placeholder="10"
              className="col-span-3"
              value={formData.threshold}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Book description"
              className="col-span-3"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>
      ),
    },
  ];

  const resetDialog = () => {
    setStep(1);
    setFormData({
      title: "",
      author: "",
      category: "",
      isbn: "",
      publisher: "",
      published: "",
      edition: "",
      language: "",
      price: "",
      stock: "",
      threshold: "",
      description: "",
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        onopenchange(open);
        if (!open) {
          resetDialog();
        }
      }}
    >
      <DialogTrigger asChild onClick={() => onopenchange(false)}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Book</DialogTitle>
            <DialogDescription>
              {step} of {steps.length}: {steps[step - 1].title}
            </DialogDescription>
          </DialogHeader>

          {steps[step - 1].fields}

          <DialogFooter className="flex items-center justify-between">
            <div className="flex gap-1">
              {Array.from({ length: steps.length }).map((_, i) => (
                <div
                  onClick={() => setStep(i + 1)}
                  key={i}
                  className={`h-1.5 w-6 cursor-pointer rounded-full ${
                    i + 1 === step ? "bg-primary" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    setStep((prev) => prev - 1);
                  }}
                  disabled={loading}
                >
                  Previous
                </Button>
              )}
              {step < steps.length ? (
                <Button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setStep((prev) => prev + 1);
                  }}
                  disabled={loading}
                >
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={loading}>
                  {loading ? "Adding..." : "Add Book"}
                </Button>
              )}
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
