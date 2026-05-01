import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ImageUploadModalComponent } from '../components/image-upload-modal/image-upload-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(
    private modalService: BsModalService
  ) { }

  public openChangePhotoModalPopup(changePhotoCallback: (file: File) => void, existingImageUrl?: string, uploadbtnText?: string, modalHeader?: string): void {
    const initialState = {
      existingImageUrl: existingImageUrl,
      uploadBtnText: uploadbtnText ?? 'Upload New Photo',
      modalHeader: modalHeader ?? 'Change Photo'
    };
    const bsModalRef: BsModalRef = this.modalService.show(ImageUploadModalComponent,
      {
        initialState,
        class: 'modal-dialog-centered'
      });
    bsModalRef.content.photoChanged.subscribe((file: File) => {
      changePhotoCallback(file); // Call the provided callback with the selected file
    });
  }
}
