import { defineStore } from "pinia";
import { useToast } from "@/components/ui/toast/use-toast";

const { toast } = useToast();

export const bookStore = defineStore("bookStore", {
  state: () => ({
    books: [],
  }),

  actions: {
    async addBooks(formData: FormData) {
      try {
        const book = {
          title: formData.get("title") as string,
          price: formData.get("price") as number,
          quantity: formData.get("quantity") as string,
          category: formData.get("category") as string,
          author: formData.get("author") as string,
          imageUrl: formData.get("imageUrl") as string,
        };
        this.books.push(book);
        console.log("Book added:", book);
      } catch (error) {
        console.error("Error adding book:", error);
      }
    },
  },
});

// {
//   imageUrl:
//     "https://www.papertrue.com/blog/wp-content/uploads/2023/11/1prideandprejudice.jpg",
//   title: "Pride and Prejudice",
//   author: "By Jane Austen",
//   price: "RM9.99",
//   categories: "Romance",
// },
// {
//   imageUrl:
//     "https://www.papertrue.com/blog/wp-content/uploads/2023/11/2A-Clockwork-Orange-Book-Cover-368x600-1.jpg",
//   title: "A Clockwork Orange",
//   author: "By Anthony Burgess",
//   price: "RM12.99",
//   categories: "Science Fiction",
// },
// {
//   imageUrl:
//     "https://www.papertrue.com/blog/wp-content/uploads/2023/11/3px-The_Grapes_of_Wrath_1939_1st_ed_cover.jpg",
//   title: "The Grapes of Wrath",
//   author: "By John Steinbeck",
//   price: "RM11.99",
//   categories: "Historical Fiction",
// },
// {
//   imageUrl:
//     "https://www.papertrue.com/blog/wp-content/uploads/2023/11/4american-psycho-670x1024-1.jpg",
//   title: "American Psycho",
//   author: "By Bret Easton Ellis",
//   price: "RM12.99",
//   categories: "Dark Satire",
// },
// {
//   imageUrl:
//     "https://www.papertrue.com/blog/wp-content/uploads/2023/11/5bravenewworld.jpg",
//   title: "Brave New World2",
//   author: "By Aldous Huxley",
//   price: "RM13.99",
//   categories: "Science Fiction",
// },
// {
//   imageUrl:
//     "https://www.papertrue.com/blog/wp-content/uploads/2023/11/6Animorphs.jpg",
//   title: "Animorphs – The Stranger",
//   author: "By K. A. Applegate",
//   price: "RM12.99",
//   categories: "Children's Fiction",
// },
// {
//   imageUrl:
//     "https://www.papertrue.com/blog/wp-content/uploads/2023/11/7F451.jpg",
//   title: "Fahrenheit 451",
//   author: "By Ray Bradbury",
//   price: "RM10.99",
//   categories: "Science Fiction",
// },
// {
//   imageUrl:
//     "https://www.papertrue.com/blog/wp-content/uploads/2023/11/8engulfedinflames.jpg",
//   title: "When You Are Engulfed in Flames",
//   author: "By David Sedaris",
//   price: "RM12.99",
//   categories: "Literary Fiction",
// },
// {
//   imageUrl:
//     "https://www.papertrue.com/blog/wp-content/uploads/2023/11/9Faceofangel.jpg",
//   title: "Face of an Angel",
//   author: "By Dorothy Eden",
//   price: "RM15.99",
//   categories: "Psychological Thriller, Mystery",
// },
// {
//   imageUrl:
//     "https://www.papertrue.com/blog/wp-content/uploads/2023/11/10The-Catcher-in-the-Rye-First-Edition-cover-E.-Michael-Mitchell.jpg",
//   title: "The Catcher in the Rye",
//   author: "By J. D. Salinger",
//   price: "RM10.99",
//   categories: "Bildungsroman, Coming-of-Age",
// },
// {
//   imageUrl:
//     "https://www.papertrue.com/blog/wp-content/uploads/2023/11/11The-Divine-Comedy-Book-Cover-400x600-1.jpg",
//   title: "The Divine Comedy",
//   author: "By Dante Alighieri",
//   price: "RM12.99",
//   categories: "Epic Poetry",
// },
// {
//   imageUrl:
//     "https://www.papertrue.com/blog/wp-content/uploads/2023/11/12psycho.jpg",
//   title: "Psycho",
//   author: "By Robert Bloch",
//   price: "RM10.99",
//   categories: "Psychological Thriller",
// },
// {
//   imageUrl:
//     "https://www.papertrue.com/blog/wp-content/uploads/2023/11/13frankenstein.jpg",
//   title: "Frankenstein",
//   author: "By Mary Shelley",
//   price: "RM21.99",
//   categories: "Gothic Fiction",
// },
// {
//   imageUrl:
//     "https://www.papertrue.com/blog/wp-content/uploads/2023/11/14The-Great-Gatsby-Book-Cover-391x600-1.jpg",
//   title: "The Great Gatsby",
//   author: "By F. Scott Fitzgerald",
//   price: "RM11.99",
//   categories: "Social Commentary, Classic Literature",
// },
// {
//   imageUrl:
//     "https://www.papertrue.com/blog/wp-content/uploads/2023/11/15psychopathtest.jpg",
//   title: "The Psychopath Test: A Journey Through the Madness Industry",
//   author: "By Jon Ronson",
//   price: "RM12.69",
//   categories: "Non-Fiction, Psychology",
// },
// {
//   imageUrl:
//     "https://m.media-amazon.com/images/I/81-X60ARMYL._AC_UY327_QL65_.jpg",
//   title: "The Notebook",
//   author: "by Nicholas Sparks",
//   price: "RM12.00",
//   categories: "Contemporary Romance",
// },
// {
//   imageUrl:
//     "https://m.media-amazon.com/images/I/71QDhHvv7wL._AC_UY327_QL65_.jpg",
//   title: "The Love Hypothesis",
//   author: " by Ali Hazelwood",
//   price: "RM10.00",
//   categories: "Academic Romance, Contemporary Romance",
// },
// {
//   imageUrl:
//     "https://m.media-amazon.com/images/I/91cFp90gwZL._AC_UY327_QL65_.jpg",
//   title: "The Duke and I",
//   author: "by Julia Quinn",
//   price: "RM20.55",
//   categories: "Regency Romance, Historical Romance",
// },
// {
//   imageUrl:
//     "https://m.media-amazon.com/images/I/91CqNElQaKL._AC_UY327_QL65_.jpg",
//   title: "It Ends with Us",
//   author: " by Colleen Hoover",
//   price: "RM24.00",
//   categories: "Regency Romance, Emotional Romance",
// },
// {
//   imageUrl:
//     "https://m.media-amazon.com/images/I/71IszuvUCEL._AC_UY327_QL65_.jpg",
//   title: "Me Before You",
//   author: "by Jojo Moyes",
//   price: "RM22.00",
//   categories: "Contemporary Romance, Tearjerker",
// },
// {
//   imageUrl:
//     "https://m.media-amazon.com/images/I/81jQrSTUhSL._AC_UY327_QL65_.jpg",
//   title: "The Kiss Quotient",
//   author: "by Helen Hoang",
//   price: "RM21.00",
//   categories: "Contemporary Romance, Neurodiversity Romance",
// },
// {
//   imageUrl:
//     "https://m.media-amazon.com/images/I/81RrEEMiOCL._AC_UY327_QL65_.jpg",
//   title: "A Court of Thorns and Roses",
//   author: " by Sarah J. Maas",
//   price: "RM23.00",
//   categories: "Fantasy Romance, Paranormal Romance",
// },

// getters: {
//   filteredBooks: (state) => {
//     return state.books.filter(
//       (book) =>
//         book.categories.includes("Romance") ||
//         book.categories.includes("Historical Fiction")
//     );
//   },
// },
