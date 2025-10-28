import { EnderecoComponent } from "./endereco/endereco.component";
import { ContatoComponent } from "./contato/contato.component";
import { DadosCadastraisComponent } from "./dados-cadastrais/dados-cadastrais.component";
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormArray
} from '@angular/forms';
import { Router } from '@angular/router';
import { PessoasService } from '../../../../../../core/services/pessoas.service';
import { ProgressBarComponent } from '../../../../../../components/progress-bar/progress-bar.component'

@Component({
  selector: 'app-pessoa-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProgressBarComponent,
    DadosCadastraisComponent,
    ContatoComponent,
    EnderecoComponent
  ],
  templateUrl: './pessoa-form.component.html',
})
export class PessoaFormComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private pessoasService = inject(PessoasService);

  public currentStep: WritableSignal<number> = signal(1);

  public personForm: FormGroup = this.fb.group({
    dadosCadastrais: this.fb.group({
      nome: ['', Validators.required],
      nomeSocial: [''],
      cpf: ['', [Validators.required]],
      cnpj: [''],
      escola: ['', Validators.required],
    }),

    dadosContato: this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      telefones: this.fb.array([
        this.fb.control('')
      ])
    }),

    dadosEndereco: this.fb.group({
      enderecoCompleto: ['', Validators.required],
      cidade: ['', Validators.required],
      cep: ['', [Validators.required]], // Adicionar validador de pattern se quiser
      estado: ['', [Validators.required]],
      pais: ['', [Validators.required]],
    }),
  });

  public get stepDadosCadastrais(): FormGroup {
    return this.personForm.get('dadosCadastrais') as FormGroup;
  }

  public get stepDadosContato(): FormGroup {
    return this.personForm.get('dadosContato') as FormGroup;
  }

  public get stepDadosEndereco(): FormGroup {
    return this.personForm.get('dadosEndereco') as FormGroup;
  }

  get telefones(): FormArray {
    return this.personForm.get('dadosContato.telefones') as FormArray;
  }

  addTelefone(): void {
    this.telefones.push(this.fb.control(''));
  }

  removeTelefone(index: number): void {
    if (this.telefones.length > 1) {
      this.telefones.removeAt(index);
    }
  }

  nextStep(): void {
    console.log(this.currentStep())
    if (this.currentStep() === 1 && this.personForm.get('dadosCadastrais')?.invalid) {
      this.personForm.get('dadosCadastrais')?.markAllAsTouched();
      return;
    }
    if (this.currentStep() === 2 && this.personForm.get('dadosContato')?.invalid) {
      this.personForm.get('dadosContato')?.markAllAsTouched();
      return;
    }

    if (this.currentStep() < 4) {
      this.currentStep.update((value) => value + 1);
    }
  }

  prevStep(): void {
    if (this.currentStep() > 1) {
      this.currentStep.update((value) => value - 1);
    }
  }

  getStepProgress(step: number): 'completed' | 'inprogress' | 'notstarted' {
    if (step < this.currentStep()) return 'completed';
    if (step === this.currentStep()) return 'inprogress';
    return 'notstarted';
  }

  onSubmit(): void {
    if (this.personForm.invalid) {
      this.personForm.markAllAsTouched();
      return;
    }

    const { dadosCadastrais, dadosContato, dadosEndereco} = this.personForm.value;
    const addressString = `${dadosEndereco.cidade} - ${dadosEndereco.estado}`;

    const formData = {
      name: dadosCadastrais.nome,
      cpf: dadosCadastrais.cpf,
      school: dadosCadastrais.escola,
      address: addressString,
      ...dadosContato,
      ...dadosEndereco
    };

    this.pessoasService.addPessoa(formData);

    this.router.navigate(['/pessoas']);
  }
}
