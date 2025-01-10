import { defineStore } from "pinia";
import axios from "axios";
import { useToast } from "@/components/ui/toast/use-toast";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import router from "../router";
import { useThrottledRefHistory } from "@vueuse/core";
const { toast } = useToast();

export const useAuthorStore = defineStore("author", {
  state: () => ({
    authors: [] as any[],
    author: [] as any[],
  }),

  actions: {
    async addAuthor(
      name: string,
      penName: string,
      phoneNumber: string,
      age: number,
      religion: string,
      biography: string
    ) {
      try {
        const form = {
          name: name,
          penName: penName,
          phoneNumber: phoneNumber,
          age: age,
          religion: religion,
          biography: biography,
        };

        if (
          form.name === "" ||
          form.penName === "" ||
          form.phoneNumber === "" ||
          form.age === 0 ||
          form.religion === "" ||
          form.biography === ""
        ) {
          console.log("Empty form detected");

          toast({
            title: "Empty Form!!",
            description: "Please ensure that the fields are not empty!!",
            variant: "destructive",
          });

          return;
        }

        if (!Number.isInteger(form.age)) {
          toast({
            title: "Age must be numeric!!!",
            description: "Ensure that age is numeric",
            variant: "destructive",
          });
          return;
        }

        if (form.age > 80) {
          toast({
            title: "Age can't be above 80..",
            description: "You can't be that old can you?",
            variant: "destructive",
          });
          return;
        }

        const response = await axios.post(
          "http://127.0.0.1:8000/api/addAuthor",
          {
            ...form,
          }
        );
        console.log("Author added successfully");

        toast({
          title: "Succesfully Added!",
          description: "Author is Succesfully Added",
        });

        // await this.getAuthor();
        router.push("/admin/author/author-manage");
        await this.getAuthor();
        return;
      } catch (error) {
        console.error("Error has occured", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          // Object Entries allow to display dynamic error message
          Object.entries(error.response.data.errors).forEach(
            ([errorName, errorMessage]) => {
              toast({
                title: `Error at ${errorName}`,
                description: `${errorMessage}`,
                variant: "destructive",
              });
            }
          );
        }
      }
    },
    async getAuthor() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/getAuthor");
        this.authors = response.data;
        console.log(this.authors);
      } catch (err) {
        console.error("Fetch Author Error", err);
      }
    },
    async getAuthorById(id: number) {
      try {
        console.log(id);
        const response = await axios.get(
          `http://127.0.0.1:8000/api/getAuthorById/${id}`
        );

        console.log("Fetch single author succesfull", response.data);

        this.author = response.data;

        return true;
      } catch (err) {
        console.error("Fetch single author unsuccesfull", err);
      }
    },
    async editAuthor(
      id: number,
      name: string,
      penName: string,
      phoneNumber: string,
      age: number,
      religion: string,
      biography: string
    ) {
      try {
        const form = {
          name: name,
          penName: penName,
          phoneNumber: phoneNumber,
          age: age,
          religion: religion,
          biography: biography,
        };

        const response = await axios.put(
          `http://127.0.0.1:8000/api/editAuthor/${id}`,
          {
            ...form,
          }
        );

        this.author = response.data;
        await this.getAuthor();
        router.push("/admin/author/author-manage");
      } catch (err) {
        console.error("An Error has occured", err);
        if (err.response && err.response.data && err.response.data.errors) {
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
    async deleteAuthor(id: number) {
      try {
        console.log(id);
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/deleteAuthor/${id}`
        );

        toast({
          title: "Successfully Deleted!",
          description: "Author has been deleted",
        });
        await this.getAuthor();
      } catch (err) {
        console.error("Unexpected error", err);
      }
    },
  },
});
