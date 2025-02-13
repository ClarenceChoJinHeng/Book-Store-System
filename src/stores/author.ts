import { defineStore } from "pinia";
import axios from "axios";
import { useToast } from "@/components/ui/toast/use-toast";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import router from "../router";
import { useThrottledRefHistory } from "@vueuse/core";
import { useAdminStore } from "@/stores/admin";

const { toast } = useToast();

export const useAuthorStore = defineStore("author", {
  state: () => ({
    authors: [] as any[],
    author: [] as any[],
  }),

  actions: {
    async addAuthor(
      firstName: string,
      lastName: string,
      penName: string,
      biography: string,
      age: number,
      country: string
    ) {
      try {
        const form = {
          firstName: firstName,
          lastName: lastName,
          penName: penName,
          biography: biography,
          age: age,
          country: country,
        };

        if (
          form.firstName === "" ||
          form.lastName === "" ||
          form.penName === "" ||
          form.biography === "" ||
          form.age === 0 ||
          form.country === ""
        ) {
          console.log("Empty form detected");

          toast({
            title: "Empty Form!!",
            description: "Please ensure that the fields are not empty!!",
            variant: "destructive",
          });

          return;
        }

        if (isNaN(form.age)) {
          toast({
            title: "Age must be numeric!!",
            description: "Ensure that age is numeric!!",
            variant: "destructive",
          });
          return;
        }

        if (!Number.isInteger(Number(form.age))) {
          toast({
            title: "Age must be an integer!!",
            description: "Ensure that age is an integer!!",
            variant: "destructive",
          });
          return;
        }

        if (form.age < 4) {
          toast({
            title: "Age cannot be less than 4!!",
            description: "The youngest author is 4 yrs old..",
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

        router.push("/admin/author/author-manage");
        await this.getAuthor();
        const useAdmin = useAdminStore();

        console.log(useAdmin.admin.id);

        await useAdmin.adminAuditLog(useAdmin.admin.id, "Add", "Book");
        return;
      } catch (err) {
        console.error("Error has occured", err);
        if (err.response && err.response.status === 409) {
          toast({
            title: "Author already exists!",
            description: "An author with the same name already exists.",
            variant: "destructive",
          });
        } else if (
          err.response &&
          err.response.data &&
          err.response.data.errors
        ) {
          // Object Entries allow to display dynamic error message
          Object.entries(err.response.data.errors).forEach(
            ([errorName, errorMessage]) => {
              toast({
                title: "Add Author Failed!",
                description: `${errorMessage}`,
                variant: "destructive",
              });
            }
          );
        } else {
          toast({
            title: "An error occurred!",
            description: "Please try again later.",
            variant: "destructive",
          });
        }
      }
    },

    async getAuthor() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/getAuthor");
        this.authors = response.data;
        console.log(this.authors);
      } catch (err) {
        if (err.code === "ECONNABORTED") {
          toast({
            title: "Request Timeout",
            description:
              "The request took too long to complete. Please try again later.",
            variant: "destructive",
          });
        } else {
          console.error("Fetch Author Error", err);
          toast({
            title: "Fetch Author Error",
            description:
              "An error occurred while fetching authors. Please try again later.",
            variant: "destructive",
          });
        }
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
      firstName: string,
      lastName: string,
      penName: string,
      biography: string,
      age: number,
      country: string
    ) {
      try {
        const form = {
          firstName: firstName,
          lastName: lastName,
          penName: penName,
          biography: biography,
          age: age,
          country: country,
        };

        const response = await axios.put(
          `http://127.0.0.1:8000/api/editAuthor/${id}`,
          {
            ...form,
          }
        );

        this.author = response.data;
        await this.getAuthor();
        toast({
          title: "Edit Succesfully!!",
          description: "Author Edited Succesfully!!",
        });
        router.push("/admin/author/author-manage");
        const useAdmin = useAdminStore();
        if (useAdmin.admin) {
          await useAdmin.adminAuditLog(useAdmin.admin.id, "Edit", "Author");
        }
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
        const useAdmin = useAdminStore();
        if (useAdmin.admin) {
          await useAdmin.adminAuditLog(useAdmin.admin.id, "Delete", "Author");
        }
      } catch (err) {
        console.error("Unexpected error", err);
      }
    },
  },
});
