import { expect, test } from '@playwright/test';

test('Todo App - Add, Complete, and Delete Tasks', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Hoc playwright');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await expect(page.getByTestId('todo-title')).toContainText('Hoc playwright');
  expect(await page.getByTestId('todo-title').count()).toBe(1);

  await page.getByRole('checkbox', { name: 'Toggle Todo' }).check();
  await expect(page.getByRole('checkbox', { name: 'Toggle Todo' })).toBeChecked();
  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByTestId('todo-title')).toBeHidden();
});

test('Todo App - Update Multiple Tasks', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Task A');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Task B');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Task C');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await expect(page.getByRole('listitem').filter({ hasText: /^Task A$/ })).toBeVisible();
  await expect(page.getByRole('listitem').filter({ hasText: /^Task B$/ })).toBeVisible();
  await expect(page.getByRole('listitem').filter({ hasText: /^Task C$/ })).toBeVisible();
  await expect(page.getByTestId('todo-item')).toHaveCount(3);

  await page
    .getByRole('listitem')
    .filter({ hasText: /^Task A$/ })
    .getByLabel('Toggle Todo')
    .check();
  await expect(
    page
      .getByRole('listitem')
      .filter({ hasText: /^Task A$/ })
      .getByLabel('Toggle Todo'),
  ).toBeChecked();
  await page.getByRole('link', { name: 'Active' }).click();
  await expect(page.getByRole('listitem').filter({ hasText: /^Task A$/ })).toBeHidden();
  await expect(page.getByRole('listitem').filter({ hasText: /^Task B$/ })).toBeVisible();
  await expect(page.getByRole('listitem').filter({ hasText: /^Task C$/ })).toBeVisible();
  await expect(page.getByTestId('todo-item')).toHaveCount(2);

  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(page.getByRole('listitem').filter({ hasText: /^Task A$/ })).toBeVisible();
  await expect(page.getByRole('listitem').filter({ hasText: /^Task B$/ })).toBeHidden();
  await expect(page.getByRole('listitem').filter({ hasText: /^Task C$/ })).toBeHidden();
  await expect(page.getByTestId('todo-item')).toHaveCount(1);
});
