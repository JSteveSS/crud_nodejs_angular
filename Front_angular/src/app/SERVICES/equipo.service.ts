import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  url='/api';
  constructor(private http: HttpClient) { }


  //get trabajadores
  getEquipos()
  {
    return this.http.get(this.url);
  }


  //get un trabajador
  getUnEquipo(id:string){
    return this.http.get(this.url+'/'+id);
  }


  //agregar trabajador
  addEquipo(equipo:Equipo)
  {
    return this.http.post(this.url, equipo);
  }


  //eliminar un trabajador
  deleteEquipo(id:string){
    return this.http.delete(this.url+'/'+id);
  }

  //modificar un trabajador
  editEquipo(id:string, equipo:Equipo){
    console.log(equipo);
    return this.http.put(this.url+'/'+id, equipo);
  }

}


export interface Equipo{
  id?:string;
  nombre?:string;
  apellido_paterno?:string;
  apellido_materno?:string;
  fecha_nacimiento?:string;
  tipo_documento?:string;
  numero_documento?:string;
  sueldo?:string;
  estado?:string;
  campos_auditoria?:string;
  // logo?:string;
}
