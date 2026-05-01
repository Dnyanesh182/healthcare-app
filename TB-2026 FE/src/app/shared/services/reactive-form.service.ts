import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ReactiveFormService {


  public validateForm(group : FormGroup, formErrors: any, validationMessages: any, flag:boolean = false)
  {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (!abstractControl) return;

      // recurse if nested FormGroup
      if (abstractControl instanceof FormGroup) {
        this.validateForm(abstractControl, formErrors,validationMessages, flag);
        return;
      } 
      formErrors[key] = '';
    if (abstractControl.valid || (!abstractControl.dirty && !flag)) return;

    const messages = validationMessages[key];
    const errors = abstractControl.errors;            // capture once

    if (errors) {
      Object.keys(errors).forEach(errKey => {
        const messages = validationMessages[key]; // may be undefined for unlisted controls
        formErrors[key] +=
          errKey === 'passwordStrength'
            ? errors['passwordStrength']
            : (messages && messages[errKey] ? messages[errKey] + ' ' : '');
      });
    }
    });
  }

  /**
   * Validates the form controls and updates the error messages.
   * 
   * @param formGroup - The FormGroup containing the form controls to validate.
   * @param errorMsg - An object to store the error messages for each form control.
   * @param defaultMsg - An object containing the default error messages for each form control.
   * @param showValidationMsg - A boolean flag to indicate whether to show validation messages for all controls.
   */
  public validateMultipleFormValidation(
    formGroup: FormGroup,
    errorMsg: any,
    defaultMsg: any,
    showValidationMsg: boolean = false
  ): void {
    Object.keys(formGroup.controls).forEach(key => {
      const abstractControl = formGroup.get(key);
      const controlErrors = abstractControl?.errors;

      if (
        abstractControl &&
        !abstractControl.valid &&
        (abstractControl.dirty || abstractControl.touched || showValidationMsg)
      ) {
        errorMsg[key] = '';
        if (controlErrors) {
          errorMsg[key] = this.getValidationErrorMsg(key, controlErrors, defaultMsg);
        }
      } else {
        errorMsg[key] = '';
      }
    });
  }

  private getValidationErrorMsg(key: string, controlErrors: any, defaultMsg: any): string {
    const errorMap: { [err: string]: (msg: any, errObj: any) => string } = {
      required: (msg) => msg?.required || 'This field is required',
      maxlength: (msg, errObj) => msg?.maxLength || `Maximum length is ${errObj['maxlength'].requiredLength} characters`,
      min: (msg, errObj) => msg?.min || `Minimum value is ${errObj['min'].min}`,
      max: (msg, errObj) => msg?.max || `Maximum value is ${errObj['max'].max}`,
      pattern: (msg) => msg?.pattern || 'Invalid input',
      whitespace: (msg) => msg?.whitespace || 'Cannot be empty or whitespace only',
      invalidType: (msg) => msg?.invalidType || 'Invalid file type',
      maxSize: (msg) => msg?.maxSize || 'File size exceeds maximum limit',
      invalidSelection: (msg) => msg?.invalidSelection || 'Invalid selection'
      // Add more mappings as needed
    };

    for (const errKey of Object.keys(controlErrors)) {
      if (errorMap[errKey]) {
        return errorMap[errKey](defaultMsg[key], controlErrors);
      }
    }
    return '';
  }

  public markDirty(form : FormGroup) {
    this.markGroupDirty(form);
  }

  private markGroupDirty(formGroup: any) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.markGroupDirty(control);
      } else if (control instanceof FormArray) {
        control.markAsDirty();
        this.markArrayDirty(control);
      } else if (control instanceof FormControl) {
        this.markControlDirty(control);
      }
    });
  }

  private markArrayDirty(formArray: FormArray) {
    formArray.controls.forEach(control => {
      if (control instanceof FormGroup) {
        this.markGroupDirty(control);
      } else if (control instanceof FormArray) {
        control.markAsDirty();
        this.markArrayDirty(control);
      } else if (control instanceof FormControl) {
        this.markControlDirty(control);
      }
    });
  }

  private markControlDirty(formControl: FormControl) {
    formControl.markAsDirty();
  }

}