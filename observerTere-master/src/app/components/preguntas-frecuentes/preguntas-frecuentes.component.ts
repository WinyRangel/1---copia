import { Component } from '@angular/core';

@Component({
  selector: 'app-preguntas-frecuentes',
  templateUrl: './preguntas-frecuentes.component.html',
  styleUrls: ['./preguntas-frecuentes.component.css']
})
export class PreguntasFrecuentesComponent {
  items = [
    { title: '¿Cómo puedo solicitar un producto?', content: 'Para solicitar un producto, haz clic en el botón "Acciones" en la página del producto y completa el formulario de solicitud. Nos pondremos en contacto contigo lo antes posible para coordinar la entrega.', expanded: false },
    { title: '¿Cuál es el proceso de entrega?', content: 'Una vez que recibimos tu solicitud, nos pondremos en contacto contigo para discutir los detalles de la entrega. Trabajamos para garantizar una entrega rápida y segura de nuestros productos.', expanded: false },
    { title: '¿Cómo puedo contactar con ustedes si tengo alguna pregunta?', content: 'Puedes contactarnos a través del formulario de contacto en nuestra página web, por correo electrónico o por teléfono. Nuestro equipo de atención al cliente estará encantado de ayudarte con cualquier consulta que tengas.', expanded: false }
  ];

  toggleAccordion(index: number) {
    this.items[index].expanded = !this.items[index].expanded;
  }
}
