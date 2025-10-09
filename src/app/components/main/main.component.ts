import { Component } from '@angular/core';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HistoricoComponent } from "./historico/historico.component";

@Component({
  selector: 'app-main',
  imports: [DashboardComponent, HistoricoComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
