import {
  ID,
  PASSWORD,
  BASE_URL,
  TODO_PAGE_URL
} from '../const';

describe('ユーザー認証 : ログイン', () => {
  beforeEach(function () {
    cy.visit(BASE_URL);
  });
  it('ログインできる事の確認', () => {
    cy.login(ID, PASSWORD);
    cy.url().should('eq', TODO_PAGE_URL);
  })
  it('ID間違いの場合、ログインできない事の確認', () => {
    cy.login('ErrorID', PASSWORD);
    cy.url().should('not.eq', TODO_PAGE_URL);
  })
  it('Password間違いの場合、ログインできない事の確認', () => {
    cy.login(ID, 'ErrorPASSWORD');
    cy.url().should('not.eq', TODO_PAGE_URL);
  })
  it('ID、Password間違いの場合、ログインできない事の確認', () => {
    cy.login('ErrorID', 'ErrorPASSWORD');
    cy.url().should('not.eq', TODO_PAGE_URL);
  })
})

describe('ユーザー認証 : ログアウト', () => {
  beforeEach(function () {
    cy.visit(BASE_URL);
    cy.login(ID, PASSWORD);
    cy.url().should('eq', TODO_PAGE_URL);
  });
  it('ログアウトできる事の確認', () => {
    cy.logout();
    cy.url().should('eq', BASE_URL);
  })
})

describe('ユーザー認証 : App起動時', () => {
  it('認証がある状態でログインページを開いた際に、タスク管理ページに遷移することの確認', () => {
    // ログイン状態の作成
    cy.visit(BASE_URL);
    cy.login(ID, PASSWORD);
    cy.url().should('eq', TODO_PAGE_URL);

    // ログインページを開く
    cy.visit(BASE_URL);
    cy.url().should('eq', TODO_PAGE_URL);
  })
  it('認証がない状態でタスク管理ページを開いた際に、ログインページに遷移することの確認', () => {
    cy.visit(TODO_PAGE_URL);
    cy.url().should('eq', BASE_URL);
  })
})