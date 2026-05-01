import { AbstractControl, ValidationErrors } from "@angular/forms";

export function atLeastOneCheckboxCheckedValidator(
  control: AbstractControl
): ValidationErrors | null {
  const formArray = control as any;
  return formArray.length > 0 ? null : { required: true };
}