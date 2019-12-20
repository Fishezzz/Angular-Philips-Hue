import { Component, OnInit, Input } from '@angular/core';

import { HueService } from 'src/app/services/hue.service';
import { Light } from '../hue/lights';

@Component({
    selector: 'app-info-panel',
    templateUrl: './info-panel.component.html',
    styleUrls: ['./info-panel.component.css']
})
export class InfoPanelComponent implements OnInit {
    @Input() lights: Light[];

    constructor(private hueService: HueService) { }

    ngOnInit() {
    }
}
