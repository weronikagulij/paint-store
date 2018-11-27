import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ImageService } from "../services/image.service";
import { Photo } from "./photo";
import { NgForm } from "@angular/forms";
import {
  UploadEvent,
  UploadFile,
  FileSystemFileEntry,
  FileSystemDirectoryEntry
} from "ngx-file-drop";

import * as $ from "jquery";
import { ValidateFileForm } from "../validate-file-form";

@Component({
  selector: "app-add-photo",
  templateUrl: "./add-photo.component.html",
  styleUrls: ["./add-photo.component.scss"]
})
export class AddPhotoComponent implements OnInit {
  // @ViewChild("dragAndDrop") dragAndDrop: ElementRef;

  // private file: any = [];
  private formData: FormData;
  private allowedTypes = ["image/png", "image/jpeg"];
  private allowedExtensions = ["png", "jpg"];
  private information = "Drop a file here";
  private iconsToAnimate = ["svg-upload", "svg-success", "svg-fail"];
  private elements = [];
  public validateMessage: ValidateFileForm;
  private file: any = null;

  constructor() {
    this.formData = new FormData();
    this.validateMessage = new ValidateFileForm();
  }

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

    this.information = validation.information;

    if (validation.isFileOk === false) {
      this.animateIcon("svg-fail");
      this.file = null;
    } else {
      this.animateIcon("svg-success");
      this.formData.append("image", this.file);
    }
  }

  public getValidationMessage(): ValidateFileForm {
    return this.validateMessage;
  }

  public getInformation(): string {
    return this.information;
  }

  public onFormUpload(form: NgForm) {
    let formOk = true;
    this.formData.append("username", "ania");

    if (form.form.value.title === null || form.form.value.title.length < 3) {
      formOk = false;
      this.validateMessage.title = "Title must be at least 4 characters long.";
    } else {
      this.formData.append("title", form.form.value.title);
      this.validateMessage.title = "";
    }

    this.formData.append("description", form.form.value.description);

    if (form.form.value.category === null || form.form.value.category === "") {
      formOk = false;
      this.validateMessage.category = "You must choose a category.";
    } else {
      this.formData.append("category", form.form.value.category);
      this.validateMessage.category = "";
    }

    if (this.file === null) {
      formOk = false;
      this.validateMessage.file = "You must choose a file.";
    } else this.validateMessage.file = "";

    // form.form.value.tags are array of objects
    // [ { display: "tag1", value: "tag1" } ]

    this.formData.append("tags", form.form.value.tags);

    if (formOk === true) {
      form.reset();
      this.file = null;
      $(".file-input")[0].value = "";
      this.animateIcon("svg-upload");
      this.information = "Drop a file here";

      // show confirmation message
      let el = document.getElementsByClassName("message")[0];
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
      }, 8000);
    }
  }

  public closeMessage(id: number) {
    let el = document.getElementsByClassName("message")[id];
    el.classList.add("hidden");

    setTimeout(() => {
      el.classList.remove("hidden");
      el.classList.remove("visible");
    }, 300);
  }
}
