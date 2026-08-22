import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { TasksComponent } from './tasks.component';
import { beforeEach, describe, expect, it } from 'vitest';

describe('TasksComponent - Atividade MSEP', () => {
  it('deve digitar um título no campo de input', async () => {
    await render(TasksComponent);

    const input = screen.getByPlaceholderText('Digite o título') as HTMLInputElement;
    await userEvent.type(input, 'Estudar Testing Library');

    expect(input.value).toBe('Estudar Testing Library');
  });

  it('deve clicar no botão Adicionar tarefa', async () => {
    await render(TasksComponent);

    const input = screen.getByPlaceholderText('Digite o título') as HTMLInputElement;
    const button = screen.getByText('Adicionar tarefa');

    await userEvent.type(input, 'Estudar Testing Library');
    await userEvent.click(button);

    expect(input.value).toBe('');
  });

  it('deve exibir a tarefa digitada na lista após o clique', async () => {
    await render(TasksComponent);

    const input = screen.getByPlaceholderText('Digite o título');
    const button = screen.getByText('Adicionar tarefa');

    await userEvent.type(input, 'Estudar Testing Library');
    await userEvent.click(button);
    
    expect(screen.getByText('Estudar Testing Library')).toBeTruthy();
  });
});
