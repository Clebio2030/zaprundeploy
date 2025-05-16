import { GnConfig } from './interfaces/gnConfig.interface';
declare class Endpoints {
    private options;
    private constants;
    private agent;
    private endpoint;
    private body;
    private params;
    constructor(options: GnConfig, constants: any);
    run(name: any, params: any, body: any): Promise<any>;
    getAccessToken(): Promise<any>;
    req(): Promise<any>;
    createRequest(route: any): Promise<Object>;
}
export default Endpoints;
