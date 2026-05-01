import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ACCOUNT_IMPORTS } from '../../account.config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noOnlyWhitespace } from '../../../shared/validator/no-only-whitespace.validator';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountApiService } from '../../services/account-api.service';

@Component({
  selector: 'app-sharepoint-config',
  imports: [ACCOUNT_IMPORTS],
  templateUrl: './sharepoint-config.component.html',
  styleUrl: './sharepoint-config.component.scss'
})
export class SharepointConfigComponent implements OnInit, OnChanges {

  @Input() accountData: any = null;

  shareponitForm! : FormGroup;
  selectedAccount : any;
  editClient      : any;
  accId           : any;
  defaultValues   : any = {};
  sharepointerrorMessage = '';
  sharepointsuccessMsg = '';
  isVerifyingSharePoint: boolean = false;
  showPassword: boolean = false;
  showSecretId: boolean = false;

  constructor(
    private fb: FormBuilder,
    private accountApiService: AccountApiService
  ) {}

  ngOnInit() { 
    this.setupForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Whenever the parent passes new accountData, update the form and selected account
    if (changes['accountData'] && this.accountData?.accountId && this.shareponitForm) {
      this.setData(this.accountData);
    }
  }

  private setupForm() {
    this.shareponitForm = this.fb.group({
      sharepointusername: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(100),
          noOnlyWhitespace
        ]
      ],
      sharepointpassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          noOnlyWhitespace
        ]
      ],
      sharepointUrl: [
        '',
        [
          Validators.required,
          Validators.maxLength(500),
          // Accept any valid HTTPS URL
          Validators.pattern(/^https:\/\/.+/i),
          noOnlyWhitespace
        ]
      ],
      sharepointAppId: [
        '',
        [
          Validators.required,
          Validators.maxLength(100),
          noOnlyWhitespace
        ]
      ],
      accountSecretId: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          noOnlyWhitespace
        ]
      ],
      defaultFolderPath: [
        '',
        [
          Validators.required,
          // Accept any path: starting with / or a word character
          Validators.pattern(/^[\/\w].*/),
          noOnlyWhitespace
        ]
      ]
    });
  }

  public setData(data: any) {
    this.selectedAccount = data;
    // Reset toggle states when loading new account data
    this.showPassword = false;
    this.showSecretId = false;
    this.sharepointerrorMessage = '';
    this.sharepointsuccessMsg = '';
    this.isVerifyingSharePoint = false;

    const config = data.sharepointConfigurations;
    this.shareponitForm.enable(); // ensure form is enabled before patching
    this.shareponitForm.patchValue({
      sharepointusername: config?.userName,
      sharepointpassword: config?.password,
      sharepointUrl: config?.siteUrl,
      sharepointAppId: config?.appId,
      accountSecretId: config?.clientSecret,
      defaultFolderPath: config?.defaultFolderPath
    });

    this.defaultValues = this.shareponitForm.getRawValue();

    // Disable form ONLY when SharePoint is successfully connected AND has no error
    // (i.e. everything is working — no reason to re-configure)
    if (
      data?.isSharePointConnected === true &&
      (
        data.sharePointConnectionError === null ||
        data.sharePointConnectionError?.trim() === ''
      )
    ) {
      this.shareponitForm?.disable();
    }
  }

  get isValueChanged()
  {
    const currentValues = this.shareponitForm.getRawValue();
    if (!this.defaultValues && !currentValues) return false;

    if (!this.defaultValues || !currentValues) return true;

    const allKeys = new Set([
      ...Object.keys(this.defaultValues),
      ...Object.keys(currentValues),
    ]);

    for (const key of allKeys) {
      if (this.defaultValues[key] !== currentValues[key]) {
        return true;
      }
    }

    return false;
  }

  public onSharepointSubmit() {
    // Mark all fields as touched so validation error messages are shown to the user
    if (this.shareponitForm.invalid) {
      Object.values(this.shareponitForm.controls).forEach(control => {
        control.markAsTouched();
        control.markAsDirty();
      });
      return;
    }

    // Guard: selectedAccount must be set before submitting
    if (!this.selectedAccount || !this.selectedAccount.accountId) {
      this.sharepointerrorMessage = 'Account data not loaded. Please reload the page and try again.';
      return;
    }

    const formValues = this.shareponitForm.getRawValue();
    
    if (this.selectedAccount?.sharepointConfigurations) {
      const payload: any = {
        AccountId: this.selectedAccount.accountId,
        SiteUrl: formValues.sharepointUrl,
        UserName: formValues.sharepointusername,
        Password: formValues.sharepointpassword,
        AppId: formValues.sharepointAppId,
        ClientSecret: formValues.accountSecretId,
        DefaultFolderPath: formValues.defaultFolderPath,
        SharepointId: this.selectedAccount.sharepointConfigurations.id
      };

      this.selectedAccount.isSharePointConnected = false

      this.accountApiService.updateSharepointConfiguration(payload).subscribe({
        next: (res: any) => {
          this.onSuccess(res);
          this.isVerifyingSharePoint = true;
        },
        error: (response: HttpErrorResponse) => {
          this.sharepointerrorMessage = response.error?.errorMessage ?? response.message ?? 'An error occurred.';
          this.sharepointsuccessMsg = '';
        }
      });
    } else {
      const payload: any = {
        AccountId: this.selectedAccount.accountId,
        SiteUrl: formValues.sharepointUrl,
        UserName: formValues.sharepointusername,
        Password: formValues.sharepointpassword,
        AppId: formValues.sharepointAppId,
        ClientSecret: formValues.accountSecretId,
        DefaultFolderPath: formValues.defaultFolderPath
      };

      this.accountApiService.addSharepointConfiguration(payload).subscribe({
        next: (res: any) => {
          this.onSuccess(res);
          this.isVerifyingSharePoint = true;
        },
        error: (response: HttpErrorResponse) => {
          this.sharepointerrorMessage = response.error?.errorMessage ?? response.message ?? 'An error occurred.';
          this.sharepointsuccessMsg = '';
        }
      });
    }
  }

  private onSuccess(response: any): void {
    this.sharepointerrorMessage = '';
    this.sharepointsuccessMsg = response.message ?? 'SharePoint configuration saved successfully.';
    const id = this.selectedAccount.accountId;
    this.accountApiService.getAccountById(id).subscribe((account: any) => {
      this.isVerifyingSharePoint = false; // hide "Please wait..." now that we have the result
      this.selectedAccount = account; // API returns account directly, not wrapped
      if (
        this.selectedAccount?.sharepointConfigurations &&
        (
          this.selectedAccount.sharePointConnectionError === null ||
          this.selectedAccount.sharePointConnectionError?.trim() === ''
        )
      ) {
        this.shareponitForm?.disable();
      }
    });
  }
}

