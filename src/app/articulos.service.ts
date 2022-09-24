import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Articulo } from './model/articulo';

@Injectable({
  providedIn: 'root',
})
export class ArticulosService {
  articulos: Articulo[];
  uri: string = 'https://632baf6c1aabd837398a2a14.mockapi.io/api/articulo';
  constructor(public http: HttpClient) {
    this.articulos = [];
  }

  obtenerArticulos(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.uri);
  }

  nuevoArticulo(articulo: Articulo): Observable<any>{
    return this.http.post(this.uri,articulo,{
      headers: { 'Content-Type': 'application/json' },
    })
  }
  obtenerArticulo(id: string): Observable<Articulo>{
    return this.http.get<Articulo>(`${this.uri}/${id}`);
  }
  modificarArticulo(articulo: Articulo):Observable<Articulo>{
    return this.http.put<Articulo>(`${this.uri}/${articulo.id}`,articulo);
  }
  eliminarArticulo(id: string){
    return this.http.delete(`${this.uri}/${id}`)
  }
}
