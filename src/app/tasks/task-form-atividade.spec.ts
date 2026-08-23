import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { TaskFormComponent } from './task-form.component';
import { describe, expect, it } from 'vitest';

describe('TaskFormComponent - Atividade Prática Guiada', () => {
  it('1. campo vazio: deve mostrar a mensagem de erro após focus/blur', async () => {
    await render(TaskFormComponent);

    const titleInput = screen.getByPlaceholderText('Digite o título');

    await userEvent.click(titleInput);
    await userEvent.tab();

    expect(
      screen.getByText('O título é obrigatório e deve ter pelo menos 3 caracteres.'),
    ).toBeInTheDocument();
  });

  it('2. preenchimento válido: deve refletir o valor digitado no input', async () => {
    await render(TaskFormComponent);

    const titleInput = screen.getByPlaceholderText('Digite o título');
    await userEvent.type(titleInput, 'Tarefa válida');
    expect(titleInput).toHaveValue('Tarefa válida');
  });

  it('3. submissão: deve chamar saved.emit ao clicar com dados válidos', async () => {
    const rendered = await render(TaskFormComponent);
    const saved = rendered.fixture.componentInstance.saved;
    vi.spyOn(saved, 'emit');

    const titleInput = screen.getByPlaceholderText('Digite o título');
    const button = screen.getByRole('button', { name: 'Adicionar tarefa' });

    await userEvent.type(titleInput, 'Tarefa válida');
    await userEvent.click(button);

    expect(saved.emit).toHaveBeenCalled();
  });

  it('4. mensagem de erro: deve avisar o mínimo de caracteres com 2 letras', async () => {
    await render(TaskFormComponent);

    const titleInput = screen.getByPlaceholderText('Digite o título');
    const button = screen.getByRole('button', { name: 'Adicionar tarefa' });

    await userEvent.type(titleInput, 'ab');
    await userEvent.click(button);
    
    expect(
      screen.getByText('O título é obrigatório e deve ter pelo menos 3 caracteres.'),
    ).toBeInTheDocument();
  });
});
