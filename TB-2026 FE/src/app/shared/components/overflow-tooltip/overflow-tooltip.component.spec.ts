import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverflowTooltipComponent } from './overflow-tooltip.component';

describe('OverflowTooltipComponent', () => {
  let component: OverflowTooltipComponent;
  let fixture: ComponentFixture<OverflowTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverflowTooltipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverflowTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
