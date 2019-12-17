import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ColorSketchModule } from 'ngx-color/sketch';

import { ConfigService } from './services/config.service';
import { AppComponent } from './app.component';
import { ConfigComponent } from './components/config/config.component';
import { SwitchComponent } from './components/switch/switch.component';
import { LightComponent } from './components/light/light.component';
import { LightContainerComponent } from './light-container/light-container.component';
import { ColorSelectorComponent } from './color-selector/color-selector.component';

@NgModule({
    declarations: [
        AppComponent,
        ConfigComponent,
        SwitchComponent,
        LightComponent,
        LightContainerComponent,
        ColorSelectorComponent
    ],
    imports: [
        BrowserModule,
        ColorSketchModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [
        ConfigService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
