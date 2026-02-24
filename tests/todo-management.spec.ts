import { expect, test } from '@playwright/test';

test('should add, complete and delete todo items', async ({ page }) => {
  // Navigate to the todo app
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  const todoInput = page.getByPlaceholder('What needs to be done?');
  const footer = page.locator('.footer');

  // Add 3 tasks: Task A, Task B, Task C
  await todoInput.fill('Task A');
  await todoInput.press('Enter');
  await todoInput.fill('Task B');
  await todoInput.press('Enter');
  await todoInput.fill('Task C');
  await todoInput.press('Enter');

  await expect(footer.getByTestId('todo-count')).toHaveText('3 items left');

  //Mark Task B as completed
  const todoItems = page.locator('.todo-list li');

  await todoItems.nth(1).getByRole('checkbox').check();
  await expect(footer.getByTestId('todo-count')).toHaveText('2 items left');
  await footer.getByRole('link', { name: 'Completed', exact: true }).click();
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.first()).toHaveText('Task B');

  //Check first item is Task A
  await footer.getByRole('link', { name: 'All' }).click();
  await expect(todoItems.first()).toHaveText('Task A');

  //Delete Task C
  const taskC = todoItems.filter({ hasText: 'Task C' });
  await taskC.hover();
  await taskC.getByRole('button', { name: 'Delete' }).click();
  await expect(footer.getByTestId('todo-count')).toHaveText('1 item left');
});
