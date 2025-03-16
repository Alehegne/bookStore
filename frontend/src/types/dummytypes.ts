export type book = {
  _id:string;
    title: string;
    description: string;
    coverImage: string;
    author: string;
    rating: number;
    release: string;
    genre: string;
    pages: number;
    newPrice: number;
    oldPrice:number;
    createdAt:Date;
    updatedAt:Date;
    publishedAt:Date
  };
  export type serializedBook = {
    _id:string;
      title: string;
      description: string;
      coverImage: string;
      author: string;
      rating: number;
      release: string;
      genre: string;
      pages: number;
      newPrice: number;
      oldPrice:number;
      createdAt:string;
      updatedAt:string;
      publishedAt:string
    };