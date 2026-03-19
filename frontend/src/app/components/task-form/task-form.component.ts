import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  isEditMode = false;
  taskId: number | null = null;
  errorMessage = '';
  isLoading = false;

  taskStatuses = [
    { value: TaskStatus.TO_DO, label: 'To Do' },
    { value: TaskStatus.IN_PROGRESS, label: 'In Progress' },
    { value: TaskStatus.DONE, label: 'Done' }
  ];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', Validators.maxLength(1000)],
      status: [TaskStatus.TO_DO, Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.taskId = +id;
      this.loadTask(this.taskId);
    }
  }

  loadTask(id: number): void {
    this.taskService.getTaskById(id).subscribe({
      next: (task) => {
        this.taskForm.patchValue(task);
      },
      error: (error) => {
        this.errorMessage = 'Failed to load task';
        console.error(error);
      }
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const taskData = this.taskForm.value;

      const request = this.isEditMode && this.taskId
        ? this.taskService.updateTask(this.taskId, taskData)
        : this.taskService.createTask(taskData);

      request.subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Failed to save task';
        }
      });
    }
  }

  get title() {
    return this.taskForm.get('title');
  }

  get description() {
    return this.taskForm.get('description');
  }

  get status() {
    return this.taskForm.get('status');
  }
}
