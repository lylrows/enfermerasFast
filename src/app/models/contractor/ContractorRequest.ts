export class ContractorRequest {
    public nidprocess: number = 0;
    public sdoctype:string = '';
    public names: string = '';
    public lastname1: string = '';
    public lastname2: string = '';
    public idDocType: number = 0;
    public docNumber: string = '';
    public verificationDigit: number = 0;
    public birthday?: Date;
    public email: string = '';
    public idGender: number = 0;
    public idProduct: number = 0;
    public idVigence: number = 0;
    public idPlan: number = 0;
    public idFrequency: number = 0;
    public idRate: number = 0;
    public telNumber: string = '';
    public idDepartment: number = 0;
    public idProvince: number = 0;
    public idDistrict: number = 0;
    public address: string = '';
    public token: string = 'FRONTEND_adas#$"#$"#';
    public checkpolicts: boolean = false;
    public checksendinfo: boolean = false;
    public checktransferencia: boolean = false;
    public checkEnviopoliza: boolean = false;
    constructor() { }
}