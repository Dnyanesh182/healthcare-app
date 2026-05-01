import { AbstractControl, ValidationErrors } from '@angular/forms';

export function noOnlyWhitespace(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  // Skip validation if value is empty (i.e., optional field)
  if (value === null || value === undefined || value === '') {
    return null;
  }

  if (typeof value === 'string' && value.trim().length === 0) {
    return { whitespace: true };
  }

  return null;
}
