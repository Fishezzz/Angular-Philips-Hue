import { Component, OnInit, Input, Output } from '@angular/core';
import { Light } from 'src/app/hue/lights';

@Component({
    selector: 'app-light',
    templateUrl: './light.component.html',
    styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit {
    @Input() red: number;
    @Input() green: number;
    @Input() blue: number;
    @Output() onOffText: string;

    constructor(private light: Light) { }

    ngOnInit() {
    }

    OnOffChange() {
        this.light.state.on = !this.light.state.on;
        this.onOffText = this.light.state.on ? 'turn Off' : 'turn On';
    }
}
