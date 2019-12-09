import { Component, OnInit } from '@angular/core';

import { ConfigService } from 'src/app/services/config.service';
import { LightResponse, Light } from 'src/app/lights';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
    private lightResponse: LightResponse;
    lights: Light[];

    constructor(private configService: ConfigService) { }

    ngOnInit() {
    }

    onClick(): void {
        this.configService.getLightsConfig()
            .subscribe(data => this.lightResponse = data);
        this.lights[0] = this.lightResponse[1];
        this.lights[1] = this.lightResponse[2];
        this.lights[2] = this.lightResponse[3];
    }
}
