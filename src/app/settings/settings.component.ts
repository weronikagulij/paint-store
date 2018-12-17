import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { textValidator } from "../validators/text-validator";
import { emailValidator } from "../validators/email-validator";
import { passwordsValidator } from "../validators/passwords-validator";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"]
})
export class SettingsComponent implements OnInit {
  private _user = {
    name: "ania",
    email: "ania@gmail.com",
    link: "czesc, jestem ania",
    description: "moj opis"
  };

  form: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      userName: [this.user.name, [Validators.required, textValidator]],
      email: [this.user.email, [Validators.required, emailValidator]],
      shortInformation: [this.user.link, [Validators.required, textValidator]],
      description: [
        this.user.description,
        [Validators.required, textValidator]
      ],
      password: ["", [Validators.required, passwordsValidator]]
    });
  }

  childEmitter($event) {
    console.log($event);
  }

  onFormUpload(form: NgForm) {
    console.log(form);
  }

  get user() {
    return this._user;
  }
}
