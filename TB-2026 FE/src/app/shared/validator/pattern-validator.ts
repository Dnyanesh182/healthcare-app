import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static patternValidator(regex: RegExp, errorKey: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || regex.test(control.value)) {
        return null; // valid
      }
      return { [errorKey]: true }; // invalid
    };
  }

  static fileTypeValidator(allowedTypes: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const file = control.value;
      if (!file) {
        return null; // valid
      }
      const fileExtension = file.split('.').pop()?.toLowerCase();
      if (!allowedTypes.includes(fileExtension || '')) {
        return { invalidType: true }; // invalid
      }
      return null; // valid
    };
  }

  static fileSizeValidator(maxSize: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const file = control.value;
      if (!file) {
        return null; // valid
      }
      if (file?.size > maxSize) {
        return { maxSize: true }; // invalid
      }
      return null; // valid
    };
  }
}
