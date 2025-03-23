import {z} from "zod";


export const newBookSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    publishedAt:z.date().optional(),
    coverImage: z.string().url("Invalid URL"),
    author: z.string().min(1, "Author is required"),
    rating:z.number().optional(),
    release: z.string().optional(),
    genre:z.array(z.string()).optional(),
    pages:z.number().optional(),
    newPrice:z.number().optional(),
    oldPrice:z.number().optional(),
    ISBN:z.string().optional(),
    publisher:z.string().optional(),
    Edition:z.string().optional(),
    language:z.string().optional(),
    stock:z.number().optional(),//the number of books available in the inventory
    lowStockThreshold:z.number().optional(),//the threshold for low stock

})


      //default values for the form
   export const defaultValues = {
        title: "",
        description: "",
        publishedAt:"",
        coverImage: "",
        author: "",
        rating:0,
        release: "",
        genre: [],
        pages:0,
        newPrice:0,
        oldPrice:0,
        ISBN:"",
        publisher:"",
        Edition:"",
        language:"English",
        stock:0,
        lowStockThreshold:0,
        };
    