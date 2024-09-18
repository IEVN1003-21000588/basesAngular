import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  title="Saluno de variable";

  imageWidth:number=50;
  imageMargi:number=2;
  muestraImg:boolean=true;
  listFilter:string='';

  showImage():void{
    this.muestraImg=this.muestraImg;
  }

  productos:any[]=[
    {
      "productoId":1,
      "Modelo":"Sentra",
      "Descripcion":"4 partes familiar",
      "year":"Febrero 03, 2022",
      "Precio":2000,
      "Marca":"NISSAN",
      "Color":"Blanco",
      "ImagenUrl":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNr6RMTr6RWtDREu92wazYqztShtPIpfRMDA&s"
    },
    {
      "productoId":2,
        "Modelo":"Aveo",
        "Descripcion":"Deportivo",
        "year":"marzo 11, 2021",
        "Precio":5500,
        "Marca":"CHEVROLET",
        "Color":"Azul rey",
        "ImagenUrl":"https://chevroletriogrande.com/aveo/img/a-azul-ultramar.jpg"
    },
    {
      "productoId":3,
        "Modelo":"Chevy",
        "Descripcion":"Individual",
        "year":"junio 15, 2023",
        "Precio":2300,
        "Marca":"CHEVROLET",
        "Color":"Rojo",
        "ImagenUrl":"https://cdn2.atraccion360.com/media/aa/styles/gallerie/public/images/2017/01/opelcorsa-b-1993-2000r8.jpg"
    }
  ]
}
