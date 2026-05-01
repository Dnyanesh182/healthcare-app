import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountProfileImgComponent } from './account-profile-img.component';

describe('AccountProfileImgComponent', () => {
  let component: AccountProfileImgComponent;
  let fixture: ComponentFixture<AccountProfileImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountProfileImgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountProfileImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
