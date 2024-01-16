export interface observation {
    id: number;
    idEnfermera: number;
    idPaciente: number;
    fechaAtencion: Date;
    observacion: string;
    esActivo: boolean;
    fechaRegistro: Date;
    usuarioRegistro: number;
    fechaActualizacion: Date;
    usuarioActualizacion: number;
}