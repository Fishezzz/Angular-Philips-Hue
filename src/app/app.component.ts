import { Component, OnInit } from '@angular/core';
import { Light } from './hue/lights';
import { HueService } from './services/hue.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'hue-lampen';
    lights: Light[];

    constructor(private hueService: HueService) { }

    ngOnInit() {
        console.log('Getting all lights...');
        this.hueService.GetAllLights()
            .subscribe(res => { this.lights = Object.values(res); });
    }

    Update() {
        this.hueService.GetAllLights()
            .subscribe(res => { this.lights = Object.values(res); });
    }
}
