import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MantenimientoEspecialidadComponent } from './mantenimiento-especialidad.component';

describe('MantenimientoEspecialidadComponent', () => {
  let component: MantenimientoEspecialidadComponent;
  let fixture: ComponentFixture<MantenimientoEspecialidadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimientoEspecialidadComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MantenimientoEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
