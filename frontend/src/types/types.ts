export type book = {
  _id:string;
    title: string;
    description: string;
    coverImage: string;
    author: string;
    rating: number;
    release: string;
    genre: string[];
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
      genre: string[];
      pages: number;
      newPrice: number;
      oldPrice:number;
      createdAt:string;
      updatedAt:string;
      publishedAt:string
    };
  

    export type Statistics = {
      message:string;
      statistics:{
        genres:(string | number)[];
        totalBooks:number;
        authors:(string | number)[];
        monsPopularGenre?:string;
        averageRating?:number;
      }

    }

    export type Order={
        name:string;
        email:string;
        phone:string;
        address:{
            address:string,
            city:string,
            country:string,
            state:string,
            zip:string
        },
        productIds:string[];
        totalPrice:number;
        createdAt?:Date;
        updatedAt?:Date;
        _id?:string;
    

    }