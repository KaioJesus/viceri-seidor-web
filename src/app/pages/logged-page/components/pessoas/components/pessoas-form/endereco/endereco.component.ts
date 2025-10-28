import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-endereco',
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  standalone: true,
  templateUrl: './endereco.component.html',
})
export class EnderecoComponent {

  @Input({ required: true }) formStepGroup!: FormGroup;
}
