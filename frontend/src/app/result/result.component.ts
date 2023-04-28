import { Component } from '@angular/core';
import { HobbiesService } from '../hobbies.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  plants: any[] = [];
  displayModal = "none";
  funcName: string | undefined;
  plant_name: string | undefined;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    url: new FormControl(''),
    type: new FormControl('', Validators.required),
    season: new FormControl('', Validators.required),
    exposure: new FormControl('', Validators.required),
    soil: new FormControl('', Validators.required),
    watering: new FormControl('', Validators.required),
    difficulty: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required)
  });

  get f() {
    return this.form.controls;
  }

  resetForm() {
    this.form.reset();
  }
  
  constructor(private hobbiesService: HobbiesService) {
    this.getPlants();
  }

  openPopup(funcName: string, id: string = "") {
    this.displayModal = "block";
    this.funcName = funcName;
    if (typeof id !== "undefined") {
      this.plant_name = id;
    }
  }
  closePopup() {
    this.displayModal = "none";
    this.funcName = undefined;
    this.plant_name = undefined;
    this.resetForm();
  }

  getPlants(): void {
    this.hobbiesService.getPlants().subscribe((plants: any) => {
      this.plants = plants;
    });
  }

  removePlant(plant_name: string): void {
    this.hobbiesService.deletePlant(plant_name).subscribe((response: any) => {
      this.plants = this.plants.filter(val => val.plant_name !== plant_name);
    });
  }

  sendData(): void {
    if (this.form.status === 'VALID') {
      console.log(this.form.value);
    }

    if (this.funcName === "add") {
      console.log("In add")
      this.hobbiesService.addPlant(this.form.value).subscribe((response: any) => {
        this.plants = this.plants.concat(response);
        this.closePopup();
      })
    }
    else if (this.funcName === "update") {
      console.log("In update")
      this.hobbiesService.updatePlayer(this.plant_name, this.form.value).subscribe((response: any) => {
        this.closePopup();
        window.location.reload();
      })
    }
  }

  sortOn(col: String): void {
    this.hobbiesService.sortByPrice(col).subscribe((plants: any) => {
      this.plants = plants;
    });
  }

}
