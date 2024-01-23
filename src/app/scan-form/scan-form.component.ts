import { Component } from '@angular/core';
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

  loadTop50At() : void {
    this.scanForm.get('websites')?.setValue("google.com, youtube.com, orf.at, facebook.com, krone.at, amazon.de, google.at, wikipedia.org, willhaben.at, heute.at, instagram.com, pornhub.com, derstandard.at, oe24.at, twitter.com, bergfex.at, sport.orf.at, netflix.com, tiktok.com, xnxx.com, gmx.net, meinbezirk.at, whatsapp.com, gmx.at, kleinezeitung.at, reddit.com, nachrichten.at, xhamster.com, bild.de, stripchat.com, live.com, win2day.at, yahoo.com, twitch.tv, noen.at, openai.com, duckduckgo.com, gutekueche.at, post.at, vol.at, zamg.ac.at, kurier.at, oesterreich.gv.at, wetter.com, tt.com, microsoft.com, sparkasse.at, xvideos.com");
  }
  
  submitForm() : void {
    this.formResult = [];
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
