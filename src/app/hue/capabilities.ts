import { Control } from './control';

export interface Streaming {
    renderer: boolean;
    proxy: boolean;
}

export interface Capabilities {
    certifies: boolean;
    control: Control;
    streaming: Streaming;
}
