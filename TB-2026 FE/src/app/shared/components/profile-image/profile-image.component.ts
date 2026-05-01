import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppConstants } from '../../../core/constants/app-constants';
import { ImageUploadService } from '../../services/image-upload.service';
import { CommonApiService } from '../../services/common-api.service';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-profile-image',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './profile-image.component.html',
  styleUrl: './profile-image.component.scss'
})

export class ProfileImageComponent {

  @Input() profileImageUrl?: string = ''; // Default profile image path
  @Input() removeImagePayload?: any = {};
  @Input() formData?: FormData = new FormData();
  @Output() uploadPhotClicked: EventEmitter<any> = new EventEmitter();
  @Output() removePhoto: EventEmitter<any> = new EventEmitter();
  @Input() callSaveImageApi?: boolean = true; // Flag to determine if the save API should be called
  @Input() callRemoveImageApi?: boolean = true; // Flag to determine if the remove API should be called
  @Input() showUploadAndRemoveButtons: boolean = true; // Flag to control visibility of upload and remove buttons
  public readonly DEFAULT_IMAGE = AppConstants.DEFAULT_IMAGE_PROFILE_IMG; // Default image path


  constructor(
    private readonly imageService: ImageUploadService,
    private readonly commonService: CommonService,
    private readonly commonApiService: CommonApiService
  ) { }

  ngOnInit() {
    // Initialize any necessary data or state here
  }

  /**
   * Opens the image upload modal for updating the account profile logo.
   * - Uses the current logo URL if available, otherwise uses the default image.
   * - The modal allows the user to upload or change the profile photo.
   * - The modal title changes based on whether a logo already exists.
   */
  public uploadClicked() {
    const imageUrl = this.profileImageUrl || this.DEFAULT_IMAGE;
    this.imageService.openChangePhotoModalPopup(
      this.changePhoto.bind(this), // Callback to handle the uploaded file
      imageUrl,                    // Current image URL or default
      'Upload',                    // Upload button text
      this.profileImageUrl ? 'Edit Profile Photo' : 'Add Profile Photo' // Modal title
    );
  }

  /**
   * Removes the account profile logo after user confirmation.
   * - Shows a confirmation modal before removing the photo.
   * - If confirmed, calls the CommonApiService to remove the photo from the backend.
   * - Updates the UI with the default image and shows a success notification on success.
   */
  public removePhotoProfile() {
    this.commonService.showConfirmationModal({
      title: 'Remove Profile Photo', // Modal title
      message: 'Are you sure that you want to remove the profile photo ?', // Modal message
      confirmButtonColor: '#ED5565', // Confirm button color
      onConfirm: () => {
        if (this.callRemoveImageApi) {
          this.commonApiService.removePhoto(this.removeImagePayload).subscribe(response => {
            // Update UI with default image and show success notification
            this.profileImageUrl = '';
          });
        } else {
          this.profileImageUrl = '';
          this.removePhoto.emit(); // Emit the remove photo event
        }
      }
    });
  }

  /**
   * Handles the profile logo change/upload for the account.
   * - If a file is provided and has size, prepares FormData for upload.
   * - If accountId exists, uploads the logo to the backend and updates the UI with the new logo URL.
   * - If accountId does not exist, reads the image locally and updates the preview without uploading.
   * 
   * @param file The selected image file to upload as the account logo.
   */
  public changePhoto(file: File) {
    // Check if a file is provided and has size greater than 0
    if (file && file.size > 0) {
      const selectedFile = file;
      if (this.callSaveImageApi && this.formData) {
        // Remove any existing 'File' entry before appending the new one
        this.formData.delete('File');
        this.formData.append('File', selectedFile);
        this.commonApiService.uploadPhotoToBlob(this.formData).subscribe(response => {
          // Update UI with the new logo URL and show success notification
          this.profileImageUrl = response.data.fileUrl;
        });

      } else {
        // If no form data keys, read the image locally and update the preview
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.profileImageUrl = e.target.result;
        };
        reader.readAsDataURL(selectedFile);
        this.uploadPhotClicked.emit(file);
      }
    }
  }
}
