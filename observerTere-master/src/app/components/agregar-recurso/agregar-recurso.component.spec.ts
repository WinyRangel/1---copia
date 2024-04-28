import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarRecursoComponent } from './agregar-recurso.component';

describe('AgregarRecursoComponent', () => {
  let component: AgregarRecursoComponent;
  let fixture: ComponentFixture<AgregarRecursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarRecursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
