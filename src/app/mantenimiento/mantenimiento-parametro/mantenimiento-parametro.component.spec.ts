import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MantenimientoParametroComponent } from './mantenimiento-parametro.component';

describe('MantenimientoParametroComponent', () => {
  let component: MantenimientoParametroComponent;
  let fixture: ComponentFixture<MantenimientoParametroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimientoParametroComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MantenimientoParametroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
