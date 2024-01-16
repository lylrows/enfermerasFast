import { Component, OnInit } from '@angular/core';
import { parameterGroup } from '../models/parameter/parameter.model';
import { Dates } from '../models/report/Dates.model';
import { DateSales } from '../models/report/DatesSales.model';
import { ParametrosService } from '../services/parametros.service';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  listReportNurse:any;
  listReportPatient:any;
  listReportSales:any;

  tipoReporte: string;
  ListTypeReport: any;

  date: Dates=new Dates();
  dateSales: DateSales=new DateSales();

  reportNurse:boolean=false;
  reportPatient:boolean=false;
  reportSale:boolean=false;
  isSemana: boolean=false;
  isMes: boolean=false;
  isAnual: boolean=false;

  constructor(private reportService: ReportService,
    private parameterService: ParametrosService) { }

  ngOnInit() {
    this.getParameter();
    
  }

  nurse(){
    this.reportNurse=true;
    this.reportPatient=false;
    this.reportSale=false;
  }

  patient(){
    this.reportNurse=false;
    this.reportPatient=true;
    this.reportSale=false;
  }

  sales(){
    this.reportNurse=false;
    this.reportPatient=false;
    this.reportSale=true;
  }

  getDataNurse(){
    this.listReportNurse=[];
    this.date.fechaInicial= new Date(this.date.fechaInicial);
    this.date.fechaFinal= new Date(this.date.fechaFinal);
    //console.log(this.date);
    this.reportService.getReportNurses(this.date).subscribe(res=>{
      if(res.status==1){
        this.listReportNurse=res.objModel;
        //console.log(this.listReportNurse);
      }
    })
  }

  getDataPatient(){
    this.listReportPatient=[]
    this.date.fechaInicial= new Date(this.date.fechaInicial);
    this.date.fechaFinal= new Date(this.date.fechaFinal);
    //console.log(this.date);
    this.reportService.getReportPatients(this.date).subscribe(res=>{
      if(res.status==1){
        this.listReportPatient=res.objModel;
        //console.log(this.listReportPatient);
      }
    })
  }

  getDataSales(){
    this.dateSales.tipoReporte=this.dateSales.tipoReporte.toLowerCase();
    this.dateSales.fechaInicial=new Date(this.dateSales.fechaInicial);
    if(this.dateSales.tipoReporte=='semana'){
      this.isSemana=true;
      this.isMes=false;
      this.isAnual=false;
    }else if(this.dateSales.tipoReporte=='mes'){
      this.isSemana=false;
      this.isMes=true;
      this.isAnual=false;
    }else if(this.dateSales.tipoReporte=='anual'){
      this.isSemana=false;
      this.isMes=false;
      this.isAnual=true;
    }
    //console.log(this.dateSales);
    this.reportService.getReportSales(this.dateSales).subscribe(res=>{
      if(res.status==1){
        this.listReportSales=res.objModel;
        //console.log(this.listReportSales);
      }
    })
  }

  getParameter(){
    this.parameterService.getParameterByGroupId(11).subscribe(
      res => {
        if(res.status == 1) {
          this.ListTypeReport = res.objModel;
          //console.log(this.ListTypeReport);
        }
      }
    )
  }



}
