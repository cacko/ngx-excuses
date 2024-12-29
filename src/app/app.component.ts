import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { random } from 'lodash-es';
import { LoaderComponent } from './components/loader/loader.component';
import { MatIconRegistry } from '@angular/material/icon';
import { ExcuseService } from './service/excuse.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ngx-excuses';

  constructor(
    private excuseService: ExcuseService,
    private router: Router,
    private iconRegister: MatIconRegistry

  ) {
    this.iconRegister.setDefaultFontSetClass('material-symbols-sharp');

  }

  ngOnInit(): void {
    if (window.location.pathname === "/") {
      this.router.navigateByUrl(`/e/${this.excuseService.getRandomId()}`);
    }
  }
}
