import { Component, forwardRef } from "@angular/core";
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl
} from "@angular/forms";
import { InputField } from "../input-field";
import {
  requiredTextValidator,
  passwordValidator
} from "src/app/validators/text-validator";
import { shortTextValidator } from "src/app/validators/text-validator";

@Component({
  selector: "input-password",
  templateUrl: "./input-password.component.html",
  styleUrls: ["../input-text.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPasswordComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputPasswordComponent),
      multi: true
    }
  ]
})
export class InputPasswordComponent extends InputField {
  constructor() {
    super();
  }

  validate(c: FormControl) {
    let validator;
    validator = passwordValidator(c, this.data.label);
    super.setMessage(validator);
    return validator;
  }
}
