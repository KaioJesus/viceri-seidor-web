import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanosDeAcao } from './planos-de-acao';

describe('PlanosDeAcao', () => {
  let component: PlanosDeAcao;
  let fixture: ComponentFixture<PlanosDeAcao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanosDeAcao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanosDeAcao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
