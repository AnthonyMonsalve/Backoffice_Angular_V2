import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/core/models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userSubject.asObservable();

  constructor() {}

  setUser(user: User): void {
    this.userSubject.next(user);
  }

  getUser(): User | null {
    return this.userSubject.value;
  }
}
