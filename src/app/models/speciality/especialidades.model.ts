export class Especialidad {
    id: number;
    nombreEspecialidad: string;
    institucion: string="";
    idPais: number=1;
    esActivo: boolean=true;
    fechaRegistro: Date;
    usuarioRegistro: number;
    fechaActualizacion: Date;
    usuarioActualizacion: number;
}

export class perfilespecialidad {
    id: number;
    idPerfil: number=0;
    idEspecialidad: number=0;
}