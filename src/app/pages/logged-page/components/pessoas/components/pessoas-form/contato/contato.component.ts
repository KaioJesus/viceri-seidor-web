import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule, } from '@angular/forms';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contato.component.html',
})
export class ContatoComponent {

  @Input({ required: true }) formStepGroup!: FormGroup;

  private fb = inject(FormBuilder);

  get telefones(): FormArray {
    return this.formStepGroup.get('telefones') as FormArray;
  }

  addTelefone(): void {
    this.telefones.push(this.fb.control(''));
  }

  removeTelefone(index: number): void {
    if (this.telefones.length > 1) {
      this.telefones.removeAt(index);
    }
  }

}
