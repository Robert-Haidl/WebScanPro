import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormResult } from '../models/form-result';
import { ScanService } from '../services/scan.service';

@Component({
  selector: 'scan-form',
  templateUrl: './scan-form.component.html',
  styleUrls: ['./scan-form.component.scss']
})
export class ScanFormComponent {

  constructor(private scanService: ScanService) {}

  formResult! : FormResult[];
  loading: boolean = false;
  error: string = '';
  scanForm = new FormGroup({
    websites : new FormControl('')
  })
  
  submitForm() : void {
    this.loading = true;
    const url = this.mapUrl(this.scanForm.value.websites!);

    this.scanService.scanWebsite(url).subscribe(
      (response : FormResult[]) => {
        this.formResult = response;
        this.loading = false;
      },
      (error) => {
        this.error = error;
      }
    );
  }

  mapUrl(formInput: string) : string[] {
    formInput = formInput.replaceAll(" ", "");
    const urls = formInput.split(",");
    return urls.map(url => this.addProtocolToUrl(url));
  }
  addProtocolToUrl(inputUrl: string) : string {
    if (!!inputUrl) {
        if (!inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
          inputUrl = 'https://' + inputUrl;
        }
        if (inputUrl.startsWith('http://')) {
          inputUrl = 'https://' + inputUrl.split('//')[1];
        }
        return inputUrl;
    }
    
    return 'No URL provided';
  }

}
