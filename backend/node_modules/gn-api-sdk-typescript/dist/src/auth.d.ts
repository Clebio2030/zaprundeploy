import { GnConfig } from './interfaces/gnConfig.interface';
declare class Auth {
    private constants;
    private client_id;
    private client_secret;
    private baseUrl?;
    private agent;
    private authRoute;
    constructor(options: GnConfig, constants: any);
    getAccessToken(): Promise<any>;
}
export default Auth;
