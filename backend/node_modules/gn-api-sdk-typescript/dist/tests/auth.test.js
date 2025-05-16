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
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const auth_1 = __importDefault(require("../src/auth"));
const constants_1 = __importDefault(require("../src/constants"));
jest.mock('fs');
const mockFs = fs_1.default;
mockFs.readFileSync.mockReturnValueOnce('');
jest.mock('axios', () => jest
    .fn()
    .mockResolvedValueOnce({
    status: 200,
    data: {
        access_token: 'RfSfS9AJkLu7jPjOp2IbrI',
        token_type: 'Bearer',
        expires_in: 3600,
        scope: 'cob.read',
    },
})
    .mockResolvedValueOnce({
    status: 200,
    data: {
        access_token: '1723ad73',
        refresh_token: '36accb15',
        expires_in: 600,
        expire_at: '1656012603684',
        token_type: 'Bearer',
    },
}));
const credentialsPix = {
    sandbox: false,
    client_id: 'Client_Id',
    client_secret: 'Client_Secret',
    certificate: 'Certificado_Pix',
    authRoute: { route: '/oauth/token', method: 'post' },
    baseUrl: 'https://api-pix.gerencianet.com.br',
};
const credentials = {
    sandbox: false,
    client_id: 'Client_Id',
    client_secret: 'Client_Secret',
    authRoute: { route: '/oauth/token', method: 'post' },
    baseUrl: 'https://api.gerencianet.com.br/v1',
};
describe('Auth Tests', () => {
    it.each([
        {
            description: 'Should get Access_Token with pix certificate',
            options: credentialsPix,
            expected: { access_token: expect.any(String), token_type: 'Bearer', expires_in: 3600, scope: 'cob.read' },
        },
        {
            description: 'Should get Access_Token without pix certificate [API EMISSÕES]',
            options: credentials,
            expected: { access_token: '1723ad73', refresh_token: '36accb15', expires_in: 600, expire_at: '1656012603684', token_type: 'Bearer' },
        },
    ])('TEST $# : $description', ({ options, expected }) => __awaiter(void 0, void 0, void 0, function* () {
        const auth = new auth_1.default(options, constants_1.default);
        const res = yield auth.getAccessToken();
        expect(res).toMatchObject(expected);
        expect(axios_1.default).toHaveBeenCalled();
    }));
});
