import { Injectable } from '@angular/core';
import { ConfirmationModalComponent } from '../components/confirmation-modal/confirmation-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';

/**
 * Interface for configuring the confirmation modal.
 */
export interface ConfirmationModalOptions {
  title?: string;                // Modal title text
  message?: string;              // Modal message/body text
  confirmBtnText?: string;       // Text for the confirm button
  cancelBtnText?: string;        // Text for the cancel button
  confirmButtonColor?: string;   // Background color for the confirm button
  cancelButtonColor?: string;    // Background color for the cancel button
  showCancelButton?: boolean; // Whether to show the cancel button
  showConfirmButton?: boolean; // Whether to show the confirm button
  onConfirm?: () => void;        // Callback when confirm is clicked
  onCancel?: () => void;         // Callback when cancel is clicked
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private bsModalService: BsModalService
  ) { }

  /**
   * Opens a confirmation modal with customizable options.
   * @param options Configuration for the modal (title, message, button texts/colors, callbacks)
   */
  public showConfirmationModal(options: ConfirmationModalOptions = {}): void {
    // Destructure options with default values
    const {
      title = 'Confirm Action',
      message = 'Are you sure?',
      confirmBtnText = 'Yes',
      cancelBtnText = 'Cancel',
      confirmButtonColor =  '#8D8FDF', // Default color for confirm button
      cancelButtonColor = '#E8E8E8', // Default color for cancel button,
      showCancelButton = true, // Show cancel button by default
      showConfirmButton = true, // Show confirm button by default
      onConfirm = () => { },
      onCancel = () => { }
    } = options;

    // Prepare initial state for the modal component
    const initialState = {
      title,
      message,
      confirmBtnText,
      cancelBtnText,
      confirmButtonColor,
      cancelButtonColor,
      showCancelButton,
      showConfirmButton,
      onConfirm,
      onCancel
    };

    // Show the confirmation modal using ngx-bootstrap's modal service
    this.bsModalService.show(ConfirmationModalComponent, {
      initialState,
      class: 'modal-dialog-centered modal-md confirmation-modal',
      backdrop: 'static' // <-- This prevents closing on outside click
    });
  }

  // Helper: Extract group description logic
  public getGroupDescription(masterKey: string): string {
    const descriptions: { [key: string]: string } = {
      'ResumeAutomation': 'Automate resume formatting and employment verification Record',
      'ComplianceChecks': 'Verify candidate compliance through Nursys, OIG, SAM, State License Board Check',
      'LicenseCheckUrl': 'Validate licenses and credentials securely',
      'FileConverter': 'Convert files quickly between multiple formats'
    };

    return descriptions[masterKey] || '';
  }

  /**
   * Groups lookup data by masterKey with masterKeyDisplayName as parent
   * Call this method to group lookup data by their masterKey.
   * @param data - Array of lookup items with masterKey and masterKeyDisplayName properties
   * @returns Grouped data structure
   */
  public groupDataByMasterKey(data: any[]): any[] {
    const grouped = data.reduce((acc, item) => {
      const key = item.masterKey;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {} as { [key: string]: any[] });

    return Object.keys(grouped).map(masterKey => {
      const items = grouped[masterKey];
      const masterKeyDisplayName = items[0]?.masterKeyDisplayName || masterKey;
      const groupDescription = this.getGroupDescription(masterKey);

      return {
        masterKey,
        masterKeyDisplayName,
        children: items,
        isExpanded: false,
        groupDescription
      };
    });
  }
}