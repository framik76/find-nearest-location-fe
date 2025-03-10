import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeafletMapComponent } from "./leaflet-map/leaflet-map.component";
import { ImportsModule } from './import';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LeafletMapComponent, ImportsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'leaflet-project';
}
