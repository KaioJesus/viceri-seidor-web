import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-progress-bar',
  template: `
  <div class="relative">
    <div
      [ngClass]="{
        'bg-primary-medium text-white': progress !== 'notstarted',
        'bg-neutral-gray25 text-neutral-gray75': progress === 'notstarted'
      }"
      class="flex h-[34px] w-[34px] items-center justify-center rounded-full font-semibold">
      {{ step }}
    </div>

    <span class="absolute top-full mt-2 text-sm whitespace-nowrap"
    [ngClass]="{
      'left-0': step === 1,
      'left-1/2 -translate-x-1/2': step === 2 || step === 3,
      'right-0': step === 4,
      'font-bold': progress === 'inprogress' || progress === 'completed'
    }"
    [style.color]="progress === 'inprogress' ? '#2A5EC9' : '#6D6D6D'">
    {{ stepTitle }}
  </span>
  </div>
  `,
  imports: [CommonModule],
})
export class ProgressBarComponent {

  @Input() progress: 'completed' | 'inprogress' | 'notstarted' = 'notstarted';
  @Input() step: number = 1;
  @Input() stepTitle: string = '';
  @Input() isLast: boolean = false;

}
