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

  formResult : FormResult = { value : "" };

  scanForm = new FormGroup({
    websites : new FormControl('')
  })
  
  submitForm() : void {
    this.scanService.scanWebsite(this.scanForm.value.websites!).subscribe(
      (response) => { this.formResult = { value: response } },
      (error) => { console.log(error); }
    );
  }

}
