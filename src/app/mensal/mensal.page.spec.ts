import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensalPage } from './mensal.page';

describe('MensalPage', () => {
  let component: MensalPage;
  let fixture: ComponentFixture<MensalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
