import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsCdkTableComponent } from './teams-cdk-table.component';

describe('TeamsCdkTableComponent', () => {
  let component: TeamsCdkTableComponent;
  let fixture: ComponentFixture<TeamsCdkTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamsCdkTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsCdkTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
