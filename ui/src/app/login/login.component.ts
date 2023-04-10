import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const signUpButton = document.getElementById('sign-up-btn') as HTMLButtonElement;
    const signInButton = document.getElementById('sign-in-btn') as HTMLButtonElement;
    const container = document.querySelector('.container') as HTMLElement;

    signUpButton.addEventListener('click', () => {
      container.classList.add("sign-up-mode");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("sign-up-mode");
    });
  }
}
