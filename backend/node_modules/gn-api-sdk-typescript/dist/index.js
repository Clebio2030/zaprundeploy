"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
const endpoints_1 = __importDefault(require("./src/endpoints"));
const constants_1 = __importDefault(require("./src/constants"));
class Gerencianet {
    constructor(options) {
        if (options.pathCert || options.pix_cert) {
            options.certificate = options.pathCert || options.pix_cert;
        }
        const credentials = {
            client_id: options.client_id,
            client_secret: options.client_secret,
            certificate: options.certificate,
            sandbox: options.sandbox,
        };
        if (options.pemKey) {
            credentials.pemKey = options.pemKey;
        }
        const methods = {};
        Object.keys(constants_1.default.APIS).forEach((endpoint) => {
            const key = endpoint;
            Object.assign(methods, constants_1.default.APIS[key].ENDPOINTS);
        });
        Object.keys(methods).forEach((api) => {
            this[api] = (params, body) => {
                const endpoints = new endpoints_1.default(credentials, constants_1.default);
                return endpoints.run(api, params, body);
            };
        });
    }
}
exports.default = Gerencianet;
