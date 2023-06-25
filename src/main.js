import { createApp } from "vue";
import App from "./App.vue";
import { makeServer } from "../server/server";

makeServer();

createApp(App).mount("#app");
