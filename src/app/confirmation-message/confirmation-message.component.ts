import { Component, Input, ViewChild } from "@angular/core";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";

@Component({
  selector: "app-confirmation-message",
  templateUrl: "./confirmation-message.component.html",
  styleUrls: ["./confirmation-message.component.scss"]
})
export class ConfirmationMessageComponent {
  @Input("message") message;
  @ViewChild("msg") msgElement;
  constructor() {}

  // ngOnInit() {
  //   // this.showMessage();
  // }

  showMessage() {
    // show confirmation message
    let el = this.msgElement.nativeElement;
    el.classList.add("visible");

    // remove message after 8 seconds
    setTimeout(() => {
      if (el.classList.contains("visible")) {
        el.classList.add("hidden");
        setTimeout(() => {
          el.classList.remove("hidden");
          el.classList.remove("visible");
        }, 300);
      }
    }, 6000);
  }

  public closeMessage(id: number) {
    let el = this.msgElement.nativeElement;
    el.classList.add("hidden");

    setTimeout(() => {
      el.classList.remove("hidden");
      el.classList.remove("visible");
    }, 300);
  }
}
