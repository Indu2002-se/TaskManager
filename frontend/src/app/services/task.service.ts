import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/api/tasks';
  private tasksCache$ = new BehaviorSubject<Task[]>([]);
  private taskDetailsCache = new Map<number, Task>();

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<Task[]> {
    this.http.get<Task[]>(this.apiUrl).subscribe(tasks => {
      this.tasksCache$.next(tasks);
      // Cache individual tasks
      tasks.forEach(task => {
        if (task.id) {
          this.taskDetailsCache.set(task.id, task);
        }
      });
    });
    return this.tasksCache$.asObservable();
  }

  getTaskById(id: number): Observable<Task> {
    // Return cached task immediately if available
    const cached = this.taskDetailsCache.get(id);
    if (cached) {
      return new Observable(observer => {
        observer.next(cached);
        observer.complete();
      });
    }

    return this.http.get<Task>(`${this.apiUrl}/${id}`).pipe(
      tap(task => this.taskDetailsCache.set(id, task))
    );
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      tap(newTask => {
        // Update cache immediately
        const currentTasks = this.tasksCache$.value;
        this.tasksCache$.next([...currentTasks, newTask]);
        if (newTask.id) {
          this.taskDetailsCache.set(newTask.id, newTask);
        }
      })
    );
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task).pipe(
      tap(updatedTask => {
        // Update cache immediately
        const currentTasks = this.tasksCache$.value;
        const index = currentTasks.findIndex(t => t.id === id);
        if (index !== -1) {
          currentTasks[index] = updatedTask;
          this.tasksCache$.next([...currentTasks]);
        }
        this.taskDetailsCache.set(id, updatedTask);
      })
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        // Update cache immediately
        const currentTasks = this.tasksCache$.value;
        this.tasksCache$.next(currentTasks.filter(t => t.id !== id));
        this.taskDetailsCache.delete(id);
      })
    );
  }

  // Get cached tasks synchronously
  getCachedTasks(): Task[] {
    return this.tasksCache$.value;
  }

  // Get cached task by id synchronously
  getCachedTask(id: number): Task | undefined {
    return this.taskDetailsCache.get(id);
  }
}
