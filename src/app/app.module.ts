import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ConfigService } from './services/config.service';
import { AppComponent } from './app.component';
import { ConfigComponent } from './components/config/config.component';
import { SwitchComponent } from './components/switch/switch.component';
import { LightsContainerComponent } from './components/lights-container/lights-container.component';

@NgModule({
    declarations: [
        AppComponent,
        ConfigComponent,
        SwitchComponent,
        LightsContainerComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [
        ConfigService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
