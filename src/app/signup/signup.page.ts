import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  // get username from form
  get username():AbstractControl {
    return this.signupForm.get("username");
  }

  // get email from form
  get email():AbstractControl {
    return this.signupForm.get("email");
  }

  // get password from form
  get password():AbstractControl {
    return this.signupForm.get("password");
  }

  // validation error messages
  public errorMessages = {
    username: [
      { type: "required", message: "Username is required" },
      {
        type: "maxlength",
        message: "Username cant be longer than 20 characters",
      },
    ],
    email: [
      { type: "required", message: "Email is required" },
      { type: "pattern", message: "Please enter a valid email address" },
    ],
    password: [
      { type: "required", message: "Password is required" },
      {
        type: "maxlength",
        message: "password cant be longer than 20 characters",
      },
      { type: "minlength", message: "State cant be less than 5 characters" },
      { type: "pattern", message: "must have a special character" },
    ]
  };

  // singup form validation
  signupForm = this.formBuilder.group(
    {
      username: ["", [Validators.required, Validators.maxLength(20)]],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
        ],
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(5),
          Validators.pattern(/[^((0-9)|(a-z)|(A-Z)|\s)]/),
        ],
      ]
    }
  );
  constructor(
    private api: ApiService,
    private toastController: ToastController,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  // Create an account for the user
  signUpUser(): void {
    const cred = {
      email: this.signupForm.get('email').value,
      name: this.signupForm.get('username').value,
      password: this.signupForm.get('password').value,
    };

    // Hit api to create user
    this.api.createUser(cred).subscribe((resp) => {
      this.toastController
        .create({
          message: 'User account created, please login again',
          duration: 2000,
        })
        .then((toast) => {
          toast.present();
        });
      this.router.navigate(['login']);
    });
  }

  // Navigate to Login
  navToLogin(): void {
    this.router.navigate(['login']);
  }
}
