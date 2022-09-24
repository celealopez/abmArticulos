import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Articulo } from '../model/articulo';
import { ArticulosService } from '../articulos.service';
import { Categoria } from '../model/categoria';
import { CategoriasService } from '../categorias.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent implements OnInit, OnDestroy {
  articulos: Articulo[];
  categorias: Categoria[];
  private subs: Subscription;
  constructor(public articulosService: ArticulosService, public categoriasService: CategoriasService,public router: Router) {
    this.articulos = [];
    this.categorias = [];
    this.subs = new Subscription();
  }

  ngOnInit(): void {
    this.obtenerArticulos();
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  obtenerArticulos() {
    this.subs.add(
      this.categoriasService.obtenerCategorias().subscribe({
        next: (categoriaResult: Categoria[]) => {
          this.articulosService.obtenerArticulos().subscribe({
            next: (articulosResult: Articulo[]) => {
              articulosResult.forEach(element => {
                let index = categoriaResult.findIndex(x=>x.id == element.categoriaId);
                element.categoria=categoriaResult[index];
              });       
              this.articulos = articulosResult;
            },
            error: error => {
              alert("error en la apliacion");
            }
          })
        },
        error: error => {
  
        }
      })
    );
  }

  editarArticulo(id: string){
    this.router.navigate([`editar/${id}`]);
  }

  borrar(id: string){
    this.articulosService.eliminarArticulo(id).subscribe({
      next: result => {
        alert("borrado exitoso");
        this.obtenerArticulos();
      },
      error: error => {

      }
    });
  }
}
