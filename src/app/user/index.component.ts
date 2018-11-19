import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"]
})
export class IndexComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    let menu = $("menu");
    $(menu).addClass("not-visible");

    let element = $(".right-section-images")[0];
    let divOffsetTop = $(".parallax-scrolling").offset().top;
    let overlay = $(".overlay")[0];

    let scroll = function() {
      let difference = $(window).scrollTop() - divOffsetTop; // start counting when div wrapping element is on the top of the page
      let elementHeight = 600;

      if (difference > 0 && difference < elementHeight) {
        $(element).css("top", difference / 2.4 + 50);

        $(overlay).addClass("allowVisibility");
      } else {
        $(overlay).removeClass("allowVisibility");
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
