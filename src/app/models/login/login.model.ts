export class LoginRequestDTO {
    nombreUsuario: string;
    contrasenia: string;
    uidSocial: string;
}

export class loginUsuario {
    id: number;
    idRol: number;
    uidSocial?: string;
    nombreUsuario: string;
    contrasenia?: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    correo: string;
    idEspecialidad: number;
    idPerfil: number;
}
export class ResultadoEnvio {
    FueExitoso: boolean;
    MensajeError: string;
    DetalleAdjuntosEnviados: string;
    DestinatariosPara: string;
    DestinatariosConCopia: string;
    DestinatariosConCopiaOculta: string;    
}