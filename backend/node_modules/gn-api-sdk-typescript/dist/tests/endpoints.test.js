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
const auth_1 = __importDefault(require("../src/auth"));
const constants_1 = __importDefault(require("../src/constants"));
const endpoints_1 = __importDefault(require("../src/endpoints"));
const options = {
    sandbox: false,
    client_id: 'Client_Id',
    client_secret: 'Client_Secret',
    certificate: 'Certificado_Pix',
    authRoute: { route: '/oauth/token', method: 'post' },
    baseUrl: 'https://api-pix.gerencianet.com.br',
};
const pixChargeCreated = {
    calendario: {
        criacao: '2020-09-09T20:15:00.358Z',
        expiracao: 3600,
    },
    txid: '7978c0c97ea847e78e8849634473c1f1',
    revisao: 0,
    loc: {
        id: 789,
        location: 'pix.example.com/qr/v2/9d36b84fc70b478fb95c12729b90ca25',
        tipoCob: 'cob',
    },
    location: 'pix.example.com/qr/v2/9d36b84fc70b478fb95c12729b90ca25',
    status: 'ATIVA',
    devedor: {
        cnpj: '12345678000195',
        nome: 'Empresa de Serviços SA',
    },
    valor: {
        original: '567.89',
    },
    chave: 'a1f4102e-a446-4a57-bcce-6fa48899c1d1',
    solicitacaoPagador: 'Informe o número ou identificador do pedido.',
};
jest.spyOn(endpoints_1.default.prototype, 'req')
    .mockResolvedValueOnce(pixChargeCreated)
    .mockImplementationOnce(() => __awaiter(void 0, void 0, void 0, function* () {
    return new Error('FALHA AO LER O CERTIFICADO');
}))
    .mockResolvedValueOnce('');
jest.spyOn(auth_1.default.prototype, 'getAccessToken').mockImplementation(() => {
    return Promise.resolve({
        access_token: 'RfSfS9AJkLu7jPjOp2IbrI',
        token_type: 'Bearer',
        expires_in: 3600,
        scope: 'cob.read',
    });
});
jest.mock('fs');
const mockFs = fs_1.default;
mockFs.readFileSync.mockReturnValueOnce('');
// eslint-disable-next-line prettier/prettier
jest.mock('axios', () => jest.fn()
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
describe('Endpoints Tests', () => {
    const pixEndpoint = {
        name: 'pixCreateCharge',
        params: { txid: 'dt9BHlyzrb5jrFNAdfEDVpHgiOmDbVq111' },
        body: {
            calendario: {
                expiracao: 3600,
            },
            valor: {
                original: '0.01',
            },
            chave: 'CHAVEPIX',
        },
    };
    it('TEST 0: Shoud get Access Token', () => __awaiter(void 0, void 0, void 0, function* () {
        const endpoints = new endpoints_1.default(options, constants_1.default);
        const res = yield endpoints.getAccessToken();
        expect(res).toBe('RfSfS9AJkLu7jPjOp2IbrI');
    }));
    it.each([
        {
            description: 'should create a charge',
            body: pixEndpoint,
            expected: pixChargeCreated,
        },
        {
            description: 'should throw "FALHA AO LER O CERTIFICADO"',
            body: pixEndpoint,
            expected: new Error('FALHA AO LER O CERTIFICADO'),
        },
    ])('TEST $# : $description', ({ body, expected }) => __awaiter(void 0, void 0, void 0, function* () {
        const endpoints = new endpoints_1.default(options, constants_1.default);
        const res = yield endpoints.run(body.name, body.params, body.body);
        expect(res).toStrictEqual(expected);
    }));
    it.each([
        {
            description: 'shoud get the request params [createRequest][PIX]',
            name: 'listAccountConfig',
            route: '/v2/gn/config',
            params: [],
            expected: {
                method: 'get',
                url: 'https://api-pix.gerencianet.com.br/v2/gn/config',
                headers: expect.anything(),
                data: expect.anything(),
                httpsAgent: expect.anything(),
            },
        },
        {
            description: 'shoud get the request params [listPlans][SUBSCRIPTION]',
            name: 'listPlans',
            route: '/plans',
            params: [],
            expected: {
                method: 'get',
                url: 'https://api.gerencianet.com.br/v1/plans',
                headers: expect.anything(),
                data: [],
            },
        },
    ])('TEST $# : $description', ({ name, route, params, expected }) => __awaiter(void 0, void 0, void 0, function* () {
        const endpoints = new endpoints_1.default(options, constants_1.default);
        yield endpoints.run(name, params, []);
        const res = yield endpoints.createRequest(route);
        expect(res).toStrictEqual(expected);
    }));
});
