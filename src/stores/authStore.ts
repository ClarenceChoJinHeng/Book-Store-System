import { defineStore } from "pinia";
import axios from "axios";
import { useToast } from "@/components/ui/toast/use-toast";
import router from "../router";
const { toast } = useToast();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: JSON.parse(localStorage.getItem("token") || "null"),
    isLoggedIn: !!localStorage.getItem("token"),
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async signup(username: string, email: string, password: string) {
      try {
        const form = {
          username: username,
          email: email,
          password: password,
          role: "customer",
        };

        // Check if any field is empty
        if (
          form.username === "" ||
          form.email === "" ||
          form.password === "" ||
          form.role === " "
        ) {
          toast({
            title: "Input Field is empty",
            description: "Please ensure all the fields are not empty",
            variant: "destructive",
          });
          return;
        }

        // Validate username length
        if (form.username.length < 5) {
          toast({
            title: "Username is too short",
            description: "Please ensure username is at least 5 characters long",
            variant: "destructive",
          });
          return;
        }

        // Validate email format
        if (
          !/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim.test(
            form.email
          )
        ) {
          toast({
            title: "Email format is incorrect",
            description: "Please enter a valid email",
            variant: "destructive",
          });
          return;
        }

        // Validate password criteria
        if (
          !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(
            form.password
          )
        ) {
          toast({
            title: "Password does not meet criteria",
            description:
              "Password must be 8-16 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character",
            variant: "destructive",
          });
          return;
        }

        // Send to the backend
        const response = await axios.post(
          "http://127.0.0.1:8000/api/register",
          {
            headers: { Accept: "application/json" },
            ...form,
          }
        );

        toast({
          title: "Signup Successful!",
          description: "Enjoy your new account!",
        });
        //  = { username: "", email: "", password: "" };
        // Reroute to login page
        router.push("/Login");
      } catch (err) {
        // Object Entries allow to display dynamic error message
        console.log(err);
        Object.entries(err.response.data.errors).forEach(
          ([errorName, errorMessage]) => {
            toast({
              title: "Signup Failed!",
              description: `${errorMessage}`,
              variant: "destructive",
            });
          }
        );
      }
    },
    async login(username: string, password: string) {
      try {
        const form = {
          username: username,
          password: password,
        };

        if (form.username === " " || form.password === " ") {
          toast({
            title: "Empty Form",
            description: "Please fill in the username and password",
          });
        }

        const response = await axios.post("http://127.0.0.1:8000/api/login", {
          username,
          password,
        });

        toast({
          title: "Login Success!",
          description: "Enjoy buying your favourite books!",
        });

        this.token = response.data.token;
        axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        await this.fetchUser();
        this.isLoggedIn = true; // Update isLoggedIn state
        localStorage.setItem("token", JSON.stringify(this.token));
        router.push("/");
      } catch (error) {
        // Object Entries allow to display dynamic error message
        Object.entries(err.response.data.errors).forEach(
          ([errorName, errorMessage]) => {
            toast({
              title: "Login Failed!",
              description: `${errorMessage}`,
              variant: "destructive",
            });
          }
        );
      }
    },
    async fetchUser() {
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        const response = await axios.get("http://127.0.0.1:8000/api/user");
        this.user = response.data.user;
      } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
      }
    },
    initializeStore() {
      const token = JSON.parse(localStorage.getItem("token") || "null");
      if (token) {
        this.token = token;
        axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        this.isLoggedIn = true;
        // this.fetchUser();
      }
    },
    async logout() {
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        await axios.post("http://127.0.0.1:8000/api/logout", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.user = null;
        this.token = null;
        this.isLoggedIn = false;
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        router.push("/");
      } catch (error) {
        throw error;
      }
    },
  },
});
