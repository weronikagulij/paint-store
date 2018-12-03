import { Component, OnInit, Input } from "@angular/core";
import * as $ from "jquery";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit {
  @Input() isLoggedIn: boolean;
  constructor() {}

  ngOnInit() {
    if (this.isLoggedIn === false) {
      $("menu").addClass("logged-out");
    }

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
}
