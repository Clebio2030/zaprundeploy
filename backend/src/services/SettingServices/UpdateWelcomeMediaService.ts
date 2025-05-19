import Setting from "../../models/Setting";
import AppError from "../../errors/AppError";

interface MediaData {
  type: string;
  url: string;
  width: string;
}

interface Request {
  mediaData: MediaData;
  companyId: number;
}

interface Response {
  type: string;
  url: string;
  width: string;
}

const UpdateWelcomeMediaService = async ({
  mediaData,
  companyId
}: Request): Promise<Response> => {
  const { type, url, width } = mediaData;

  if (!["image", "video", "youtube"].includes(type)) {
    throw new AppError("Tipo de mídia inválido. Use 'image', 'video' ou 'youtube'.", 400);
  }

  if (!url) {
    throw new AppError("URL da mídia é obrigatória.", 400);
  }

  await Setting.findOrCreate({
    where: { key: "welcomeMediaType", companyId },
    defaults: { value: type, companyId }
  });

  await Setting.findOrCreate({
    where: { key: "welcomeMediaUrl", companyId },
    defaults: { value: url, companyId }
  });

  await Setting.findOrCreate({
    where: { key: "welcomeMediaWidth", companyId },
    defaults: { value: width || "50%", companyId }
  });

  await Setting.update(
    { value: type },
    { where: { key: "welcomeMediaType", companyId } }
  );

  await Setting.update(
    { value: url },
    { where: { key: "welcomeMediaUrl", companyId } }
  );

  await Setting.update(
    { value: width || "50%" },
    { where: { key: "welcomeMediaWidth", companyId } }
  );

  return {
    type,
    url,
    width: width || "50%"
  };
};

export default UpdateWelcomeMediaService; 