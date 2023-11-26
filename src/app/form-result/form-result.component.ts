import { Component, Input, OnChanges } from '@angular/core';
import { FormResult } from '../models/form-result';

@Component({
  selector: 'form-result',
  templateUrl: './form-result.component.html',
  styleUrls: ['./form-result.component.scss']
})
export class FormResultComponent implements OnChanges {

  @Input() result!: FormResult;
  certificateText: string = "";
  certificateColor: string = "";

  ngOnChanges(): void {
    this.orderResult();
    this.checkCertificateVersion();
  }

  checkCertificateVersion() : void {
    var cert = this.result.certificate;
    this.certificateColor = "red"
    if (cert) {
      switch (cert) {
        case "TLSv1.3":
          this.certificateText = "This Website uses the highest version of TLS (Version 1.3)";
          this.certificateColor = "green";
          break;
        case "TLSv1.2":
          this.certificateText = "This Website uses only TLS Version 1.2, it is suggested to upgrade to Version 1.3";
          this.certificateColor = "yellow";
          break;
        case "TLSv1.1":
          this.certificateText = "This Website uses a not supported TLS Version 1.1, it is highly suggested to upgrade to a newer version";
          break;
        case "TLSv1.0":
          this.certificateText = "This Website uses a not supported TLS Version 1.0, it is highly suggested to upgrade to a newer version";
          break;
        case "SSLv3.0":
          this.certificateText = "This Website uses SSL Version 3.0, it is highly suggested to upgrade to TLS!";
          break;
        case "SSLv2.0":
          this.certificateText = "This Website uses SSL Version 2.0, it is highly suggested to upgrade to TLS!";
          break;
        default:
          break;
      }
    }
    
    if (this.result.error == "NO SSL/TLS" || this.result.certificate == "NO SSL/TLS") {
      this.certificateText = "No SSL/TLS was setup. Please fix this issue as soon as possible with highest priority.";
    }
  }

  orderResult() : void {
    this.result.headers = this.result.headers.sort((a,b) => a.status.localeCompare(b.status));
  }


}
