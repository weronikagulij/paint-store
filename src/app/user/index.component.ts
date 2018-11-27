import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { NgForm } from "@angular/forms";
import { FormValidationModel } from "../form-validation-model";
import { ValidMessage } from "../valid-message";
import { FormResponse } from "../form-response";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"]
})
export class IndexComponent implements OnInit {
  public registerFormRes: FormResponse;
  public loginFormRes: ValidMessage;

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
    let menu = $("menu");
    $(menu).addClass("not-visible");

    let element = $(".right-section-images")[0];
    let divOffsetTop = $(".parallax-scrolling").offset().top;

    let scroll = function() {
      let difference = $(window).scrollTop() - divOffsetTop; // start counting when div wrapping element is on the top of the page
      let elementHeight = 600;

      if (difference > 0 && difference < elementHeight) {
        $(element).css("top", difference / 2.4 + 50);
      }

      if ($(window).scrollTop() > 10) {
        $(menu).removeClass("not-visible");
      } else {
        $(menu).addClass("not-visible");
      }
    };

    let waiting = false;
    $(window).scroll(function() {
      if (waiting) {
        return;
      }
      waiting = true;

      scroll();

      setTimeout(function() {
        waiting = false;
      }, 10);
    });
  }
}
