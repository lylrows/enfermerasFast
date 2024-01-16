export class Pago {
    id: number;
    idCita: number;
    monto: number;
    idTransaccion: string;
    estado: number = 2;
    fecha: Date = new Date();
}
