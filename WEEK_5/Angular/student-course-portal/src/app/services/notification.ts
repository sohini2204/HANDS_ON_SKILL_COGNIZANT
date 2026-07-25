import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/*
 * NotificationService is provided at the component level in NotificationComponent.
 * Component-level providers (providers: [NotificationService] in @Component decorator)
 * create a new, separate instance scoped to that component and its children.
 * This is useful when you need isolated state per component instance,
 * such as a form wizard with multiple steps or a notification list that should
 * not share state with other instances.
 */
@Injectable()
export class NotificationService {
  private messages: string[] = [];
  private messagesSubject = new BehaviorSubject<string[]>([]);
  messages$: Observable<string[]> = this.messagesSubject.asObservable();

  addMessage(msg: string): void {
    this.messages.push(msg);
    this.messagesSubject.next([...this.messages]);
  }

  clearMessages(): void {
    this.messages = [];
    this.messagesSubject.next([]);
  }
}
