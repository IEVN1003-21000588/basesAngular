import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-resistencias-angular',
  templateUrl: './resistencias-angular.component.html',
  styleUrls: ['./resistencias-angular.component.css']
})
export class ResistenciasAngularComponent implements OnInit {
  // Definimos el formulario reactivo como una variable de tipo FormGroup
  formulario!: FormGroup;

  // Arreglos que contienen los nombres de colores y tolerancias disponibles para las bandas y el multiplicador
  colores: string[] = ['Negro', 'Marrón', 'Rojo', 'Naranja', 'Amarillo', 'Verde', 'Azul', 'Violeta', 'Gris', 'Blanco'];
  tolerancias: string[] = ['Oro', 'Plata'];

  // Objetos que asocian los nombres de los colores con sus valores numéricos para el cálculo de la resistencia
  valoresColores: { [key: string]: number } = {
    'Negro': 0,
    'Marrón': 1,
    'Rojo': 2,
    'Naranja': 3,
    'Amarillo': 4,
    'Verde': 5,
    'Azul': 6,
    'Violeta': 7,
    'Gris': 8,
    'Blanco': 9
  };

  multiplicadoresColores: { [key: string]: number } = {
    'Negro': 1,
    'Marrón': 10,
    'Rojo': 100,
    'Naranja': 1000,
    'Amarillo': 10000,
    'Verde': 100000,
    'Azul': 1000000,
    'Violeta': 10000000,
    'Gris': 100000000,
    'Blanco': 1000000000
  };

  // Valores de tolerancias en porcentaje
  toleranciasValores: { [key: string]: number } = {
    'Oro': 5,
    'Plata': 10
  };

  // Lista que almacena los resultados de las resistencias calculadas
  resultado: { valor: number, valorMaximo: number, valorMinimo: number, color1: string, color2: string, color3: string, tolerancia: string }[] = [];

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Inicializamos el formulario reactivo con los campos 'color1', 'color2', 'color3', y 'tolerancia'
    this.formulario = new FormGroup({
      color1: new FormControl('', Validators.required),  // Primera banda, campo obligatorio
      color2: new FormControl('', Validators.required),  // Segunda banda, campo obligatorio
      color3: new FormControl('', Validators.required),  // Multiplicador, campo obligatorio
      tolerancia: new FormControl('', Validators.required) // Tolerancia, campo obligatorio
    });
  }

  // Método que se ejecuta al enviar el formulario
  registrar(): void {
    // Verificamos si el formulario es válido antes de proceder
    if (this.formulario.valid) {
      // Obtenemos los valores de las bandas y la tolerancia desde el formulario
      const color1 = this.formulario.get('color1')?.value;
      const color2 = this.formulario.get('color2')?.value;
      const color3 = this.formulario.get('color3')?.value;
      const tolerancia = this.formulario.get('tolerancia')?.value;

      // Calculamos el valor base de la resistencia
      const valorBase = (this.valoresColores[color1] * 10 + this.valoresColores[color2]) * this.multiplicadoresColores[color3];

      // Calculamos el porcentaje de tolerancia
      const porcentajeTolerancia = this.toleranciasValores[tolerancia] / 100;
      const valorMaximo = valorBase + (valorBase * porcentajeTolerancia);
      const valorMinimo = valorBase - (valorBase * porcentajeTolerancia);

      // Añadimos el resultado a la lista de resistencias
      this.resultado.push({
        valor: valorBase,
        valorMaximo: valorMaximo,
        valorMinimo: valorMinimo,
        color1: color1,
        color2: color2,
        color3: color3,
        tolerancia: tolerancia
      });

      // Reseteamos el formulario para permitir una nueva entrada
      this.formulario.reset();
    }
  }

  // Método que devuelve el color hexadecimal correspondiente al nombre del color
  obtenerColorHex(color: string): string {
    const coloresHex: { [key: string]: string } = {
      'Negro': '#000000',
      'Marrón': '#8B4513',
      'Rojo': '#FF0000',
      'Naranja': '#FFA500',
      'Amarillo': '#FFFF00',
      'Verde': '#008000',
      'Azul': '#0000FF',
      'Violeta': '#EE82EE',
      'Gris': '#808080',
      'Blanco': '#FFFFFF',
      'Oro': '#FFD700',
      'Plata': '#C0C0C0'
    };
    return coloresHex[color] || '#FFFFFF';  // Si no encuentra el color, devuelve blanco por defecto
  }
}
