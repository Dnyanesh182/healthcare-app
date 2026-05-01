import { Injectable } from '@angular/core';
import { AppConstants } from '../../core/constants/app-constants';
import { environment } from '../../../environments/environment';
import { NotificationService } from '../../core/services/notification.service';
import { LoaderService } from '../../core/services/loader.service';
import { AuthService } from '../../auth/services/auth.service';
import { ApiConstants } from '../../core/constants/api-constants';

@Injectable({
  providedIn: 'root'
})
export class ExportFileService {

  constructor(
    private notificationService: NotificationService,
    private loaderService: LoaderService,
    private authService: AuthService,
  ) { }


  public handleApiErrorResponseForFileDownload(httpRequest: XMLHttpRequest) {
    const arrayBuffer = httpRequest.response;
    this.loaderService.hide();

    if (arrayBuffer) {
      // Convert the arrayBuffer to a string
      const parseObj = new TextDecoder('utf-8').decode(arrayBuffer);

      // Parse the string as JSON
      let jsonResponse;
      try {
        // Try to parse the response text as JSON
        jsonResponse = JSON.parse(parseObj);
      } catch (error) {
        // If parsing fails, response will remain undefined
        this.notificationService.error(AppConstants.SOMETHING_WENT_WRONG);
        return;
      }

      // Show the message in swal popup
      this.notificationService.error(jsonResponse.message || AppConstants.SOMETHING_WENT_WRONG);
    } else {
      // Handle the case where arrayBuffer is null
      this.notificationService.error(AppConstants.SOMETHING_WENT_WRONG);
    }
  }

  //Method for exporting the data to the excel
  public exportDataToExcel(apiUrl: string, apiType: string, fileName?: string, params?: any) {
    apiUrl = environment.apiUrl + apiUrl;
    let vm = this;
    let httpRequest = new XMLHttpRequest();
    httpRequest.open(apiType, apiUrl, true);
    httpRequest.setRequestHeader("Authorization", `Bearer ${this.authService.getToken()}`)
    httpRequest.setRequestHeader("Content-Type", 'application/json; charset=utf-8')
    httpRequest.responseType = 'arraybuffer';
    this.loaderService.show()
    httpRequest.onload = function () {
      vm.loaderService.hide();
      if (httpRequest.status === 200) {
        const blob = new Blob([httpRequest.response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        // Create a hidden anchor element and trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName ?? "Export.xlsx";
        document.body.appendChild(a);
        a.click();
        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        vm.handleApiErrorResponseForFileDownload(httpRequest);
      }
    };
    if (ApiConstants.API_POST === apiType) {
      httpRequest.send(JSON.stringify(params));
    } else {
      httpRequest.send();
    }
  }
}
