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
import { IsUserLoggedIn } from "../classes/is-user-logged-in";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit {
  @ViewChild("menu") menu: ElementRef;
  @ViewChild("menuToggled") menuToggled: ElementRef;
  @ViewChild("button") button: ElementRef;

  constructor(private user: LoginManager, private router: Router) { }

  ngOnInit() {
    // menu on homepage looks differently
    if (this.user.userLoggedIn === false) {
      $("menu").addClass("logged-out");
    }
    if (
      !this.menu.nativeElement.classList.contains("static") &&
      window.location.pathname === "/homepage"
    ) {
      this.menu.nativeElement.classList.add("static");
    }

    // hide toggled menu when clicked somewhere on page
    document.addEventListener('click', (e) => {
      if ((e.target !== this.menuToggled.nativeElement && !this.menuToggled.nativeElement.contains(e.target))
        && (e.target !== this.button.nativeElement && !this.button.nativeElement.contains(e.target))) {
        this.menuToggled.nativeElement.classList.remove('visible');
      }
    });

    // scroll menu
    for (let i = 1; i <= 6; i++) {
      let controller = new ScrollMagic.Controller();

      let scene = new ScrollMagic.Scene({
        triggerElement: ".scrollmagic-toggle",
        triggerHook: 0,
        offset: 40
      })
        .setClassToggle(".container-menu", "scrolled")
        .addTo(controller);
    }
  }

  toggleMenu() {
    this.menuToggled.nativeElement.classList.toggle('visible');
  }
}
