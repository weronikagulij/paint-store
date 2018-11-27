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

@Component({
  selector: "app-add-photo",
  templateUrl: "./add-photo.component.html",
  styleUrls: ["./add-photo.component.scss"]
})
export class AddPhotoComponent implements OnInit {
  // @ViewChild("dragAndDrop") dragAndDrop: ElementRef;

  private file: any = [];
  private formData: FormData;
  private allowedTypes = ["image/png", "image/jpeg"];
  private allowedExtensions = ["png", "jpg"];
  private information = "";
  private iconsToAnimate = ["svg-upload", "svg-success", "svg-fail"];
  private elements = [];

  constructor() {
    this.formData = new FormData();
  }

  ngOnInit() {
    // for animating svg icons
    this.iconsToAnimate.forEach(icon => {
      this.elements.push(document.getElementsByClassName(icon)[0]);
    });

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
      .on("drop", this.dropped.bind(this));
  }

  private validateFile() {
    const droppedFile = this.file;

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

  animateIcon(icon: string) {
    // if (this.elements[0].classList.contains("start-animation")) {
    //   this.elements[0].classList.remove("start-animation");
    //   this.elements[0].classList.add("end-animation");
    // }
    this.elements.forEach(element => {
      if (element.classList.contains("start-animation")) {
        element.classList.remove("start-animation");
        element.classList.add("end-animation");
      }
    });

    setTimeout(() => {
      let el = document.getElementsByClassName(icon)[0];
      el.classList.remove("end-animation");
      el.classList.add("start-animation");
    }, 600);
  }

  public dropped(e) {
    this.file = e.originalEvent.dataTransfer.files[0];
    let validation = this.validateFile();

    this.information = validation.information;

    // $(this.svgSuccess).addClass("start-animation");

    // let element = document.getElementsByClassName("svg-success")[0];
    // element.classList.add("start-animation");

    if (validation.isFileOk === false) {
      this.animateIcon("svg-fail");
      this.file = null;
    } else {
      this.animateIcon("svg-success");
      this.formData.append("image", this.file);
      // console.log(this.file);
    }
  }

  public getInformation(): string {
    return this.information;
  }

  // public fileOver(event) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   console.log(event);
  // }

  // public fileLeave(event) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   console.log(event);
  // }

  onFormUpload(form: NgForm) {
    this.formData.append("username", "ania");
    this.formData.append("title", form.form.value.title);
    this.formData.append("description", form.form.value.description);
    this.formData.append("category", form.form.value.category);

    // form.form.value.tags are array of objects
    // [
    //   {
    //      display: "tag1",
    //      value: "tag1"
    //   }
    // ]

    this.formData.append("tags", form.form.value.tags);
  }
}
