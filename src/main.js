import { createApp } from "vue";
import { Quasar } from "quasar";
import "quasar/dist/quasar.css";

import "@quasar/extras/material-icons/material-icons.css";

import App from "./App.vue";
import { employeeStore } from "./employee";

const app = createApp(App);

app.use(employeeStore);
app.use(Quasar, {
	config: {},
});

app.mount("#app");
