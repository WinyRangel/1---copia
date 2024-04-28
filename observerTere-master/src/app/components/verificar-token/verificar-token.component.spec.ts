import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarTokenComponent } from './verificar-token.component';

describe('VerificarTokenComponent', () => {
  let component: VerificarTokenComponent;
  let fixture: ComponentFixture<VerificarTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificarTokenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificarTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
