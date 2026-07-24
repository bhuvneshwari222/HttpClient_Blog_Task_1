import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SpinnerService } from './shared/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'HttpClient_Blog_Task_1';
  isLoading: boolean = false;
  private _spinnerService = inject(SpinnerService);
  private _cdr = inject(ChangeDetectorRef)

  ngOnInit(): void {
    this._spinnerService.spinnerLoading$.subscribe(flag => {
      this.isLoading = flag;
      this._cdr.detectChanges()
    })
  }
}
