

export const BookSlides = [
    {
        _id: "1",
        title: "The Alchemist",
        description: "The Alchemist is a novel by Brazilian author Paulo Coelho that was first published in 1988. Originally written in Portuguese, it became a widely translated international bestseller.",
        coverImage:"/assets/books/book-1.png",
        author: "Paulo Coelho",
        rating: 4.5,
        release: "1988",
        genre: "Fiction",
        pages: 208,
        newPrice: 25.99,
        oldPrice: 30.99,
        createdAt: new Date(),
        updatedAt: new Date(),
        publishedAt: new Date(1988, 1, 1)
    },
   ...Array.from({length:19},(_,i)=>({
       _id: `${i+2}`,
        title: `Book ${i+2}`,
        description: `This is a description for book ${i+2}`,
        coverImage:`/assets/books/book-${i+2}.png`, 
        author: "Author",
        rating: 5 - i * 0.2,
        release: "2021",
        genre: "Fiction",
        pages: 208 + i * 10,
        newPrice: 25.99 + i*4,
        oldPrice: 30.99 + i*4,
        createdAt: new Date(),
        updatedAt: new Date(),
        publishedAt: new Date(2021, 1 , 1)
        
   }))

]

export const genre=[
    "All",
    "Fiction",
    "Non-Fiction",
    "Science Fiction",
    "Fantasy",
    "Mystery",
    "Thriller",
    "Romance",
    "Horror",
    "Biography",
    "Autobiography",
    "Self-Help",
    "Cookbooks",
    "Travel",
    "History",
    "Science",
    "Mathematics",
]