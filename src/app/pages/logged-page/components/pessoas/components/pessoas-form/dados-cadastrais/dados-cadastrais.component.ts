import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-dados-cadastrais',
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  standalone:true,
  templateUrl: './dados-cadastrais.component.html',
})
export class DadosCadastraisComponent {

   @Input({ required: true }) formStepGroup!: FormGroup;
}
