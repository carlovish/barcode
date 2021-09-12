import { Component, OnInit } from '@angular/core';
import {ApiService} from './servicios/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  barcode:any;
  productos=[];
  productos_copia=[];
  filtro:any="";
  productoSeleccionado:any;

  asignar:boolean=false;
  mensaje:string="";

  bds=['cashngolo','superngolo','control'];
  bd:any='cashngolo';

 constructor(
   private apiService:ApiService,
   
 ){

 }

 ngOnInit(){
   this.traeProductos();
 }

 async baseSeleccionada():Promise<any>{
  //console.log(this.bd);
  const url="seleccionaBd.php?bd="+this.bd;
  this.apiService.sendHttpCall('',url,'get').subscribe(response=>{
    console.log(response);
   this.traeProductos();
    

  },e=>console.log(e))
}
 async traeProductos():Promise<any>{
   const url="traeProductos.php";
   this.apiService.sendHttpCall('',url,'get').subscribe(response=>{
     //console.log(response);
     this.productos=[...response];
     this.productos_copia=[...response];
   },e=>{console.log(e)})
 }

 async tomaCodigo():Promise<any>{
   //console.log(this.barcode)
   const url="traeProductoByBarCode.php?barcode="+this.barcode;
   this.apiService.sendHttpCall('',url,'get').subscribe(response=>{
     //console.log(response);
     if(response.status==201){
       this.ponProducto(response.referencia);
       this.asignar=false;
       this.mensaje="";
       this.barcode=""
     }else{
       this.asignar=true;
       this.mensaje="Producto sin código de barras por favor seleccione para asignar";
       this.filtro=""
     }
   },e=>console.log(e))
 }

 filtraProductos(){
   //console.log(this.filtro);
   this.productos=[...this.productos_copia];
   this.productos=this.productos.filter(p=>p.descripcion.toUpperCase().includes(this.filtro.toUpperCase()));
 }

 ponProducto(referencia){
   this.productoSeleccionado=this.productos.find(p=>p.referencia==referencia);
   //console.log(producto);
   this.filtro=this.productoSeleccionado.descripcion
   //this.asignar=false;
   this.mensaje="";
   document.getElementById('barcode').focus();


 }

 async ponCodigoDeBarra(producto):Promise<any>{
   console.log(producto)
   const url="ponCodigoDeBarra.php?referencia="+producto.referencia+"& codbarras="+this.barcode;
   this.apiService.sendHttpCall('',url,'get').subscribe(response=>{
     //console.log(response);
     this.mensaje="Código de barra asignado"
     this.barcode="";
     this.filtro=""
     this.asignar=false
     document.getElementById('barcode').focus();
   },e=>console.log(e))
 }

}
