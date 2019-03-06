import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ImageService } from "../services/image.service";
import { Photo } from "./photo";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  UploadEvent,
  UploadFile,
  FileSystemFileEntry,
  FileSystemDirectoryEntry
} from "ngx-file-drop";

import { ValidateFileForm } from "../validate-file-form";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { requiredTextValidator } from "../validators/text-validator";
import { fileValidator } from "../validators/file-validator";
import { LoggedIn } from "../classes/logged-in";

@Component({
  selector: "app-add-photo",
  templateUrl: "./add-photo.component.html",
  styleUrls: ["./add-photo.component.scss"]
})
export class AddPhotoComponent extends LoggedIn implements OnInit {
  @ViewChild("message") Message;
  @ViewChild("file") File;

  private _uploadWarning = "";
  private uploadForm: FormGroup;

  constructor(private fb: FormBuilder, private service: ImageService) {
    super();
    this.uploadForm = this.fb.group({
      title: ["", [Validators.required, requiredTextValidator]],
      description: "",
      tags: "",
      category: "",
      file: ["", fileValidator]
    });
  }

  ngOnInit() {
    super.ngOnInit();
  }

  public onUpload(form: NgForm) {
    console.log(this.File.getFile());
    if (form.status === "INVALID") {
      this._uploadWarning = "Title and file must be added.";
    } else {
      let newTags = [];
      let tags = form.value.tags;

      if (tags !== [] && tags !== "") {
        // console.log(tags);
        tags.forEach(el => {
          newTags.push(el.value);
        });
      }
      form.value.tags = newTags;
      // console.log(form.value);
      this.service.uploadImage(form.value, this._loggedId, this._loggedToken);
      this._uploadWarning = "";
    }
  }

  get uploadWarning(): string {
    return this._uploadWarning;
  }
}
