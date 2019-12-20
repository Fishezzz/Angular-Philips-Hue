import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ColorSketchModule } from 'ngx-color/sketch';

import { AppComponent } from './app.component';
import { SwitchComponent } from './components/switch/switch.component';
import { LightComponent } from './components/light/light.component';
import { InfoPanelComponent } from './info-panel/info-panel.component';

@NgModule({
    declarations: [
        AppComponent,
        SwitchComponent,
        LightComponent,
        InfoPanelComponent
    ],
    imports: [
        BrowserModule,
        ColorSketchModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
