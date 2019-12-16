import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ConfigService } from './services/config.service';
import { AppComponent } from './app.component';
import { ConfigComponent } from './components/config/config.component';
import { SwitchComponent } from './components/switch/switch.component';
import { LightComponent } from './components/light/light.component';

@NgModule({
    declarations: [
        AppComponent,
        ConfigComponent,
        SwitchComponent,
        LightComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [
        ConfigService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
