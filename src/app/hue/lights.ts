import { Capabilities } from './Capabilities';
import { Config } from './config';
import { State } from './state';
import { SwUpdate } from './swupdate';

export interface Light {
    state: State;
    swupdate: SwUpdate;
    type: string;
    name: string;
    modelid: string;
    manufacturername: string;
    productname: string;
    capabilities: Capabilities;
    config: Config;
    uniqueid: string;
    swversion: string;
    swconfigid: string;
    productid: string;
}

export interface LightList {
    [id: string]: Light;
}
