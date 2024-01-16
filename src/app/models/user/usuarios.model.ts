export class usuarios {
    id: number;
    idRol: number;
    uidSocial: string;
    nombreUsuario: string;
    contrasenia: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    genero: number;
    fechaNacimiento: Date;
    correo: string;
    celular: string;
    tipoDocumento: number;
    documento: string;
    esActivo: boolean=true;
    fechaRegistro: Date;
    usuarioRegistro: number;
    fechaActualizacion: Date;
    usuarioActualizacion: number;
}