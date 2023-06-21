import { defineConfig } from "cypress";
require('dotenv').config()

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    baseUrl: process.env.BASE_URL,
    todoPageUrl: process.env.BASE_URL + 'todo-list/',
    id: process.env.CYPRESS_USER_ID,
    password: process.env.CYPRESS_USER_PASSWORD,
  }
});
