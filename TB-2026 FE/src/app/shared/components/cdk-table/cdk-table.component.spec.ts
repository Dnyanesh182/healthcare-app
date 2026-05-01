import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdkTableComponent } from './cdk-table.component';

describe('CdkTableComponent', () => {
  let component: CdkTableComponent;
  let fixture: ComponentFixture<CdkTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CdkTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CdkTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
