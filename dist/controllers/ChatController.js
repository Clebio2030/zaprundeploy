// ... existing code ...
const uploadFiles = async (req, res) => {
    console.log("[DEBUG] Rota de upload acessada: /chats/:id/messages/upload");
    console.log("[DEBUG] Parâmetros: ", req.params);
    console.log("[DEBUG] Query: ", req.query);
    console.log("[DEBUG] Body: ", req.body);
    console.log("[DEBUG] Files: ", req.files ? "Tem arquivos" : "Sem arquivos");
    
    // Importando exec para execução de comandos
    const { exec } = require('child_process');
    const execPromise = (0, util_1.promisify)(exec);
    
    const { companyId } = req.user;
    const { message } = req.body;
    const { id } = req.params;
    const senderId = +req.user.id;
    const chatId = +id;
    console.log("[DEBUG] Rota de upload acessada:", { chatId, senderId, companyId });
    console.log("[DEBUG] Body da requisição:", req.body);
    // Verificar se existem arquivos na requisição
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        console.log("[ERROR] Nenhum arquivo recebido na requisição");
        return res.status(400).json({ error: "Nenhum arquivo recebido" });
    }
    const files = req.files;
    console.log("[DEBUG] Arquivos recebidos:", files.map(f => ({ name: f.originalname, size: f.size, type: f.mimetype })));
    try {
        // Processar os arquivos enviados
        const fileData = await Promise.all(files.map(async (file) => {
            // Gerar caminho para arquivos do chat
            const chatFolder = path_1.default.join("public", `company${companyId}`, "chats");
            const oldPath = file.path;
            console.log("[DEBUG] Processando arquivo:", { name: file.originalname, oldPath });
            
            // Verificar se é um arquivo de áudio
            const isAnyAudio = file.mimetype.includes('audio') || 
                              file.originalname.includes('audio_') || 
                              ['mp3', 'wav', 'ogg', 'm4a', 'aac', 'mpeg', 'opus'].some(ext => 
                                file.originalname.toLowerCase().endsWith(`.${ext}`));
            
            console.log("[DEBUG] Verificação de áudio:", { 
                isAnyAudio,
                originalName: file.originalname,
                mimeType: file.mimetype
            });
            
            // Criar pasta se não existir
            if (!fs_1.default.existsSync(chatFolder)) {
                console.log("[DEBUG] Criando pasta:", chatFolder);
                fs_1.default.mkdirSync(chatFolder, { recursive: true });
            }
            
            // Criar nome de arquivo único
            const timestamp = new Date().getTime();
            let fileName = '';
            let newPath = '';
            
            // Processamento específico para arquivos de áudio
            if (isAnyAudio) {
                // Para qualquer áudio, forçar extensão .m4a para compatibilidade universal
                const baseName = file.originalname.split('.')[0];
                fileName = `${timestamp}-${baseName.replace(/[^a-zA-Z0-9]/g, "_")}.m4a`;
                newPath = path_1.default.join(chatFolder, fileName);
                
                // CONVERSÃO REAL: converter o arquivo de áudio para M4A usando FFmpeg
                try {
                    console.log("[DEBUG] Convertendo áudio para M4A com FFmpeg:", { oldPath, newPath });
                    
                    // Executar o comando FFmpeg para conversão real
                    await execPromise(`ffmpeg -y -i "${oldPath}" -c:a aac -b:a 128k "${newPath}"`);
                    
                    console.log("[DEBUG] Conversão para M4A concluída com sucesso");
                    
                    // Forçar tipo MIME para compatibilidade com Safari
                    file.mimetype = 'audio/mp4';
                    
                    // Tentar remover o arquivo temporário original
                    try {
                        await (0, util_1.promisify)(fs_1.default.unlink)(oldPath);
                    } catch (unlinkError) {
                        console.error("[DEBUG] Aviso: Não foi possível remover arquivo temporário:", unlinkError);
                        // Continuar mesmo se não conseguir remover
                    }
                } catch (conversionError) {
                    console.error("[ERROR] Erro ao converter áudio para M4A:", conversionError);
                    // Se falhar a conversão, tentar apenas mover o arquivo original
                    try {
                        await (0, util_1.promisify)(fs_1.default.copyFile)(oldPath, newPath);
                        await (0, util_1.promisify)(fs_1.default.unlink)(oldPath);
                        console.log("[DEBUG] Arquivo copiado sem conversão como fallback");
                    } catch (copyError) {
                        console.error("[ERROR] Erro ao copiar arquivo original:", copyError);
                        throw copyError;
                    }
                }
            } else {
                // Para outros tipos de arquivo, manter o processamento original
                fileName = `${timestamp}-${file.originalname.replace(/[^a-zA-Z0-9.]/g, "_")}`;
                newPath = path_1.default.join(chatFolder, fileName);
                
                try {
                    // Mover arquivo 
                    await (0, util_1.promisify)(fs_1.default.rename)(oldPath, newPath);
                    console.log("[DEBUG] Arquivo movido com sucesso");
                }
                catch (moveError) {
                    console.error("[ERROR] Erro ao mover arquivo:", moveError);
                    // Tentar copiar em vez de mover como fallback
                    try {
                        await (0, util_1.promisify)(fs_1.default.copyFile)(oldPath, newPath);
                        await (0, util_1.promisify)(fs_1.default.unlink)(oldPath);
                        console.log("[DEBUG] Arquivo copiado como fallback");
                    }
                    catch (copyError) {
                        console.error("[ERROR] Erro ao copiar arquivo:", copyError);
                        throw copyError;
                    }
                }
            }
            
            // Determinar o tipo MIME e processar metadados
            let fileExtension = '';
            
            // Para todos os áudios, forçamos tipo de áudio compatível
            if (isAnyAudio) {
                fileExtension = 'm4a';
                file.mimetype = 'audio/mp4';
                console.log("[DEBUG] Forçando MIME type para audio/mp4 para compatibilidade universal");
            } else {
                fileExtension = file.originalname.split('.').pop()?.toLowerCase();
            }
            
            const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension);
            
            // Objeto para armazenar metadados do arquivo
            const metadata = {};
            
            // Extrair metadados específicos para áudio
            if (isAnyAudio) {
                try {
                    console.log("[DEBUG] Extraindo duração do áudio:", newPath);
                    const duration = await (0, get_audio_duration_1.getAudioDurationInSeconds)(newPath);
                    metadata.duration = duration;
                    console.log("[DEBUG] Duração do áudio:", duration);
                    
                    // Adicionar metadados extras para áudio
                    metadata.format = 'm4a';
                    metadata.codec = 'aac';
                    metadata.universalCompatible = true;
                }
                catch (audioError) {
                    console.error("[ERROR] Erro ao extrair duração do áudio:", audioError);
                    // Continuar mesmo se não conseguir extrair a duração
                }
            }
            
            // Gerar URL pública para o arquivo
            const fileURL = path_1.default.join("company" + companyId, "chats", fileName).replace(/\\/g, "/");
            return {
                name: isAnyAudio ? `${file.originalname.split('.')[0]}.m4a` : file.originalname,
                size: file.size,
                type: file.mimetype,
                url: fileURL,
                metadata
            };
        }));
        
        console.log("[DEBUG] Arquivos processados:", fileData);
        
        // Criar a mensagem com os arquivos processados
        const newMessage = await (0, CreateMessageService_1.default)({
            chatId,
            senderId,
            message: message || "",
            files: fileData
        });
        
        // Buscar o chat para incluir nas notificações
        const chat = await Chat_1.default.findByPk(chatId, {
            include: [
                { model: User_1.default, as: "owner" },
                { model: ChatUser_1.default, as: "users" }
            ]
        });
        
        // Emitir eventos de socket para notificar os clientes
        const io = (0, socket_1.getIO)();
        io.of(String(companyId))
            .emit(`company-${companyId}-chat-${chatId}`, {
            action: "create",
            message: newMessage,
            chat
        });
        
        return res.status(200).json(newMessage);
    } catch (error) {
        console.error("[ERROR] Erro ao processar upload:", error);
        return res.status(500).json({
            error: "Erro ao processar o upload de arquivos",
            details: error.message
        });
    }
};
// ... existing code ... 