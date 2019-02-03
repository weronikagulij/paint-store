import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import * as $ from "jquery";
import { NgForm } from "@angular/forms";
import { FormValidationModel } from "../form-validation-model";
import { ValidMessage } from "../valid-message";
import { FormResponse } from "../form-response";
import * as ScrollMagic from "ScrollMagic";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"]
})
export class IndexComponent implements OnInit {
  public registerFormRes: FormResponse;
  public loginFormRes: ValidMessage;
  public loggedIn = false;

  constructor() {
    this.loginFormRes = new ValidMessage();
    this.registerFormRes = new FormResponse(
      false,
      new ValidMessage(),
      new ValidMessage(),
      new ValidMessage(),
      new ValidMessage()
    );
  }

  ngOnInit() {
    this.animateScrolling();
  }

  childEmitter() {
    this.scrollDown();
  }

  scrollDown() {
    setTimeout(() => {
      document
        .getElementsByClassName("mat-tab-label-container")[0]
        .scrollIntoView({
          block: "center",
          behavior: "smooth"
        });
    }, 100);
  }

  onLogin(form: NgForm) {
    this.loginFormRes = FormValidationModel.validateLoginForm(
      form.form.value.username,
      form.form.value.password
    );
  }

  onRegister(form: NgForm) {
    this.registerFormRes = FormValidationModel.validateRegisterForm(
      form.form.value.username,
      form.form.value.email,
      form.form.value.password,
      form.form.value.confirmPassword
    );
    console.log(this.registerFormRes.formOk);
  }

  animateScrolling() {
    let name = ".img";

    for (let i = 1; i <= 6; i++) {
      let controller = new ScrollMagic.Controller();

      let scene = new ScrollMagic.Scene({
        triggerElement: name + i,
        triggerHook: 0.9
      })
        .setClassToggle(name + i, "visible")
        .addTo(controller);
    }
  }
}
