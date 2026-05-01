import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageUploadService } from '../../../shared/services/image-upload.service';
import { CommonApiService } from '../../../shared/services/common-api.service';
import { CommonService } from '../../../shared/services/common.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-profile-img',
  imports: [CommonModule],
  templateUrl: './account-profile-img.component.html',
  styleUrl: './account-profile-img.component.scss'
})
export class AccountProfileImgComponent implements OnInit {

  readonly DEFAULT_IMAGE = 'assets/userProfile.png';
  @Input() logoUrl: any = '';

  public accountId: string | null = "";

  constructor(
    private readonly route: ActivatedRoute,
    private readonly imageService: ImageUploadService,
    private readonly commonApiService: CommonApiService,
    private readonly commonService: CommonService
  ) {

  }
  ngOnInit(): void {
    this.accountId = this.route.snapshot.paramMap.get('accountId');
  }

  public updateLogo() {
    const imageUrl = this.logoUrl || this.DEFAULT_IMAGE;
    this.imageService.openChangePhotoModalPopup(
      this.changePhoto.bind(this),
      imageUrl,
      'Upload',
      this.logoUrl ? 'Edit Profile Photo' : 'Add Profile Photo'
    );
  }

  public removeLogo() {
    this.commonService.showConfirmationModal({
      title: 'Remove Profile Photo',
      message: 'Are you sure that you want to remove the profile photo ?',
      confirmButtonColor: '#ED5565',
      onConfirm: () => {
        const removeImageData = {
          type: 'account-logos',
          userId: '',
          accountId: this.accountId
        }
        this.commonApiService.removePhoto(removeImageData).subscribe(response => {
          this.logoUrl = null;
        });
      }
    });
  }

  public changePhoto(file: File) {
    if (file && file.size > 0) {
      const selectedFile = file;

      const formData = new FormData();
      formData.append('File', selectedFile);
      formData.append('Type', 'account-logos');

      if (this.accountId) {
        formData.append('AccountId', this.accountId);
        this.commonApiService.uploadPhotoToBlob(formData).subscribe(response => {
          this.logoUrl = response.data.fileUrl;
        });
      } else {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.logoUrl = e.target.result;
        };
        reader.readAsDataURL(selectedFile);
      }
    }
  }
}
