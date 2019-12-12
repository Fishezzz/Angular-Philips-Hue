export interface CT {
    min: number;
    max: number;
}

export interface Control {
    mindimlevel: number;
    maxlumen: number;
    colorgamuttype: string;
    colorgamut: [number[]];
    ct: CT;
}
