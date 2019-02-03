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

import { ValidateFileForm } from "../validate-file-form";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";

@Component({
  selector: "app-add-photo",
  templateUrl: "./add-photo.component.html",
  styleUrls: ["./add-photo.component.scss"]
})
export class AddPhotoComponent implements OnInit {
  // @ViewChild("dragAndDrop") dragAndDrop: ElementRef;
  @ViewChild("message") Message;
  @ViewChild("file") File;

  // private file: any = [];
  private formData: FormData;
  public validateMessage: ValidateFileForm;

  constructor() {
    this.formData = new FormData();
    this.validateMessage = new ValidateFileForm();
  }

  ngOnInit() { }

  public getValidationMessage(): ValidateFileForm {
    return this.validateMessage;
  }

  childEmitter($event) {
    this.formData.append("image", $event);
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

    console.log(this.File.getFile());

    // validate file
    if (this.File.validate() === false) {
      formOk = false;
    }
    // form.form.value.tags are array of objects
    // [ { display: "tag1", value: "tag1" } ]

    this.formData.append("tags", form.form.value.tags);

    if (formOk === true) {
      form.reset();
      this.File.clear();
      // this.file = null;
      // $(".file-input")[0].value = "";
      // this.animateIcon("svg-upload");
      // this.information = "Drop a file here";

      this.Message.show("File uploaded successfully.");
    }
  }
}
