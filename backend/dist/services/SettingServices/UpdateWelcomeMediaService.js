"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Setting_1 = __importDefault(require("../../models/Setting"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const UpdateWelcomeMediaService = async ({ mediaData, companyId }) => {
    const { type, url, width } = mediaData;
    if (!["image", "video", "youtube"].includes(type)) {
        throw new AppError_1.default("Tipo de mídia inválido. Use 'image', 'video' ou 'youtube'.", 400);
    }
    if (!url) {
        throw new AppError_1.default("URL da mídia é obrigatória.", 400);
    }
    await Setting_1.default.findOrCreate({
        where: { key: "welcomeMediaType", companyId },
        defaults: { value: type, companyId }
    });
    await Setting_1.default.findOrCreate({
        where: { key: "welcomeMediaUrl", companyId },
        defaults: { value: url, companyId }
    });
    await Setting_1.default.findOrCreate({
        where: { key: "welcomeMediaWidth", companyId },
        defaults: { value: width || "50%", companyId }
    });
    await Setting_1.default.update({ value: type }, { where: { key: "welcomeMediaType", companyId } });
    await Setting_1.default.update({ value: url }, { where: { key: "welcomeMediaUrl", companyId } });
    await Setting_1.default.update({ value: width || "50%" }, { where: { key: "welcomeMediaWidth", companyId } });
    return {
        type,
        url,
        width: width || "50%"
    };
};
exports.default = UpdateWelcomeMediaService;
