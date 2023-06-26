import { defineConfig } from "cypress";
require('dotenv').config()

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    baseUrl: 'http://localhost:3000/',
    todoPageUrl: 'http://localhost:3000/todo-list/',
    id: process.env.CYPRESS_USER_ID,
    password: process.env.CYPRESS_USER_PASSWORD,
    anotherId: process.env.ANOTHER_CYPRESS_USER_ID,
    anotherPassword: process.env.ANOTHER_CYPRESS_USER_PASSWORD,
  }
});
