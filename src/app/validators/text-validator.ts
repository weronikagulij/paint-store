import { FormControl } from "@angular/forms";

export function textValidator(c: FormControl, fieldName: string) {
  return c.value.length < 4
    ? { error: fieldName + " must be at least 4 characters long." }
    : null;
}
