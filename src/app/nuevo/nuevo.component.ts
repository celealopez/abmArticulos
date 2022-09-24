import { Component, OnDestroy, OnInit } from '@angular/core';
import { Articulo } from '../model/articulo';
import { Subscription } from 'rxjs';
import { ArticulosService } from '../articulos.service';
import { CategoriasService } from '../categorias.service';
import { Categoria } from '../model/categoria';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css'],
})
export class NuevoComponent implements OnInit, OnDestroy {
  articulo: Articulo;
  categorias: Categoria[];
  subs: Subscription;
  constructor(
    public articuloService: ArticulosService,
    public categoriaService: CategoriasService,
    public router: Router
  ) {
    this.articulo = {categoria: {} } as Articulo;
    this.categorias = [];
    this.subs = new Subscription();
  }

  ngOnInit(): void {
    this.obtenerCategorias();
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  agregarArticulo(articulo: Articulo) {

    this.subs.add(
      this.articuloService.nuevoArticulo(articulo).subscribe({
        next: (result) => {
          alert("Guardado exitoso!");
          this.router.navigate([""]);
        },
        error: (error) => {
          console.log(error);
        },
      })
    );

    this.articulo = {categoria: {} } as Articulo;
  }
  obtenerCategorias() {
    this.subs.add(
      this.categoriaService.obtenerCategorias().subscribe({
        next: (result: Categoria[]) => {
          this.categorias = result;
        },
        error: (error) => {
          alert('error en la apliacion');
        },
      })
    );
  }

  
}
