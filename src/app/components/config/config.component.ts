import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';

@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
    config: any;

    constructor(private configService: ConfigService) { }

    ngOnInit() {
    }

    onClick() {
        this.configService.getConfig()
            .subscribe(data => this.config = data);
    }
}
