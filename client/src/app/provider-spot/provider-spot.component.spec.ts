import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderSpotComponent } from './provider-spot.component';

describe('ProviderSpotComponent', () => {
  let component: ProviderSpotComponent;
  let fixture: ComponentFixture<ProviderSpotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderSpotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
