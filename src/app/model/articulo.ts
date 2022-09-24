import { Categoria } from "./categoria";

export interface Articulo {
  id: string;
  codigo: number;
  nombre: string;
  precio: number;
  stock: number;
  categoriaId: string;
  categoria?: Categoria;  
}

