import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from './model/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  categorias: Categoria[];
  uri: string = 'https://632baf6c1aabd837398a2a14.mockapi.io/api/categoria';
  constructor(public http: HttpClient) {
    this.categorias = [];
  }

  obtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.uri);
  }
}
