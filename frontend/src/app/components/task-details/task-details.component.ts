import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  task: Task | null = null;
  errorMessage = '';

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const taskId = +id;
      
      // Try to get cached task first for instant display
      const cachedTask = this.taskService.getCachedTask(taskId);
      if (cachedTask) {
        this.task = cachedTask;
      }
      
      // Then fetch from server to ensure data is fresh
      this.loadTask(taskId);
    }
  }

  loadTask(id: number): void {
    this.taskService.getTaskById(id).subscribe({
      next: (task) => {
        this.task = task;
      },
      error: (error) => {
        if (!this.task) {
          this.errorMessage = 'Failed to load task';
        }
        console.error(error);
      }
    });
  }

  deleteTask(): void {
    if (!this.task?.id) return;
    
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(this.task.id).subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          this.errorMessage = 'Failed to delete task';
          console.error(error);
        }
      });
    }
  }
}
