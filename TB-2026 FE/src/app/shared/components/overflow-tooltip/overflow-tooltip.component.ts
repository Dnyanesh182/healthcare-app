import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@Component({
  selector: 'app-overflow-tooltip',
  imports: [TooltipModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  templateUrl: './overflow-tooltip.component.html',
  styleUrl: './overflow-tooltip.component.scss'
})
export class OverflowTooltipComponent implements AfterViewInit {
  @Input() text: string = '';
  @ViewChild('textRef') textElement!: ElementRef;
  showTooltip = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      const el = this.textElement?.nativeElement;
      if (el) {
        this.showTooltip = el.scrollWidth > el.clientWidth;
        this.cdr.markForCheck();
      }
    });
  }
}
