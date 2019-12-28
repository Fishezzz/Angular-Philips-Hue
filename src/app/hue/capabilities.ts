import { Control } from './control';

export interface Streaming {
    renderer: boolean;
    proxy: boolean;
}

export interface Capabilities {
    certified: boolean;
    control: Control;
    streaming: Streaming;
}
