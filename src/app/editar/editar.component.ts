import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticulosService } from '../articulos.service';
import { CategoriasService } from '../categorias.service';
import { Articulo } from '../model/articulo';
import { Categoria } from '../model/categoria';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
})
export class EditarComponent implements OnInit {
  articulo: Articulo;
  categorias: Categoria[];
  constructor(public activatedRoute: ActivatedRoute, public articuloService: ArticulosService, public categoriaService: CategoriasService,public router:Router) {
    this.articulo = {} as Articulo;
    this.categorias = [];
  }

  ngOnInit(): void {
    this.cargarCategoria();
    this.cargarArticulo();
  }
  cargarCategoria(){
    this.categoriaService.obtenerCategorias().subscribe({
      next: result => {
        this.categorias = result
      }
    });
  }
  cargarArticulo(){
    this.activatedRoute.params.subscribe({
      next: params =>{
        const id = params["id"];
        this.articuloService.obtenerArticulo(id).subscribe({
          next: result => {
            this.articulo = result;
          },
          error: error => {

          }
        })
      },
      error: error => {

      }
    });
  }
  editarArticulo(articulo: Articulo){
    console.log(articulo);
    this.articuloService.modificarArticulo(articulo).subscribe({
      next: result => {
        alert("edicion exitosa!");
        this.router.navigate([""]);
      },
      error: error => {
        
      }
    });
  }
}
