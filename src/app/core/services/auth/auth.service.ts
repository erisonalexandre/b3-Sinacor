import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  user,
  signOut,
} from '@angular/fire/auth';
import { User } from '@models/user.model';
import { from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$ = user(this.auth);

  constructor(private auth: Auth) {}

  currentUser() {
    return this.user$.pipe(
      map((user) => {
        return user ? new User(user.email!, user.displayName!) : undefined;
      }),
    );
  }

  createUser(email: string, username: string, password: string) {
    const promise = createUserWithEmailAndPassword(
      this.auth,
      email,
      password,
    ).then((userCredential) => {
      return updateProfile(userCredential.user, { displayName: username });
    });

    return from(promise);
  }

  login({ email, password }: { email: string; password: string }) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout() {
    return from(signOut(this.auth));
  }
}
