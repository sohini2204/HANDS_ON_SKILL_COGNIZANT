import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification';

/*
 * Component-level provider creates a NEW, SEPARATE instance of NotificationService
 * scoped to this component and its children. Unlike providedIn: 'root' which creates
 * a singleton shared app-wide, providing at component level means each
 * NotificationComponent instance gets its own NotificationService instance.
 * This is useful for isolated state management per component instance.
 */
@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
  providers: [NotificationService],
})
export class Notification {
  constructor(public notificationService: NotificationService) {}

  addTestMessage(): void {
    this.notificationService.addMessage('Test notification at ' + new Date().toLocaleTimeString());
  }
}
