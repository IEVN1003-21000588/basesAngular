import { Component, OnInit  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-cinepolis-angular',
  templateUrl: './cinepolis-angular.component.html',
  styleUrl: './cinepolis-angular.component.css'
})
export class CinepolisAngularComponent implements OnInit {
  formulario!: FormGroup;
  resultado!: number;
  totalPagar: number | null = null;
  precioBoleto: number = 12;
  errorMsg: string = '';

  constructor() {}

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.required),
      resultado: new FormControl('', Validators.required),
      compradores: new FormControl('', [Validators.required, Validators.min(1)]),
      boletos: new FormControl('', [Validators.required, Validators.min(1), Validators.max(7)]),
      cineco: new FormControl('', Validators.required)
    });
  }

  calcularTotal(): void {
    this.errorMsg = '';  // Resetear el mensaje de error

    let boletos = this.formulario.get('boletos')?.value;
    let compradores = this.formulario.get('compradores')?.value;
    let cineco = this.formulario.get('cineco')?.value;

    let maxBoletos = compradores * 7;

    // Verificar si la cantidad de boletos excede el límite de 7
    if (boletos > maxBoletos) {
      this.errorMsg = 'No puedes comprar más de 7 boletos.';
      this.totalPagar = null;
      return;
    }

    let subtotal = boletos * this.precioBoleto;

    // Aplicar descuentos según la cantidad de compradores
    if (boletos > 5) {
      subtotal *= 0.85; // 15% de descuento
    } else if (boletos == 3 && compradores == 4 && compradores == 5) {
      subtotal *= 0.90; // 10% de descuento
    }

    // Aplicar descuento adicional si el usuario tiene la tarjeta CINECO
    if (cineco === 'sí') {
      subtotal *= 0.90; // 10% adicional
    }

    this.totalPagar = subtotal;
  }
}
