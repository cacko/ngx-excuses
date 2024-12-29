import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { ExcuseService } from './service/excuse.service';
import { MatButtonModule } from '@angular/material/button';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { interval } from 'rxjs';
import { MatSnackBar as MatSnackBar } from '@angular/material/snack-bar';
import { BackgroundComponent } from './components/background/background.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent, MatIconModule, MatButtonModule, BackgroundComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ngx-excuses';

  constructor(
    private excuseService: ExcuseService,
    private router: Router,
    private iconRegister: MatIconRegistry,
    private swUpdate: SwUpdate,
    private snackBar: MatSnackBar

  ) {
    this.iconRegister.setDefaultFontSetClass('material-symbols-sharp');

  }

  ngOnInit(): void {
    if (window.location.pathname === "/") {
      this.router.navigateByUrl(`/e/${this.excuseService.getRandomId()}`);
    }
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe((evt: VersionEvent) => {
        if (evt.type == 'VERSION_READY') {
          this.snackBar
            .open('Update is available', 'Update', { duration: 15000 })
            .afterDismissed()
            .subscribe(() =>
              this.swUpdate
                .activateUpdate()
                .then(() => document.location.reload())
            );
        }
      });
      interval(10000).subscribe(() => {
        this.swUpdate.checkForUpdate();
      });
      this.swUpdate.checkForUpdate();
    }
  }
  onAPI(): void {
    window.open("https://excuses.cacko.net/api/docs", '_blank', 'noopener');
  }

  onRaw(): void {
    window.open("https://excuses.cacko.net/index.txt", '_blank', 'noopener');
  }
}
