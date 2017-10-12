import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComntComponent } from './create-comnt.component';

describe('CreateComntComponent', () => {
  let component: CreateComntComponent;
  let fixture: ComponentFixture<CreateComntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateComntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
