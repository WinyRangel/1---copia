import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent implements OnInit {
    constructor(private sessionService: SessionService){}
    ngOnInit(): void {
       this.sessionService.startSessionTimer();
    }
}
