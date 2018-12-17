import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import * as $ from "jquery";

@Component({
  selector: "input-file",
  templateUrl: "./input-file.component.html",
  styleUrls: ["./input-file.component.scss"]
})
export class InputFileComponent implements OnInit {
  private allowedTypes = ["image/png", "image/jpeg"];
  private allowedExtensions = ["png", "jpg"];
  private _information = "Drop a file here";
  private file: any = null;
  private elements = [];
  private iconsToAnimate = ["svg-upload", "svg-success", "svg-fail"];
  private validateMessage = "";
  private ok: boolean;

  @Output() emitter: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit() {
    // for animating svg icons
    this.iconsToAnimate.forEach(icon => {
      this.elements.push(document.getElementsByClassName(icon)[0]);
    });
    // add listeners to label
    let $fileLabel = $(".file-label");
    $fileLabel
      .on("drag dragstart dragend dragover dragenter dragleave drop", function(
        e
      ) {
        e.preventDefault();
      })
      .on("dragover dragenter", function() {
        $fileLabel.addClass("is-dragover");
      })
      .on("dragleave dragend drop", function() {
        $fileLabel.removeClass("is-dragover");
      })
      .on("drop", e => {
        this.file = e.originalEvent.dataTransfer.files[0];
        this.dropped();
      });

    // if label is clicked
    let $fileInput = $(".file-input");
    $fileInput.on("change", () => {
      this.file = $fileInput.prop("files")[0];
      this.dropped();
    });

    $fileLabel.on("keyup", function(e) {
      if (e.keyCode == 13) {
        $fileInput.trigger("click");
      }
    });
  }

  get information() {
    return this._information;
  }

  private validateFile() {
    let droppedFile = this.file;
    if (
      typeof droppedFile === "undefined" ||
      typeof droppedFile.type === "undefined"
    ) {
      return {
        isFileOk: false,
        information: "File type is wrong."
      };
    }

    if (
      !this.allowedTypes.includes(droppedFile.type) ||
      (droppedFile.type === "" &&
        !this.allowedExtensions.includes(droppedFile.name.split(".").pop())) ||
      droppedFile.size === 0
    ) {
      return {
        isFileOk: false,
        information: "File type is wrong."
      };
    }

    if (droppedFile.size / 1024 / 1024 > 2) {
      // 2 MB size
      return {
        isFileOk: false,
        information: "File size is too big."
      };
    }

    return {
      isFileOk: true,
      information: droppedFile.name
    };
  }

  private animateIcon(icon: string) {
    this.elements.forEach(element => {
      if (element.classList.contains("start-animation")) {
        if (element.classList.contains(icon)) return;
        element.classList.remove("start-animation");
        element.classList.add("end-animation");
      }
    });

    setTimeout(() => {
      let el = document.getElementsByClassName(icon)[0];
      el.classList.remove("end-animation", "hidden");
      el.classList.add("start-animation");
    }, 300);
  }

  private dropped() {
    let validation = this.validateFile();
    console.log(this.file);
    this._information = validation.information;

    if (validation.isFileOk === false) {
      this.ok = false;
      this.animateIcon("svg-fail");
      this.file = null;
    } else {
      this.ok = true;
      this.animateIcon("svg-success");
      // this.formData.append("image", this.file);
    }
  }

  private validate() {
    this.emitter.emit(this.file);
    if (this.file === null) {
      this.ok = false;
      this.validateMessage = "You must choose a file.";
    } else this.validateMessage = "";

    return this.ok;
  }

  private clear() {
    this.file = null;
    $(".file-input")[0].value = "";
    this.animateIcon("svg-upload");
    this._information = "Drop a file here";
  }
}
