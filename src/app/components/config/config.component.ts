import { Component, OnInit } from '@angular/core';

import { ConfigService } from 'src/app/services/config.service';
import { Light } from 'src/app/hue/lights';

@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
    private lightConfig: any;
    lights: Light[];

    constructor(private configService: ConfigService) {
        this.lightResponseGET();
    }

    ngOnInit() {
    }

    getLights() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(this.lights = Object.values(this.lightConfig));
            }, 500);
        });
    }

    async lightResponseGET() {
        console.log("Getting lightResponse...");
        this.configService.getLightsConfig()
            .subscribe((data) => (this.lightConfig = data));
        console.log('GET lightResponse: Done!');
        await this.getLights();
        console.log("lightResponse to Lights[]: Done!")
    }

    ShowSomething() {
        console.log(this.lights);
    }
}
