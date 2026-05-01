import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-image-upload-modal',
  templateUrl: './image-upload-modal.component.html',
  imports: [CommonModule, FontAwesomeModule],
  styleUrls: ['./image-upload-modal.component.scss'],
})
export class ImageUploadModalComponent {
  @Input() existingImageUrl?: string;
  @Input() uploadBtnText?: string;
  @Input() modalHeader: string = 'Change Photo';
  @Output() photoChanged = new EventEmitter<File>();
  public fa = { faTimesCircle }; // FontAwesome icon for close button
  public errorMsg = '';
  public imagePreview: string | ArrayBuffer | null = null;
  public lastValidFile: File | null = null;

  constructor(public bsModalRef: BsModalRef) { }

  public onFileChange(event: any) {
    const file = event.target.files[0];
    this.errorMsg = '';
    if (!file) {
      return;
    }
    const maxSizeBytes = 2 * 1024 * 1024;
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (!allowedExtensions.includes(fileExtension || '')) {
      this.errorMsg = 'Please upload a JPG, JPEG, or PNG file.';
      return;
    }
    if (file.size > maxSizeBytes) {
      this.errorMsg = 'Please upload an image smaller than 2MB.';
      return;
    }
    this.lastValidFile = file || this.lastValidFile;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagePreview = e.target?.result ?? null;
    };
    reader.readAsDataURL(file);
  }

  public onSave() {
    if (this.lastValidFile) {
      this.photoChanged.emit(this.lastValidFile);
      this.bsModalRef.hide();
    }
  }

  public onCancel() {
    this.bsModalRef.hide();
  }
}