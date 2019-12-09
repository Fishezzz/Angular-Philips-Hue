export interface State {
    on: boolean;
    bri: number;
    hue: number;
    sat: number;
    effect: string;
    xy: number[];
    ct: number;
    alert: string;
    colormode: string;
    reachable: boolean;
}

export interface Light {
    state: State;
    type: string;
    name: string;
    modelid: string;
    manufacturername: string;
    uniqueid: string;
    swversion: string;
}

export interface LightResponse {
    1: Light;
    2: Light;
    3: Light;
}
