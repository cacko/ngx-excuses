import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcuseEntity } from '../../entity/excuse.entity';
import { LoaderService } from '../../service/loader.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ExcuseService } from '../../service/excuse.service';


interface RouteDataEntity {
  data?: ExcuseEntity;
}


@Component({
  selector: 'app-excuse',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './excuse.component.html'
})
export class ExcuseComponent implements OnInit {

  excuse!: ExcuseEntity;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loader: LoaderService,
    private excuseService: ExcuseService
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: (data: RouteDataEntity) => {
        this.loader.hide();
        this.excuse = data.data as ExcuseEntity;
      },
    });
  }

  onNextRandom(): void {
    this.router.navigateByUrl(`/e/${this.excuseService.getRandomId()}`);
  }

}
