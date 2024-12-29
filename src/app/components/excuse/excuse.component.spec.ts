import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcuseComponent } from './excuse.component';

describe('ExcuseComponent', () => {
  let component: ExcuseComponent;
  let fixture: ComponentFixture<ExcuseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcuseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
