export class Servicio {
    id:number;
    idEspecialidad: number;
    nombre:string;
    descripcion: string;
    precio: number;
    esActivo: boolean = true;
    fechaRegistro: Date = new Date();
    usuarioRegistro: number = 0;
    fechaActualizacion: Date = new Date();
    usuarioActualizacion: number = 0;
}