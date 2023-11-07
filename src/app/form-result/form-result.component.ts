import { Component, Input } from '@angular/core';
import { FormResult } from '../models/form-result';

@Component({
  selector: 'form-result',
  templateUrl: './form-result.component.html',
  styleUrls: ['./form-result.component.scss']
})
export class FormResultComponent {

  @Input() result!: FormResult;

}
