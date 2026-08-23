import { TestBed } from '@angular/core/testing';
import { TasksComponent } from './tasks.component';
import { TaskService } from './task.service';
import { beforeEach, describe, expect, it } from 'vitest';
import { vi } from 'vitest';

describe('TasksComponent - Atividade Prática (Mocks e Stubs)', () => {
  const mockTaskService = {
    tasks: vi.fn(() => [
      {
        id: '1',
        title: 'Estudar mocks',
        description: 'Aprender vi.fn()',
        completed: false,
      },
      {
        id: '2',
        title: 'Praticar isolamento',
        description: 'Testar sem o serviço real',
        completed: true,
      },
    ]),
    remaining: vi.fn(() => 1),
    addTask: vi.fn(),
    updateTask: vi.fn(),
    removeTask: vi.fn(),
    toggleCompletion: vi.fn(),
  } as unknown as TaskService;

  let component: TasksComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TasksComponent, { provide: TaskService, useValue: mockTaskService }],
    });
    component = TestBed.inject(TasksComponent);
    vi.clearAllMocks();
  });

  it('deve retornar as tarefas fictícias fornecidas pelo mock', () => {
    const tasks = component.tasks();
    expect(mockTaskService.tasks).toHaveBeenCalled();
    expect(tasks).toHaveLength(2);
    expect(tasks[0].title).toBe('Estudar mocks');
    expect(tasks[1].title).toBe('Praticar isolamento');
  });

  it('deve chamar removeTask no mock quando removeTask for executado', () => {
    component.removeTask('1');
    expect(mockTaskService.removeTask).toHaveBeenCalledWith('1');
  });
  
  it('deve chamar toggleCompletion no mock quando toggleTask for executado', () => {
    component.toggleTask('2');
    expect(mockTaskService.toggleCompletion).toHaveBeenCalledWith('2');
  });
});
