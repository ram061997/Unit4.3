import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class HobbiesService {

  constructor(private webReqService: WebRequestService) { }

  getPlants() {
    return this.webReqService.get('plants');
  }

  addPlant(data: any) {
    return this.webReqService.post('plants', data);
  }

  deletePlant(plant_name: string) {
    return this.webReqService.delete(`plants/${plant_name}`);
  }

  updatePlayer(plant_name: string | undefined, data: any) {
    return this.webReqService.patch(`plants/${plant_name}`, data)
  }

  getByDifficulty(difficulty: string) {
    return this.webReqService.get(`plants?difficulty=${difficulty}`);
  }

  sortByPrice(col: String) {
    return this.webReqService.get('sortByPrice');
  }
}