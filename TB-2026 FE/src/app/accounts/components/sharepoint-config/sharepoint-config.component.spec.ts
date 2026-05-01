import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharepointConfigComponent } from './sharepoint-config.component';

describe('SharepointConfigComponent', () => {
  let component: SharepointConfigComponent;
  let fixture: ComponentFixture<SharepointConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharepointConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharepointConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
