import { FormControl } from "@angular/forms";

export function passwordsValidator(c: FormControl, fieldName: string) {
  if (c.value === "" || typeof c.value === undefined)
    return {
      error: fieldName + "'s length must be at least 8 characters long."
    };
  if (c.value.new.length < 8)
    return {
      error: fieldName + "'s length must be at least 8 characters long."
    };
  if (c.value.confirm !== c.value.new)
    return { error: fieldName + "s cannot be different." };
  return null;
}
