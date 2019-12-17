import { Component, OnInit, Output } from '@angular/core';

import { Light } from 'src/app/hue/lights';
import { State } from 'src/app/hue/state';
import { ConfigService } from 'src/app/services/config.service';
import { HueService } from 'src/app/services/hue.service';

@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
    switchValue: boolean;
    lights: Light[];

    testGETAllLights: Light[];
    testGETLight: Light;
    testOnOff = true;
    testPUTOnOffResponse: State;
    testGETOnOff: State;
    testPUTColorResponse: State;
    testGETColor: State;

    constructor(private configService: ConfigService, private hueService: HueService) {
    }

    ngOnInit() {
        // this.configService.GetLightsConfig()
        //     .subscribe((data) => (this.lights = Object.values(data)));
    }

    ShowSomething() {
        console.log(this.lights);
        this.switchValue = !this.switchValue;
    }

    switchChange() {
        console.log('switch changed');
    }


    GetAllLights() {
        this.testGETAllLights = null;
        console.log('Getting all lights...');
        // this.hueService.GetAllLights()
        //     .subscribe(res => this.testGETAllLights = res);
    }


    GetLight() {
        this.testGETLight = null;
        console.log('Getting light...');
        // this.hueService.GetLightById(3)
        //     .subscribe(res => this.testGETLight = res);
    }


    PutOnOff() {
        this.testPUTOnOffResponse = null;
        console.log('Putting state of light...');
        // this.hueService.ChangeOnOff(5, this.testOnOff)
        //     .subscribe(res => this.testPUTOnOffResponse = res);
        this.testOnOff = !this.testOnOff;
    }

    GetOnOff() {
        this.testGETOnOff = null;
        console.log('Getting state of light...');
        // this.hueService.GetLightById(5)
        //     .subscribe(res => this.testGETOnOff = (res as Light).state);
    }


    PutColor() {
        this.testPUTColorResponse = null;
        console.log('Putting color of light...');
        const xy = this.hueService.ParseXYfromRGB(
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255));
        // this.hueService.ChangeColor(1, xy)
        //     .subscribe(res => this.testPUTColorResponse = res);
    }

    GetColor() {
        this.testGETColor = null;
        console.log('Getting color of light...');
        // this.hueService.GetLightById(1)
        //     .subscribe(res => this.testGETColor = (res as Light).state);
    }
}
