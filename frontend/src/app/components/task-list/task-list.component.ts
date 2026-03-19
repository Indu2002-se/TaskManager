import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { Task, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  selectedStatus: string = 'ALL';
  errorMessage = '';
  username: string | null = '';

  taskStatuses = [
    { value: 'ALL', label: 'All Tasks' },
    { value: TaskStatus.TO_DO, label: 'To Do' },
    { value: TaskStatus.IN_PROGRESS, label: 'In Progress' },
    { value: TaskStatus.DONE, label: 'Done' }
  ];

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    
    // Load cached tasks immediately for instant display
    this.tasks = this.taskService.getCachedTasks();
    this.filterTasks();
    
    // Then fetch fresh data from server
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.filterTasks();
      },
      error: (error) => {
        if (this.tasks.length === 0) {
          this.errorMessage = 'Failed to load tasks';
        }
        console.error(error);
      }
    });
  }

  filterTasks(): void {
    if (this.selectedStatus === 'ALL') {
      this.filteredTasks = this.tasks;
    } else {
      this.filteredTasks = this.tasks.filter(task => task.status === this.selectedStatus);
    }
  }

  onStatusFilterChange(): void {
    this.filterTasks();
  }

  deleteTask(id: number | undefined): void {
    if (!id) return;
    
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          // Cache is already updated by service, just refresh the view
          this.tasks = this.taskService.getCachedTasks();
          this.filterTasks();
        },
        error: (error) => {
          this.errorMessage = 'Failed to delete task';
          console.error(error);
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
