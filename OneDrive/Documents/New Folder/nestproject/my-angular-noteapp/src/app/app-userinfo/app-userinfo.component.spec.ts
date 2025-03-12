import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserinfoComponent } from './app-userinfo.component';

describe('AppUserinfoComponent', () => {
  let component: AppUserinfoComponent;
  let fixture: ComponentFixture<AppUserinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppUserinfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppUserinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
