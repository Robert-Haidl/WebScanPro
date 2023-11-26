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

  formResult! : FormResult;
  loading: boolean = false;
  error: string = '';
  scanForm = new FormGroup({
    websites : new FormControl('')
  })
  
  submitForm() : void {
    this.loading = true;
    const url = this.mapUrl(this.scanForm.value.websites!);
    this.scanForm.get('websites')?.setValue(url);

    this.scanService.scanWebsite(url).subscribe(
      (response) => {
        this.formResult = response;
        this.loading = false;
      },
      (error) => {
        this.error = error;
      }
    );
  }

  mapUrl(inputUrl: string) : string {
    if (!!inputUrl) {
        if (!inputUrl.startsWith('http://' || 'https://')) {
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
