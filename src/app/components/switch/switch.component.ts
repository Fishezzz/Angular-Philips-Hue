import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-switch',
    templateUrl: './switch.component.html',
    styleUrls: ['./switch.component.css']
})
export class SwitchComponent implements OnInit {
    @Input() value: boolean;

    constructor() {
    }

    ngOnInit() {
    }

    onChange() {
        this.value = this.value;
    }
}
