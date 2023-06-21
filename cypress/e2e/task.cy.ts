import {
  ID,
  PASSWORD,
  BASE_URL,
  TODO_PAGE_URL
} from '../const';

describe('タスク管理', () => {
  /** テスト用に追加する新しいタスクのタイトル */
  const NEW_TASK_TITLE = new Date().toString();
  /** 要素特定用のKey : Taskエリア */
  const DATA_KEY_TASK_AREA = `[data-cy='TaskItemParent']`;
  /** 要素特定用のKey : タスク追加Button */
  const DATA_KEY_ADD_TASK_BUTTON = `[data-cy='AddTaskButton']`;
  /** 要素特定用のKey : タスクCheckBox : False */
  const DATA_KEY_TASK_CHECKBOX_FALSE = `[data-testid='CircleOutlinedIcon']`;

  /** NEW_TASK_TITLEのTaskItem取得 */
  const GetTaskItem = (): Cypress.Chainable<JQuery<HTMLDivElement>> =>
    cy.get(DATA_KEY_TASK_AREA)
      .children()
      .find('div')
      .contains(NEW_TASK_TITLE)

  beforeEach(function () {
    cy.visit(BASE_URL);
    cy.login(ID, PASSWORD);
    cy.url().should('eq', TODO_PAGE_URL);
    // タスクの一覧が取得できるまで待機
    cy.get(DATA_KEY_TASK_AREA).children().get(`[role='progressbar']`, { timeout: 30000 }).should('not.exist');
  });
  it('タスクの一覧が表示されることの確認', () => {
    cy.get(DATA_KEY_TASK_AREA)
      .children()
      .its('length')
      .should('gt', 0);
  })
  it('タスクを追加できることの確認', () => {
    // タスクが存在しないことの確認
    GetTaskItem().should('not.exist');

    // タスクの追加
    cy.get('[placeholder="タスクの追加"]').type(NEW_TASK_TITLE);
    cy.get(DATA_KEY_ADD_TASK_BUTTON).click();

    // タスクが存在することの確認
    GetTaskItem().should('exist');
  })
  it('タスクの編集(completedの変更)ができることの確認', () => {
    const checkBoxClick = () => {
      GetTaskItem()
        .parent()
        .find('input')
        .click()
    }

    // CheckBoxにチェックが入っていない(completed:false)ことの確認
    GetTaskItem()
      .parent()
      .find(DATA_KEY_TASK_CHECKBOX_FALSE)
      .should('exist');

    // タスクの編集
    checkBoxClick();

    // CheckBoxにチェックが入っている(completed:false)ことの確認
    GetTaskItem()
      .parent()
      .find(DATA_KEY_TASK_CHECKBOX_FALSE)
      .should('not.exist');

    // タスクの編集
    checkBoxClick();

    // CheckBoxにチェックが入っていない(completed:false)ことの確認
    GetTaskItem()
      .parent()
      .find(DATA_KEY_TASK_CHECKBOX_FALSE)
      .should('exist');
  })
  it('タスクを削除できることの確認', () => {
    // タスクが存在することの確認
    GetTaskItem().should('exist');

    // タスクの削除
    GetTaskItem()
      .parent()
      .parent()
      .children()
      .find('button')
      .click()
    cy.contains('削除')
      .click();

    // タスクが存在しないことの確認
    GetTaskItem().should('not.exist');
  })
})