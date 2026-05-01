import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-image-upload',
  templateUrl: './profile-image-upload.component.html',
  styleUrl: './profile-image-upload.component.scss',
  imports: [CommonModule]
})
export class ProfileImageUploadComponent {
  @Input() imageUrl: string = '';
  @Input() name: string = '';
  @Input() role: string = '';
  @Input() username: string = '';
  @Input() isUploadPhoto: boolean | undefined;
  @Input() uploadButtonText: string | undefined;
  @Input() removeButtonText: string | undefined;
  @Input() changeButtonText: string | undefined;
  @Output() uploadClicked = new EventEmitter<void>();
  @Output() removeModal = new EventEmitter<void>();
  @Output() openPhotoModal = new EventEmitter<void>();

  onUploadClick() {
    this.uploadClicked.emit();
  }

  removePhoto()
   {
    this.removeModal.emit();
  }

  openChangePhotoModal(){
    this.openPhotoModal.emit()
  }

}
