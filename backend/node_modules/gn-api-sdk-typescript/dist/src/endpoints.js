"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/extensions */
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const axios_1 = __importDefault(require("axios"));
const auth_1 = __importDefault(require("./auth"));
const package_json_1 = __importDefault(require("../package.json"));
class Endpoints {
    constructor(options, constants) {
        this.options = options;
        this.constants = constants;
    }
    run(name, params, body) {
        if (Object.keys(this.constants.APIS.DEFAULT.ENDPOINTS).includes(name)) {
            this.endpoint = this.constants.APIS.DEFAULT.ENDPOINTS[name];
            this.options.baseUrl = this.options.sandbox ? this.constants.APIS.DEFAULT.URL.SANDBOX : this.constants.APIS.DEFAULT.URL.PRODUCTION;
        }
        else {
            Object.keys(this.constants.APIS).forEach((api) => {
                if (Object.keys(this.constants.APIS[api].ENDPOINTS).includes(name)) {
                    this.endpoint = this.constants.APIS[api].ENDPOINTS[name];
                    this.options.baseUrl = this.options.sandbox ? this.constants.APIS[api].URL.SANDBOX : this.constants.APIS[api].URL.PRODUCTION;
                    this.options.authRoute = this.constants.APIS[api].ENDPOINTS.authorize;
                }
            });
            try {
                if (this.options.certificate) {
                    if (this.options.pemKey) {
                        this.agent = new https_1.default.Agent({
                            cert: fs_1.default.readFileSync(this.options.certificate),
                            key: fs_1.default.readFileSync(this.options.pemKey),
                            passphrase: '',
                        });
                    }
                    else {
                        this.agent = new https_1.default.Agent({
                            pfx: fs_1.default.readFileSync(this.options.certificate),
                            passphrase: '',
                        });
                    }
                    this.options.agent = this.agent;
                }
            }
            catch (error) {
                throw new Error(`FALHA AO LER O CERTIFICADO`);
            }
        }
        this.body = body;
        this.params = [params];
        return this.req();
    }
    getAccessToken() {
        const gnAuth = new auth_1.default(this.options, this.constants);
        return gnAuth
            .getAccessToken()
            .then((response) => {
            return response.access_token;
        })
            .catch((err) => {
            return err;
        });
    }
    req() {
        return __awaiter(this, void 0, void 0, function* () {
            const req = yield this.createRequest(this.endpoint.route);
            return (0, axios_1.default)(req)
                .then((res) => {
                return res.data;
            })
                .catch((error) => {
                throw error.response.data;
            });
        });
    }
    createRequest(route) {
        return __awaiter(this, void 0, void 0, function* () {
            // eslint-disable-next-line no-useless-escape
            const regex = /\:(\w+)/g;
            let query = '';
            const placeholders = route.match(regex) || [];
            const params = {};
            if (this.params) {
                this.params.forEach((obj) => {
                    if (obj) {
                        Object.entries(obj).forEach((entrie) => {
                            // eslint-disable-next-line prefer-destructuring
                            params[entrie[0]] = entrie[1];
                        });
                    }
                });
            }
            const getVariables = () => {
                return placeholders.map((item) => {
                    return item.replace(':', '');
                });
            };
            const updateRoute = () => {
                const variables = getVariables();
                variables.forEach((value, index) => {
                    if (params[value]) {
                        // eslint-disable-next-line no-param-reassign
                        route = route.replace(placeholders[index], params[value]);
                        delete params[value];
                    }
                });
            };
            const getQueryString = () => {
                const keys = Object.keys(params);
                const initial = keys.length >= 1 ? '?' : '';
                return keys.reduce((previous, current, index, array) => {
                    const next = index === array.length - 1 ? '' : '&';
                    return [previous, current, '=', params[current], next].join('');
                }, initial);
            };
            updateRoute();
            query = getQueryString();
            const accessToken = yield this.getAccessToken();
            const headers = {
                'api-sdk': `typescript-${package_json_1.default.version}`,
                'Content-Type': 'application/json',
                authorization: `Bearer ${accessToken}`,
            };
            headers['x-skip-mtls-checking'] = !this.options.validateMtls;
            if (this.options.partnerToken) {
                headers['partner-token'] = this.options.partnerToken;
            }
            const req = {
                method: this.endpoint.method,
                url: [this.options.baseUrl, route, query].join(''),
                headers,
                data: this.body,
            };
            if (this.options.baseUrl !== this.constants.APIS.DEFAULT.URL.PRODUCTION && this.options.baseUrl !== this.constants.APIS.DEFAULT.URL.SANDBOX) {
                req.httpsAgent = this.agent;
            }
            return req;
        });
    }
}
exports.default = Endpoints;
