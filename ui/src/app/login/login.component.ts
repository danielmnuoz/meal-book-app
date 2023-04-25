import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
interface User {
  username: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = { username: '', email: '', password: '' };
  error: string | undefined;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const signUpButton = document.getElementById('sign-up-btn') as HTMLButtonElement;
    const signInButton = document.getElementById('sign-in-btn') as HTMLButtonElement;
    const container = document.querySelector('.container') as HTMLElement;

    signUpButton.addEventListener('click', () => {
      container.classList.add('sign-up-mode');
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove('sign-up-mode');
    });
  }

  signup(): void {
    this.http.post('http://localhost:3001/api/auth/signup', this.user).subscribe((data) => {
      console.log(data);
    });
  }
  login(): void {
    this.http.post<any>('http://localhost:3001/api/auth/login', this.user)
      .pipe(
        tap((data) => {
          console.log(data);
        }),
        catchError((error) => {
          console.log(error);
          this.error = error.error.message;
          return [];
        })
      )
      .subscribe();
  }
}
