import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    let mainMenu = $(".menu-user");
    let toggledMenu = $(".menu-toggled");
    let icon = mainMenu.find(".menu-toggle-down");
    let isFocused = false;

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
      }, 200);
    }

    $(mainMenu)
      .on("mouseenter touch", () => {
        showMenu();
      })
      .on("mouseleave", () => {
        hideMenu();
      });
  }
}
