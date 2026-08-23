import { test, expect } from '@playwright/test';

test('1. cadastro: deve exibir a tarefa na lista após preencher e enviar o formulário', async ({
  page,
}) => {
  await page.goto('http://localhost:4200/');
  await page.getByPlaceholder('Digite o título').fill('Tarefa de cadastro');
  await page.getByPlaceholder('Detalhes da tarefa').fill('Detalhes reais da tarefa');
  await page.getByRole('button', { name: 'Adicionar tarefa' }).click();
  await expect(page.getByText('Tarefa de cadastro')).toBeVisible();
});

test('2. remoção: deve remover o item e exibir a mensagem de lista vazia', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  // remove a tarefa semente do TaskService para garantir o estado realmente vazio
  const seedTask = page.locator('article.task-item', { hasText: 'Aprender Angular 21' });
  await seedTask.getByRole('button', { name: 'Remover' }).click();
  await page.getByPlaceholder('Digite o título').fill('Tarefa de remoção');
  await page.getByPlaceholder('Detalhes da tarefa').fill('Será removida');
  await page.getByRole('button', { name: 'Adicionar tarefa' }).click();
  const taskItem = page.locator('article.task-item', { hasText: 'Tarefa de remoção' });
  await taskItem.getByRole('button', { name: 'Remover' }).click();
  await expect(taskItem).not.toBeVisible();
  await expect(
    page.getByText('Nenhuma tarefa cadastrada. Adicione uma tarefa ao lado.'),
  ).toBeVisible();
});

test('3. conclusão: deve marcar o checkbox e aplicar a classe completed', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByPlaceholder('Digite o título').fill('Tarefa de conclusão');
  await page.getByPlaceholder('Detalhes da tarefa').fill('Marcar como concluída');
  await page.getByRole('button', { name: 'Adicionar tarefa' }).click();
  const taskItem = page.locator('article.task-item', { hasText: 'Tarefa de conclusão' });
  await taskItem.locator('button.checkbox').click();
  await expect(taskItem).toHaveClass(/completed/);
});

test('4. navegação: deve exibir os três cards de métricas em /stats', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('link', { name: 'Ver Estatísticas' }).click();
  await expect(page.getByText('Tarefas Criadas')).toBeVisible();
  await expect(page.getByText('Tarefas Excluídas')).toBeVisible();
  await expect(page.getByText('Tarefas Concluídas')).toBeVisible();
});

test('5. fluxo completo: adicionar, concluir, remover, navegar para stats e voltar', async ({
  page,
}) => {
  await page.goto('http://localhost:4200/');
  await page.getByPlaceholder('Digite o título').fill('Fluxo completo');
  await page.getByPlaceholder('Detalhes da tarefa').fill('Encadeando todas as ações');
  await page.getByRole('button', { name: 'Adicionar tarefa' }).click();
  const taskItem = page.locator('article.task-item', { hasText: 'Fluxo completo' });
  await expect(taskItem).toBeVisible();
  await taskItem.locator('button.checkbox').click();
  await expect(taskItem).toHaveClass(/completed/);
  await taskItem.getByRole('button', { name: 'Remover' }).click();
  await expect(taskItem).not.toBeVisible();
  await page.getByRole('link', { name: 'Ver Estatísticas' }).click();
  await expect(page.getByText('Estatísticas das Tarefas')).toBeVisible();
  await page.getByRole('link', { name: 'Voltar às Tarefas' }).click();
  await expect(page.getByText('TaskFlow')).toBeVisible();
});
