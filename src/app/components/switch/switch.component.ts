import { Component, OnInit, Input } from '@angular/core';

import { HueService } from 'src/app/services/hue.service';

@Component({
    selector: 'app-switch',
    templateUrl: './switch.component.html',
    styleUrls: ['./switch.component.css']
})
export class SwitchComponent implements OnInit {
    @Input() value: boolean;
    @Input() lightId: number;

    constructor(private hueService: HueService) { }

    ngOnInit() {
    }

    onChange() {
        this.hueService.UpdateOnOff(this.lightId, this.value).subscribe();
    }
}
