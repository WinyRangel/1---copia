import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdquiridosComponent } from './adquiridos.component';

describe('AdquiridosComponent', () => {
  let component: AdquiridosComponent;
  let fixture: ComponentFixture<AdquiridosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdquiridosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdquiridosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
