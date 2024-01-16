import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditCreateEspecialidadComponent } from './edit-create-especialidad.component';

describe('EditCreateEspecialidadComponent', () => {
  let component: EditCreateEspecialidadComponent;
  let fixture: ComponentFixture<EditCreateEspecialidadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCreateEspecialidadComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditCreateEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
