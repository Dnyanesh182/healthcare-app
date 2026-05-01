import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericSelectDropdownComponent } from './generic-select-dropdown.component';

describe('GenericSelectDropdownComponent', () => {
  let component: GenericSelectDropdownComponent;
  let fixture: ComponentFixture<GenericSelectDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericSelectDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericSelectDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
