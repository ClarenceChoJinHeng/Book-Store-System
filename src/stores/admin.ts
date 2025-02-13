import { defineStore } from "pinia";
import { useToast } from "@/components/ui/toast/use-toast";
import axios from "axios";
const { toast } = useToast();
import router from "../router";

function getParsedItem(key: string) {
  const item = localStorage.getItem(key);
  try {
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error(`Error parsing ${key} from localStorage`, e);
    return null;
  }
}

export const useAdminStore = defineStore("adminStore", {
  state: () => ({
    admin: getParsedItem("adminData"),
    token: JSON.parse(localStorage.getItem("adminToken") || "{}"),
    isLoggedIn: !!localStorage.getItem("adminToken"),
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async adminRegister(username: string, email: string, password: string) {
      try {
        if (username === " " || email === " " || password === "") {
          toast({
            title: "Empty Form!!",
            description: "Form must not be empty!!",
            variant: "destructive",
          });
          return;
        }

        if (
          !/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim.test(email)
        ) {
          toast({
            title: "Incorrect Email Format!!",
            description: "Ensure your email format is correct!!",
            variant: "destructive",
          });
          return;
        }

        if (
          !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(
            password
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

        const form = {
          username: username,
          email: email,
          password: password,
          role: "admin",
        };

        const response = await axios.post(
          "http://127.0.0.1:8000/api/adminRegister",
          {
            headers: { Accept: "application/json" },
            ...form,
          }
        );

        console.log("Response data", response.data);

        toast({
          title: "Admin Signup Successfull!!",
          description: "Enjoy your new account admin!!",
        });

        router.push("/admin/login");
      } catch (err) {
        // Object Entries allow to display dynamic error message
        console.log(err);
        if (err.response && err.response.data && err.response.data.errors) {
          // Object Entries allow to display dynamic error message
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
      }
    },

    // Admin Login
    async adminLogin(email: string, password: string) {
      try {
        const form = {
          email: email,
          password: password,
        };

        if (email === "" || password === "") {
          toast({
            title: "Empty Form!!",
            description: "Form must not be empty!!",
            variant: "destructive",
          });
          return;
        }

        if (
          !/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim.test(email)
        ) {
          toast({
            title: "Incorrect Email Format!!",
            description: "Ensure your email format is correct!!",
            variant: "destructive",
          });
          return;
        }

        const response = await axios.post(
          "http://127.0.0.1:8000/api/adminLogin",
          {
            email,
            password,
          }
        );

        toast({
          title: "Login Success!",
          description: "Welcome back admin!!",
        });

        this.token = response.data.token;
        axios.defaults.headers.common["Authorization"] = `Bearer${this.token}`;
        await this.fetchAdmin();
        this.isLoggedIn = true;
        localStorage.setItem("adminToken", JSON.stringify(this.token));
        router.push("/admin/dashboard");
      } catch (err) {
        if (err.response && err.response.data && err.response.data.errors) {
          // Object Entries allow to display dynamic error message
          Object.entries(err.response.data.errors).forEach(
            ([errorName, errorMessage]) => {
              toast({
                title: "Admin Login Failed!",
                description: `${errorMessage}`,
                variant: "destructive",
              });
            }
          );
        } else {
          toast({
            title: "Login Failed!",
            description: "User account do not exist!!",
            variant: "destructive",
          });
        }
      }
    },

    // Admin fetch
    async fetchAdmin() {
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        const response = await axios.get(
          "http://127.0.0.1:8000/api/fetchAdmin"
        );
        this.admin = response.data.admin;
        localStorage.setItem("adminData", JSON.stringify(response.data.admin));
        console.log(this.admin.id);
      } catch (error) {
        console.error("Error fetching admin:", error);
        toast({
          title: "Fetch Admin Error",
          description:
            "An error occurred while fetching admin data. Please try again later.",
          variant: "destructive",
        });
      }
    },

    // Admin Logout
    async adminLogout() {
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        await axios.post("http://127.0.0.1:8000/api/adminLogout", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        this.admin = "null";
        this.token = "{}";
        this.isLoggedIn = false;
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminData");
        delete axios.defaults.headers.common["Authorization"];
        router.push("/admin/login");
      } catch (error) {
        throw error;
      }
    },

    // Admin Audit Log
    async adminAuditLog(adminId: number, action: string, entityName: string) {
      const form = {
        adminId: adminId,
        action: action,
        entityName: entityName,
      };
      const response = await axios.post(
        "http://127.0.0.1:8000/api/adminAuditLog",
        {
          ...form,
        }
      );
    },
  },
});
