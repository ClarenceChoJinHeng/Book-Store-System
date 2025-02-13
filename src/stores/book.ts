import { defineStore } from "pinia";
import { useToast } from "@/components/ui/toast/use-toast";
import axios from "axios";
import { useAdminStore } from "@/stores/admin";

const { toast } = useToast();
import router from "../router";

export const bookStore = defineStore("bookStore", {
  state: () => ({
    books: JSON.parse(localStorage.getItem("books") || "[]"),
    book: JSON.parse(localStorage.getItem("book") || "{}"),
  }),

  actions: {
    async addBooks(
      isbn: string,
      title: string,
      author: string[],
      publisher: string,
      publicationDate: string,
      edition: string,
      language: string,
      genre: string,
      category: string,
      stockQuantity: number,
      price: number,
      description: string,
      ratingsReview: string,
      status: string,
      bookImage: string
    ) {
      try {
        if (
          isbn === "" ||
          title === "" ||
          author.length === 0 ||
          publisher === "" ||
          publicationDate === "" ||
          language === "" ||
          genre === "" ||
          category === "" ||
          stockQuantity === null ||
          price === null ||
          description === "" ||
          ratingsReview === "" ||
          status === "" ||
          bookImage === ""
        ) {
          toast({
            title: "Empty Form!!",
            description: "Form must not be empty!!",
            variant: "destructive",
          });
          return;
        }

        console.log(author);

        if (isNaN(stockQuantity) || isNaN(price)) {
          toast({
            title: "Input must be numeric!!",
            description: "Stock Quantity or Price must be numeric!!",
            variant: "destructive",
          });
          return;
        }

        if (!Number.isInteger(stockQuantity)) {
          toast({
            title: "Stock Quantity cannot be decimals!!",
            description: "Ensure stock quantity is integer!!",
            variant: "destructive",
          });
          return;
        }

        const priceRegex = /^\d+(\.\d{1,2})?$/;
        if (!priceRegex.test(price.toString())) {
          toast({
            title: "Price format error!!",
            description:
              "Price must be a number with up to two decimal places!!",
            variant: "destructive",
          });
          return;
        }

        console.log("Author array:", author);

        const authorObject = author[0];
        console.log("Parsed author:", authorObject);

        const authorId = Number(authorObject.id);
        console.log("Author ID:", authorId);

        const authorName = authorObject.firstName + " " + authorObject.lastName;
        console.log("Author Name:", authorName);

        const form = {
          isbn: isbn,
          title: title,
          author: authorName,
          publisher: publisher,
          publicationDate: publicationDate,
          edition: edition,
          language: language,
          genre: genre,
          category: category,
          stockQuantity: stockQuantity,
          price: price,
          description: description,
          ratingsReview: ratingsReview,
          status: status,
          bookImage: bookImage,
          authorId: authorId,
        };

        this.books.push(form);
        localStorage.setItem("books", JSON.stringify(this.books));

        const response = await axios.post("http://127.0.0.1:8000/api/addBook", {
          ...form,
        });

        if (response) {
          toast({
            title: "Book Added Succesfully",
            description: "Enjoy adding new books",
          });
        }
        await this.getBook();
        const useAdmin = useAdminStore();
        console.log(useAdmin.admin.id);
        if (useAdmin.admin && useAdmin.admin.id) {
          console.log(useAdmin.admin.id);
          await useAdmin.adminAuditLog(useAdmin.admin.id, "Add", "Book");
        } else {
          console.error("Admin data is not available or admin.id is missing");
        }
        router.push("/admin/book/book-manage");
      } catch (err) {
        if (err.response && err.response.data && err.response.data.errors) {
          console.error("An Error has Occured", err);
          Object.entries(err.response.data.errors).forEach(
            ([errorName, errorMessage]) => {
              toast({
                title: `${errorName}`,
                description: `${errorMessage}`,
                variant: "destructive",
              });
            }
          );
        }
      }
    },

    async getBook() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/getBook");
        this.books = response.data;
        console.log(this.books);
        localStorage.setItem("books", JSON.stringify(this.books));

        console.log("Succes retrieve", response.data);
      } catch (err) {
        console.error("Error in retrieving", err);
      }
    },

    async getBookById(id: number) {
      try {
        console.log(id);
        localStorage.removeItem("book");
        this.book = {};

        const response = await axios.get(
          `http://127.0.0.1:8000/api/getBookById/${id}`
        );

        console.log("Fetch single book successfull", response.data);

        this.book = response.data;
        console.log(this.book);
        localStorage.setItem("book", JSON.stringify(this.book));

        return true;
      } catch (err) {
        console.error("Fetch single book unsuccesfull", err);
      }
    },

    async editBooks(
      id: number,
      isbn: string,
      title: string,
      author: string,
      publisher: string,
      publicationDate: string,
      edition: string,
      language: string,
      genre: string,
      category: string,
      stockQuantity: number,
      price: number,
      description: string,
      ratingsReview: string,
      status: string,
      bookImage: string
    ) {
      try {
        const isbnRegex = /^\d{10,13}$/;
        if (
          isbn === "" ||
          title === "" ||
          author.length === 0 ||
          publisher === "" ||
          publicationDate === "" ||
          language === "" ||
          genre === "" ||
          category === "" ||
          stockQuantity === null ||
          price === null ||
          description === "" ||
          ratingsReview === "" ||
          status === "" ||
          bookImage === ""
        ) {
          toast({
            title: "Empty Form!!",
            description: "Form must not be empty!!",
            variant: "destructive",
          });
          return;
        }

        console.log(author);

        if (isNaN(stockQuantity) || isNaN(price)) {
          toast({
            title: "Input must be numeric!!",
            description: "Stock Quantity or Price must be numeric!!",
            variant: "destructive",
          });
          return;
        }

        if (!Number.isInteger(stockQuantity)) {
          toast({
            title: "Stock Quantity cannot be decimals!!",
            description: "Ensure stock quantity is integer!!",
            variant: "destructive",
          });
          return;
        }

        const priceRegex = /^\d+(\.\d{1,2})?$/;
        if (!priceRegex.test(price.toString())) {
          toast({
            title: "Price format error!!",
            description:
              "Price must be a number with up to two decimal places!!",
            variant: "destructive",
          });
          return;
        }

        const form = {
          isbn: isbn,
          title: title,
          author: author,
          publisher: publisher,
          publicationDate: publicationDate,
          edition: edition,
          language: language,
          genre: genre,
          category: category,
          stockQuantity: stockQuantity,
          price: price,
          description: description,
          ratingsReview: ratingsReview,
          status: status,
          bookImage: bookImage,
        };
        const response = await axios.put(
          `http://127.0.0.1:8000/api/editBook/${id}`,
          {
            ...form,
          }
        );

        if (response) {
          toast({
            title: "Book Updated Added Succesfully",
            description: "Enjoy Updating your books",
          });
          return;
        }
        router.push("/admin/book/book-manage");
        await this.getBook();
        const useAdmin = useAdminStore();
        if (useAdmin.admin) {
          await useAdmin.adminAuditLog(useAdmin.admin.id, "Edit", "Book");
        }
      } catch (err) {
        if (err.response && err.response.data && err.response.data.errors) {
          console.error("An Error has Occured", err);
          Object.entries(err.response.data.errors).forEach(
            ([errorName, errorMessage]) => {
              toast({
                title: `${errorName}`,
                description: `${errorMessage}`,
                variant: "destructive",
              });
            }
          );
        }
      }
    },

    async deleteBook(id: number) {
      try {
        console.log(id);
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/deleteBook/${id}`
        );

        toast({
          title: "Successfully Deleted!",
          description: "Author has been deleted",
        });

        await this.getBook();
        const useAdmin = useAdminStore();
        if (useAdmin.admin) {
          await useAdmin.adminAuditLog(useAdmin.admin.id, "Delete", "Book");
        }
      } catch (err) {
        console.error("Unexpected error", err);
      }
    },
  },
});
