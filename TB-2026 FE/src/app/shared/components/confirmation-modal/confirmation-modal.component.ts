import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirmation-modal',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss'
})
export class ConfirmationModalComponent {
  title = 'Confirm Action';
  message = 'Are you sure?';
  confirmBtnText = 'Yes';
  cancelBtnText = 'Cancel';
  confirmButtonColor = '#ED5565'; // Default color for confirm button
  cancelButtonColor = '#E8E8E8'; // Default color for cancel button
  showCancelButton = true; // Show cancel button by default
  showConfirmButton = true; // Show confirm button by default
  public fa = { faTimesCircle }; // FontAwesome icon for close button

  onConfirm!: () => void;
  onCancel!: () => void;

  constructor(public bsModalRef: BsModalRef) {}


  // Method to handle confirmation action
  public confirm(): void {
    this.onConfirm?.();
    this.bsModalRef.hide();
  }

  // Method to handle cancellation action
  public cancel(): void {
    this.onCancel?.();
    this.bsModalRef.hide();
  }
}
