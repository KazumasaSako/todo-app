/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare namespace Cypress {
  interface Chainable {
    /** ログイン */
    login(id: string, password: string): void;
    /** ログアウト */
    logout(): void;
  }
}

Cypress.Commands.add('login', (id: string, password: string) => {
  ChangeInput('[placeholder="ユーザー名を入力"]', id);
  ChangeInput('[placeholder="パスワードを入力"]', password);
  cy.get('button').contains('ログイン').click();
})
Cypress.Commands.add('logout', () => {
  cy.get('button').contains('Logout').click();
})

/** InputElementのテキスト変更 */
const ChangeInput = (selector: string, text: string) => {
  cy.get(selector).clear();
  if (text !== '')
    cy.get(selector).type(text);
}