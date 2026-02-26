import { Component } from '@angular/core';
import { VERSION } from '../../../environments/version';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly year = new Date().getFullYear();
  protected readonly gitHash = VERSION.gitHash;
}
