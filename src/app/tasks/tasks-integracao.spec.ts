import { render, screen } from '@testing-library/angular';
import { TestBed } from '@angular/core/testing';
import { TasksComponent } from './tasks.component';
import { TaskService } from './task.service';
import { beforeEach, describe, expect, it } from 'vitest';

describe('TasksComponent - integração (botão condicional)', () => {
  it('deve exibir "Ver Estatísticas" quando há tarefas cadastradas', async () => {
    await render(TasksComponent);

    expect(screen.queryByText('Ver Estatísticas')).not.toBeNull();
  });
  
  it('não deve exibir "Ver Estatísticas" sem tarefas cadastradas', async () => {
    const { fixture } = await render(TasksComponent);
    const taskService = TestBed.inject(TaskService);
    const seedTask = taskService.tasks()[0];
    taskService.removeTask(seedTask.id);
    fixture.detectChanges();
    
    expect(screen.queryByText('Ver Estatísticas')).toBeNull();
  });
});
