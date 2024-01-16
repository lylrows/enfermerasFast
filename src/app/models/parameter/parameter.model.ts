export class parameter {
    id: number;
    nombreParametro: string;
    idGrupo: number;
    idPadre: number;
    idParametro: number;
    descripcionParametro: string;
    abreviacionParametro: string;
    valorParametro: string;
    ordenParametro: number;
    porDefecto: boolean;
    observacion:string;
    esActivo: boolean;
    fechaRegistro: Date;
    usuarioRegistro: number;
    fechaActualizacion: Date;
    usuarioActualizacion: number;
}

export class parameterGroup {
    nombreParametro: string;
    idParametro: number;
    porDefecto: boolean;
}