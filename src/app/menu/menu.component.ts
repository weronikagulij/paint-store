import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  ElementRef
} from "@angular/core";
import * as $ from "jquery";
import * as ScrollMagic from "ScrollMagic";
import { EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { LoginManager } from "../classes/login-manager";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit {
  @ViewChild("menu") menu: ElementRef;
  private isLoggedIn = true;

  constructor(private user: LoginManager, private router: Router) {}

  ngOnInit() {
    if (this.isLoggedIn === false) {
      $("menu").addClass("logged-out");
    }
    if (
      !this.menu.nativeElement.classList.contains("static") &&
      window.location.pathname === "/homepage"
    ) {
      this.menu.nativeElement.classList.add("static");
    }
    this.animateSlideDown();
  }

  animateSlideDown() {
    let mainMenu = $(".menu-user");
    let toggledMenu = $(".menu-toggled");
    let button = mainMenu.find(".menu-toggle-down");
    let hoverable = $(".hoverable");

    function showMenu() {
      toggledMenu.addClass("menu-visible");
      setTimeout(() => {
        toggledMenu.addClass("menu-animate");
      }, 5);
    }

    function hideMenu() {
      toggledMenu.removeClass("menu-animate");
      setTimeout(() => {
        toggledMenu.removeClass("menu-visible");
      }, 20);
    }

    function isNextHoverFocusable(e) {
      if (
        !(
          $(e.relatedTarget).hasClass("hoverable") ||
          $(e.relatedTarget)
            .parents()
            .hasClass("hoverable")
        )
      ) {
        return false;
      }
      return true;
    }

    $(hoverable)
      .on("mouseenter touch", () => {
        showMenu();
      })
      .on("mouseleave", e => {
        if (!isNextHoverFocusable(e)) {
          hideMenu();
        }
      })
      .on("focusout", e => {
        if (!isNextHoverFocusable(e)) {
          hideMenu();
        }
      });

    $(button).on("keyup", function(e) {
      if (e.keyCode == 13) {
        showMenu();
      }
    });
  }

  // scrollDown() {
  //   this.emitter.emit();
  // }
}
