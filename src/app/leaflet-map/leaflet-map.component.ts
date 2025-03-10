import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

import { BackendApiService } from '../services/backend-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leaflet-map',
  imports: [CommonModule],
  providers: [BackendApiService],
  templateUrl: './leaflet-map.component.html',
  styleUrl: './leaflet-map.component.css'
})
export class LeafletMapComponent implements OnInit, AfterViewInit {
  loading: boolean = false;
  map!: L.Map
  latitude = 45.690271493141964;
  longitude = 9.819189643005746;
  centerExpression : L.LatLngExpression = [this.latitude, this.longitude]; 
  center: L.Marker = L.marker(this.centerExpression)
  markers: L.Marker[] = [this.center];
  locations: any[] = [];
  
  constructor(private backendApiService: BackendApiService) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.initMap();
    this.centerMap();
  }

  private initMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    this.map = L.map('map');
    L.tileLayer(baseMapURl).addTo(this.map);    
  }

  private centerMap() {
    // Create a boundary based on the markers
    //const bounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));
    const bounds = L.latLngBounds([this.centerExpression]);
    
    // Fit the map into the boundary
    this.map.fitBounds(bounds);
    this.map.setZoom(12);
    this.getLocations(this.latitude, this.longitude, 10);
    this.map.on('moveend', (evt: any) => {
      const newCenter = evt.target.getCenter();
      this.latitude  = newCenter.lat;
      this.longitude = newCenter.lng;
      this.getLocations(this.latitude, this.longitude, 10);
    });
  }  

  async getLocations(lat: any, lng: any, radius: any) {
    this.loading = true;
    const params = { latitude: lat, longitude: lng, km: radius };
    try {
      this.backendApiService.getNearestLocations(params).subscribe((response) => {        
        this.locations = response;
        this.markers.forEach((marker: any) => {
          this.map.removeLayer(marker);         
        });
        this.markers.splice(0, this.markers.length);
        this.locations.forEach((element: any) => {
          let marker = L.marker([element.point.y, element.point.x]).addTo(this.map);
          marker.bindPopup(element.locationName);
          this.markers.push(marker);
        });
        this.loading = false
      });
    } catch (error) {
      console.error(error);
      this.loading = false;
    }  
        
  }

}
