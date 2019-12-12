export interface Startup {
    mode: string;
    configured: boolean;
}

export interface Config {
    archetype: string;
    function: string;
    direction: string;
    startup: Startup;
}
