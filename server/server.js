import { createServer } from "miragejs";
import ContactData from "../src/contacts.json";

export const makeServer = () =>
  createServer({
    routes() {
      this.namespace = "api";
      this.get("/contacts", () => ({
        contacts: ContactData,
      }));
    },
  });
