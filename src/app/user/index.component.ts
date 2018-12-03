import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { NgForm } from "@angular/forms";
import { FormValidationModel } from "../form-validation-model";
import { ValidMessage } from "../valid-message";
import { FormResponse } from "../form-response";
import { TweenMax } from "gsap/TweenMax";
// import "ScrollMagic/scrollmagic/uncompressed/plugins/animation.gsap";
// import "scrollMagic/scrollmagic/minified/plugins/debug.addIndicators.min.js";
import * as ScrollMagic from "ScrollMagic";
import { Scroll } from "@angular/router";
import { TweenLite } from "gsap";
// import "gsap";

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

    let controller = new ScrollMagic.Controller();

    let scene = new ScrollMagic.Scene({
      triggerElement: ".parallax-scrolling",
      duration: "1182px"
      // triggerHook: "0"
    })
      .setTween(TweenMax.from(".right-section-images", 1, { y: "-30%" }))
      .setClassToggle(".parallax-scrolling", "scrollable")
      .addTo(controller);

    //       npm install --save-dev gsap
    // npm install --save-dev @types/gsap

    // let scroll = function() {
    //   let difference = $(window).scrollTop() - divOffsetTop; // start counting when div wrapping element is on the top of the page
    //   let elementHeight = 600;

    //   if (difference > 0 && difference < elementHeight) {
    //     $(element).css("top", difference / 2 + 50);
    //   }

    //   if ($(window).scrollTop() > 10) {
    //     $(menu).removeClass("not-visible");
    //   } else {
    //     $(menu).addClass("not-visible");
    //   }
    // };

    // let waiting = false;
    // $(window).scroll(function() {
    //   if (waiting) {
    //     return;
    //   }
    //   waiting = true;

    //   scroll();

    //   setTimeout(function() {
    //     waiting = false;
    //   }, 10);
    // });
  }
}
