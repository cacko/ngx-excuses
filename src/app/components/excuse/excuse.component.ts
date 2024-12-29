import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcuseEntity } from '../../entity/excuse.entity';
import { LoaderService } from '../../service/loader.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ExcuseService } from '../../service/excuse.service';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { StorageService } from '../../service/storage.service';
import { Observable, Subscription, timer } from 'rxjs';

import { MatProgressBarModule } from '@angular/material/progress-bar';
interface RouteDataEntity {
  data?: ExcuseEntity;
}


@Component({
  selector: 'app-excuse',
  imports: [CommonModule, MatButtonModule, MatIconModule, ClipboardModule, MatProgressBarModule],
  templateUrl: './excuse.component.html'
})
export class ExcuseComponent implements OnInit, OnDestroy {

  excuse!: ExcuseEntity;
  url !: string;
  autoplay !: boolean;
  rotator?: Subscription;
  progress = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loader: LoaderService,
    private excuseService: ExcuseService,
    private storage: StorageService
  ) {

  }

  startTimer() {
    this.stopTimer();
    this.progress = 0;
    this.rotator = timer(0,300).subscribe((v) => {
      this.progress = ((300 * v) / 20000) * 100;
      if (this.progress >= 100) {
        this.stopTimer();
        this.onNextRandom();
      }
    });
    return true;
  }

  stopTimer() {
    this.rotator?.unsubscribe();
    return true;
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: (data: RouteDataEntity) => {
        this.loader.hide();
        this.autoplay = this.storage.autoplay;
        this.excuse = data.data as ExcuseEntity;
        this.url = window.location.href;
        this.autoplay && this.startTimer();
      },
    });
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  onNextRandom(): void {
    this.router.navigateByUrl(`/e/${this.excuseService.getRandomId()}`);
  }

  onAutoplay(): void {
    this.autoplay = !this.autoplay;
    this.storage.autoplay = this.autoplay;
    (this.autoplay && this.startTimer()) || this.stopTimer();

  }


}
