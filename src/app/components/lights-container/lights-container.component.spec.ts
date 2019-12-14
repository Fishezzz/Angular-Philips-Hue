import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LightsContainerComponent } from './lights-container.component';

describe('LightsContainerComponent', () => {
    let component: LightsContainerComponent;
    let fixture: ComponentFixture<LightsContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LightsContainerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LightsContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
