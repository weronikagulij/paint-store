import { Component, forwardRef } from "@angular/core";
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl
} from "@angular/forms";
import { InputField } from "../input-field";
import { requiredTextValidator } from "src/app/validators/text-validator";
import { shortTextValidator } from "src/app/validators/text-validator";

@Component({
  selector: "input-text",
  templateUrl: "../input-text.component.html",
  styleUrls: ["../input-text.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})
export class InputTextComponent extends InputField {
  constructor() {
    super();
  }

  validate(c: FormControl) {
    let validator;
    if (this.data.validation === "short") {
      validator = shortTextValidator(c, this.data.label);
    } else {
      validator = requiredTextValidator(c, this.data.label);
    }
    super.setMessage(validator);
    return validator;
  }
}
