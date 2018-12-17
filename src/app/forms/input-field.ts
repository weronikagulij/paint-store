import {
  Component,
  OnInit,
  Input,
  ViewChild,
  forwardRef,
  ElementRef,
  OnChanges,
  AfterContentChecked
} from "@angular/core";
import { Data } from "./data";
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  Validator,
  NG_VALIDATORS,
  FormControl
} from "@angular/forms";

export abstract class InputField implements OnChanges, ControlValueAccessor {
  protected _validateMessage: string;
  editing: boolean = false;
  @Input() data: Data;
  @ViewChild("input") Input: ElementRef;

  constructor() {
    this._validateMessage = "";
  }

  public abstract validate(param): void;

  setMessage(validator) {
    // if there is an error
    if (validator !== null) {
      this._validateMessage = validator.error;
    } else {
      this._validateMessage = "";
    }
  }

  // allow to choose if edit fields are visible
  startEditing() {
    this.editing = true;
  }

  stopEditing() {
    this.editing = false;
  }

  // to not show error when first validate empty field
  ngOnChanges() {
    this.propagateChange(this.Input.nativeElement.value);
  }

  // Control Value Accessor Implementation
  propagateChange = (_: any) => {};

  writeValue(value: string) {
    if (value !== undefined) {
      this.Input.nativeElement.value = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  change(value) {
    this.propagateChange(value);
  }

  // getters
  get validateMessage() {
    return this._validateMessage;
  }
}
