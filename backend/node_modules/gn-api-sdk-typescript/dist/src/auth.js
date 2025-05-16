"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable camelcase */
/* eslint-disable import/extensions */
const axios_1 = __importDefault(require("axios"));
const package_json_1 = __importDefault(require("../package.json"));
class Auth {
    constructor(options, constants) {
        this.constants = constants;
        this.client_id = options.client_id;
        this.client_secret = options.client_secret;
        this.baseUrl = options.baseUrl;
        if (options.agent) {
            this.agent = options.agent;
        }
        if (options.authRoute) {
            this.authRoute = options.authRoute;
        }
    }
    getAccessToken() {
        let postParams;
        if (this.constants.APIS.DEFAULT.URL.PRODUCTION === this.baseUrl || this.constants.APIS.DEFAULT.URL.SANDBOX === this.baseUrl) {
            postParams = {
                method: 'POST',
                url: this.baseUrl + this.constants.APIS.DEFAULT.ENDPOINTS.authorize.route,
                headers: {
                    'api-sdk': `typescript-${package_json_1.default.version}`,
                },
                data: {
                    grant_type: 'client_credentials',
                },
                auth: {
                    username: this.client_id,
                    password: this.client_secret,
                },
            };
        }
        else {
            const data_credentials = `${this.client_id}:${this.client_secret}`;
            const auth = Buffer.from(data_credentials).toString('base64');
            postParams = {
                method: 'POST',
                url: this.baseUrl + this.authRoute.route,
                headers: {
                    Authorization: `Basic ${auth}`,
                    'Content-Type': 'application/json',
                    'api-sdk': `typescript-${package_json_1.default.version}`,
                },
                httpsAgent: this.agent,
                data: {
                    grant_type: 'client_credentials',
                },
            };
        }
        const response = (0, axios_1.default)(postParams)
            .then((res) => {
            return res.data;
        })
            .catch((error) => {
            return error.response.data;
        });
        return response;
    }
}
exports.default = Auth;
