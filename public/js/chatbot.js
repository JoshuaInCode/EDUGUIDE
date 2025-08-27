// EduGuide Chatbot - Powered by Hugging Face & Firebase
class EduGuideChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.isTyping = false;
        this.huggingFaceToken = null;
        this.firebaseConfig = null;
        
        this.init();
    }

    async init() {
        // Cargar configuración desde .env
        await this.loadConfig();
        
        // Crear el DOM del chatbot
        this.createChatbotDOM();
        
        // Agregar estilos
        this.addStyles();
        
        // Inicializar eventos
        this.bindEvents();
        
        // Cargar mensajes previos si existen
        this.loadPreviousMessages();
        
        // Mensaje de bienvenida
        const welcomeMessage = this.chatbotConfig?.welcomeMessage || "¡Hola! Soy el asistente virtual de EduGuide. Puedo ayudarte con información sobre universidades, carreras, becas y cualquier consulta sobre educación superior en Panamá. ¿En qué puedo ayudarte hoy?";
        this.addBotMessage(welcomeMessage);
    }

    async loadConfig() {
        try {
            // Cargar configuración desde el archivo config.js
            if (typeof getChatbotConfig === 'function') {
                const config = getChatbotConfig();
                this.huggingFaceToken = config.HUGGING_FACE_TOKEN;
                this.firebaseConfig = config.FIREBASE;
                this.chatbotConfig = config.CHATBOT;
                
                // Validar configuración
                if (typeof validateChatbotConfig === 'function') {
                    validateChatbotConfig();
                }
            } else {
                console.warn('⚠️ Chatbot: Archivo de configuración no encontrado. Usando valores por defecto.');
                this.huggingFaceToken = 'your_token_here';
                this.firebaseConfig = {
                    apiKey: 'your_firebase_api_key',
                    authDomain: 'your_domain.firebaseapp.com',
                    projectId: 'your_project_id',
                    storageBucket: 'your_bucket.appspot.com',
                    messagingSenderId: 'your_sender_id',
                    appId: 'your_app_id'
                };
            }
        } catch (error) {
            console.error('Error loading config:', error);
        }
    }

    createChatbotDOM() {
        // Crear el botón flotante del chatbot
        const chatbotButton = document.createElement('div');
        chatbotButton.id = 'chatbot-button';
        chatbotButton.innerHTML = `
            <i class="fas fa-comments"></i>
            <span class="notification-badge" id="notification-badge" style="display: none;">1</span>
        `;
        chatbotButton.className = 'chatbot-button';

        // Crear el contenedor del chatbot
        const chatbotContainer = document.createElement('div');
        chatbotContainer.id = 'chatbot-container';
        chatbotContainer.className = 'chatbot-container';
        chatbotContainer.innerHTML = `
            <div class="chatbot-header">
                <div class="chatbot-title">
                    <i class="fas fa-robot"></i>
                    <span>EduGuide Assistant</span>
                </div>
                <button class="chatbot-close" id="chatbot-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="chatbot-messages" id="chatbot-messages">
                <!-- Los mensajes se insertarán aquí -->
            </div>
            <div class="chatbot-input-container">
                <input type="text" id="chatbot-input" placeholder="Escribe tu pregunta..." maxlength="500">
                <button id="chatbot-send">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
            <div class="chatbot-typing" id="chatbot-typing" style="display: none;">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <span>EduGuide está escribiendo...</span>
            </div>
        `;

        // Agregar al DOM
        document.body.appendChild(chatbotButton);
        document.body.appendChild(chatbotContainer);
    }

    addStyles() {
        const styles = `
            .chatbot-button {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 70px;
                height: 70px;
                background: linear-gradient(135deg, #2196F3, #1976D2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 8px 25px rgba(33, 150, 243, 0.4);
                transition: all 0.3s ease;
                z-index: 10000;
                color: white;
                font-size: 24px;
            }

            .chatbot-button:hover {
                transform: translateY(-5px) scale(1.1);
                box-shadow: 0 12px 35px rgba(33, 150, 243, 0.6);
            }

            .chatbot-button .notification-badge {
                position: absolute;
                top: -5px;
                right: -5px;
                background: #f44336;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
            }

            .chatbot-container {
                position: fixed;
                bottom: 120px;
                right: 30px;
                width: 380px;
                height: 500px;
                background: white;
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
                display: none;
                flex-direction: column;
                z-index: 10000;
                overflow: hidden;
                border: 1px solid #e0e0e0;
            }

            .chatbot-container.open {
                display: flex;
                animation: slideInUp 0.3s ease;
            }

            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .chatbot-header {
                background: linear-gradient(135deg, #2196F3, #1976D2);
                color: white;
                padding: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-radius: 20px 20px 0 0;
            }

            .chatbot-title {
                display: flex;
                align-items: center;
                gap: 10px;
                font-weight: 600;
                font-size: 16px;
            }

            .chatbot-title i {
                font-size: 20px;
            }

            .chatbot-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                font-size: 18px;
                padding: 5px;
                border-radius: 50%;
                transition: background 0.3s ease;
            }

            .chatbot-close:hover {
                background: rgba(255, 255, 255, 0.2);
            }

            .chatbot-messages {
                flex: 1;
                padding: 20px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 15px;
            }

            .message {
                max-width: 80%;
                padding: 12px 16px;
                border-radius: 18px;
                word-wrap: break-word;
                line-height: 1.4;
                animation: messageSlideIn 0.3s ease;
            }

            @keyframes messageSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .message.user {
                background: linear-gradient(135deg, #E3F2FD, #BBDEFB);
                color: #1565C0;
                align-self: flex-end;
                border-bottom-right-radius: 6px;
            }

            .message.bot {
                background: linear-gradient(135deg, #F5F5F5, #EEEEEE);
                color: #424242;
                align-self: flex-start;
                border-bottom-left-radius: 6px;
            }

            .message.system {
                background: linear-gradient(135deg, #FFF3E0, #FFE0B2);
                color: #E65100;
                align-self: center;
                border-radius: 12px;
                font-style: italic;
                font-size: 14px;
            }

            .chatbot-input-container {
                padding: 20px;
                display: flex;
                gap: 10px;
                border-top: 1px solid #e0e0e0;
                background: #fafafa;
            }

            #chatbot-input {
                flex: 1;
                padding: 12px 16px;
                border: 2px solid #e0e0e0;
                border-radius: 25px;
                outline: none;
                font-size: 14px;
                transition: border-color 0.3s ease;
            }

            #chatbot-input:focus {
                border-color: #2196F3;
            }

            #chatbot-send {
                background: linear-gradient(135deg, #2196F3, #1976D2);
                color: white;
                border: none;
                border-radius: 50%;
                width: 45px;
                height: 45px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }

            #chatbot-send:hover {
                transform: scale(1.1);
                box-shadow: 0 4px 15px rgba(33, 150, 243, 0.4);
            }

            #chatbot-send:disabled {
                opacity: 0.6;
                cursor: not-allowed;
                transform: none;
            }

            .chatbot-typing {
                padding: 15px 20px;
                display: flex;
                align-items: center;
                gap: 10px;
                color: #666;
                font-size: 14px;
                background: #f5f5f5;
                border-top: 1px solid #e0e0e0;
            }

            .typing-indicator {
                display: flex;
                gap: 4px;
            }

            .typing-indicator span {
                width: 8px;
                height: 8px;
                background: #2196F3;
                border-radius: 50%;
                animation: typing 1.4s infinite ease-in-out;
            }

            .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
            .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }

            @keyframes typing {
                0%, 80%, 100% {
                    transform: scale(0.8);
                    opacity: 0.5;
                }
                40% {
                    transform: scale(1);
                    opacity: 1;
                }
            }

            .quick-replies {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-top: 10px;
            }

            .quick-reply {
                background: #E3F2FD;
                color: #1565C0;
                border: 1px solid #BBDEFB;
                border-radius: 20px;
                padding: 8px 16px;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .quick-reply:hover {
                background: #BBDEFB;
                transform: translateY(-2px);
            }

            .message-time {
                font-size: 11px;
                opacity: 0.7;
                margin-top: 5px;
                text-align: right;
            }

            .message.bot .message-time {
                text-align: left;
            }

            @media (max-width: 768px) {
                .chatbot-container {
                    width: calc(100vw - 40px);
                    right: 20px;
                    left: 20px;
                    height: 60vh;
                    bottom: 100px;
                }

                .chatbot-button {
                    right: 20px;
                    bottom: 20px;
                }
            }

            .scrollbar-custom::-webkit-scrollbar {
                width: 6px;
            }

            .scrollbar-custom::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 3px;
            }

            .scrollbar-custom::-webkit-scrollbar-thumb {
                background: #c1c1c1;
                border-radius: 3px;
            }

            .scrollbar-custom::-webkit-scrollbar-thumb:hover {
                background: #a8a8a8;
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    bindEvents() {
        // Botón del chatbot
        document.getElementById('chatbot-button').addEventListener('click', () => {
            this.toggleChatbot();
        });

        // Botón de cerrar
        document.getElementById('chatbot-close').addEventListener('click', () => {
            this.closeChatbot();
        });

        // Input del chatbot
        const input = document.getElementById('chatbot-input');
        const sendButton = document.getElementById('chatbot-send');

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        sendButton.addEventListener('click', () => {
            this.sendMessage();
        });

        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeChatbot();
            }
        });
    }

    toggleChatbot() {
        if (this.isOpen) {
            this.closeChatbot();
        } else {
            this.openChatbot();
        }
    }

    openChatbot() {
        this.isOpen = true;
        document.getElementById('chatbot-container').classList.add('open');
        document.getElementById('chatbot-input').focus();
        
        // Ocultar notificación
        document.getElementById('notification-badge').style.display = 'none';
        
        // Scroll al final
        this.scrollToBottom();
    }

    closeChatbot() {
        this.isOpen = false;
        document.getElementById('chatbot-container').classList.remove('open');
    }

    async sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (!message || this.isTyping) return;

        // Limpiar input
        input.value = '';

        // Agregar mensaje del usuario
        this.addUserMessage(message);

        // Mostrar indicador de escritura
        this.showTyping();

        try {
            // Analizar el mensaje para entender mejor la intención
            const messageAnalysis = this.analyzeMessage(message);
            
            // Obtener respuesta del chatbot
            let response;
            
            if (this.huggingFaceToken && this.huggingFaceToken !== 'your_token_here') {
                try {
                    response = await this.getHuggingFaceResponse(message);
                    console.log('🤖 Respuesta de IA generada:', response);
                } catch (aiError) {
                    console.warn('⚠️ Error con IA, usando respuestas predefinidas:', aiError);
                    response = this.getPredefinedResponse(message);
                }
            } else {
                response = this.getPredefinedResponse(message);
            }
            
            // Ocultar indicador de escritura
            this.hideTyping();
            
            // Agregar respuesta del bot
            this.addBotMessage(response);
            
            // Registrar la interacción para mejorar respuestas futuras
            this.logInteraction(message, response, messageAnalysis);
            
        } catch (error) {
            console.error('Error getting chatbot response:', error);
            this.hideTyping();
            this.addBotMessage("Lo siento, estoy teniendo problemas para procesar tu pregunta. Por favor, inténtalo de nuevo en unos momentos.");
        }
    }

    async getChatbotResponse(message) {
        try {
            // Si tenemos token de Hugging Face, usar su API
            if (this.huggingFaceToken && this.huggingFaceToken !== 'your_token_here') {
                return await this.getHuggingFaceResponse(message);
            }
            
            // Si no, usar respuestas predefinidas
            return this.getPredefinedResponse(message);
            
        } catch (error) {
            console.error('Error in chatbot response:', error);
            return this.getPredefinedResponse(message);
        }
    }

    async getHuggingFaceResponse(message) {
        try {
            // Crear un contexto más rico para la IA
            const context = this.createAIContext(message);
            
            // Intentar con diferentes modelos si el primero falla
            const models = [
                'facebook/blenderbot-400M-distill',
                'microsoft/DialoGPT-medium',
                'facebook/blenderbot-1B-distill'
            ];
            
            for (const model of models) {
                try {
                    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${this.huggingFaceToken}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            inputs: context,
                            parameters: {
                                max_length: this.chatbotConfig?.maxLength || 200,
                                temperature: this.chatbotConfig?.temperature || 0.7,
                                do_sample: true,
                                top_p: 0.9,
                                repetition_penalty: 1.1
                            }
                        })
                    });

                    if (!response.ok) {
                        console.warn(`Model ${model} failed with status: ${response.status}`);
                        continue;
                    }

                    const data = await response.json();
                    
                    if (data && data[0] && data[0].generated_text) {
                        // Procesar y mejorar la respuesta
                        return this.processAIResponse(data[0].generated_text, message);
                    }
                    
                } catch (modelError) {
                    console.warn(`Error with model ${model}:`, modelError);
                    continue;
                }
            }
            
            // Si todos los modelos fallan, usar respuestas predefinidas
            throw new Error('All AI models failed');
            
        } catch (error) {
            console.error('Hugging Face API error:', error);
            throw error;
        }
    }

    createAIContext(message) {
        // Crear un contexto rico basado en la pregunta del usuario
        const baseContext = `Eres EduGuide, un asistente virtual experto en educación superior en Panamá. 
        Tu misión es ayudar a estudiantes con información sobre universidades, carreras, becas y orientación académica.
        
        Información clave que conoces:
        - Universidades en Panamá: UP, UTP, UDELAS, USMA, UIP, ULatina, UMIP, UNACHI
        - Carreras populares: Ingeniería, Medicina, Administración, Diseño, Tecnología
        - Becas disponibles: Nacionales, internacionales, por mérito académico
        - Proceso de admisión: Requisitos, fechas, documentación necesaria
        
        El usuario pregunta: "${message}"
        
        Responde de manera amigable, informativa y específica. Si no tienes información exacta sobre algo, 
        sugiere dónde pueden encontrar más información o redirige a las secciones relevantes del sitio web.`;
        
        return baseContext;
    }

    processAIResponse(aiResponse, originalMessage) {
        // Limpiar y mejorar la respuesta de la IA
        let processedResponse = aiResponse.trim();
        
        // Remover respuestas muy cortas o irrelevantes
        if (processedResponse.length < 10) {
            return this.getPredefinedResponse(originalMessage);
        }
        
        // Asegurar que la respuesta sea contextual
        if (!this.isContextuallyRelevant(processedResponse, originalMessage)) {
            return this.getPredefinedResponse(originalMessage);
        }
        
        // Agregar información adicional si es relevante
        processedResponse = this.enhanceResponse(processedResponse, originalMessage);
        
        return processedResponse;
    }

    isContextuallyRelevant(response, question) {
        const questionWords = question.toLowerCase().split(' ');
        const responseWords = response.toLowerCase().split(' ');
        
        // Verificar si hay palabras clave en común
        const commonWords = questionWords.filter(word => 
            responseWords.includes(word) && word.length > 3
        );
        
        return commonWords.length > 0;
    }

    enhanceResponse(response, question) {
        const lowerQuestion = question.toLowerCase();
        
        // Agregar información específica según el tipo de pregunta
        if (lowerQuestion.includes('universidad') || lowerQuestion.includes('universidades')) {
            if (!response.includes('UP') && !response.includes('UTP') && !response.includes('UDELAS')) {
                response += "\n\n💡 Puedes explorar más universidades en la sección 'Universidades' de nuestro sitio web.";
            }
        }
        
        if (lowerQuestion.includes('carrera') || lowerQuestion.includes('estudiar')) {
            if (!response.includes('ingeniería') && !response.includes('medicina') && !response.includes('administración')) {
                response += "\n\n🎯 Descubre más carreras en la sección 'Carreras' de EduGuide.";
            }
        }
        
        if (lowerQuestion.includes('beca') || lowerQuestion.includes('financiamiento')) {
            if (!response.includes('beca') && !response.includes('financiamiento')) {
                response += "\n\n💰 Encuentra más información sobre becas en la sección 'Becas' de nuestro sitio.";
            }
        }
        
        return response;
    }

    getPredefinedResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Respuestas sobre universidades
        if (lowerMessage.includes('universidad') || lowerMessage.includes('universidades')) {
            if (lowerMessage.includes('up') || lowerMessage.includes('panamá')) {
                return "🏛️ La Universidad de Panamá (UP) es la universidad pública más grande y prestigiosa de Panamá, fundada en 1935. Ofrece más de 200 programas académicos en todas las áreas del conocimiento. Sus campus principales están en la Ciudad de Panamá, Chiriquí, Veraguas y Coclé.\n\n📚 Programas destacados: Medicina, Derecho, Ingeniería, Administración, Educación\n\n🌐 Visita: www.up.ac.pa para más información";
            }
            if (lowerMessage.includes('utp') || lowerMessage.includes('tecnológica')) {
                return "⚙️ La Universidad Tecnológica de Panamá (UTP) es líder en educación tecnológica y científica. Especializada en ingenierías, tecnología y ciencias aplicadas.\n\n🔬 Programas destacados: Ingeniería Civil, Ingeniería Eléctrica, Ingeniería Mecánica, Ingeniería en Sistemas, Arquitectura\n\n🌐 Visita: utp.ac.pa para explorar su oferta académica";
            }
            if (lowerMessage.includes('udelas') || lowerMessage.includes('américas')) {
                return "🌎 La Universidad Especializada de las Américas (UDELAS) se enfoca en programas especializados desde 1997. Ofrece carreras únicas y programas de formación continua.\n\n🎯 Programas destacados: Psicología, Trabajo Social, Educación Especial, Comunicación Social\n\n🌐 Visita: www.udelas.ac.pa para más detalles";
            }
            return "🏛️ En Panamá tenemos excelentes universidades:\n\n• Universidad de Panamá (UP) - Pública, fundada en 1935\n• Universidad Tecnológica de Panamá (UTP) - Tecnológica y científica\n• Universidad Especializada de las Américas (UDELAS) - Programas especializados\n• Universidad Santa María La Antigua (USMA) - Privada católica\n• Universidad Interamericana de Panamá (UIP) - Privada\n\n💡 ¿Te gustaría conocer más detalles sobre alguna universidad específica?";
        }
        
        // Respuestas sobre carreras
        if (lowerMessage.includes('carrera') || lowerMessage.includes('carreras') || lowerMessage.includes('estudiar')) {
            if (lowerMessage.includes('ingeniería') || lowerMessage.includes('ingeniero')) {
                return "⚙️ Las carreras de Ingeniería en Panamá son muy demandadas:\n\n• Ingeniería Civil - 5 años, construcción e infraestructura\n• Ingeniería Eléctrica - 5 años, sistemas eléctricos y energía\n• Ingeniería Mecánica - 5 años, diseño y mantenimiento industrial\n• Ingeniería en Sistemas - 4 años, desarrollo de software y TI\n• Ingeniería Industrial - 5 años, optimización de procesos\n\n🎯 La UTP es líder en estas carreras. ¿Te interesa alguna en particular?";
            }
            if (lowerMessage.includes('medicina') || lowerMessage.includes('médico')) {
                return "🏥 Medicina en Panamá:\n\n• Duración: 6 años (Doctorado)\n• Universidades principales: UP, UIP, USMA\n• Requisitos: Bachillerato en Ciencias, examen de admisión\n• Áreas de especialización: Pediatría, Cardiología, Cirugía, etc.\n\n📚 También puedes estudiar:\n• Odontología (5 años)\n• Enfermería (4 años)\n• Farmacia (5 años)\n\n💡 ¿Te gustaría conocer más sobre el proceso de admisión?";
            }
            if (lowerMessage.includes('administración') || lowerMessage.includes('negocios')) {
                return "💼 Carreras en Administración y Negocios:\n\n• Administración de Empresas - 4 años\n• Contabilidad - 4 años\n• Mercadeo - 4 años\n• Finanzas - 4 años\n• Comercio Internacional - 4 años\n\n🏢 Universidades destacadas: UP, UTP, USMA, UIP\n\n💡 Estas carreras tienen alta empleabilidad en Panamá. ¿Te interesa alguna área específica?";
            }
            return "🎓 Ofrecemos carreras en diversas áreas:\n\n⚙️ Ingeniería y Tecnología (Civil, Eléctrica, Sistemas, Industrial)\n🏥 Ciencias de la Salud (Medicina, Odontología, Enfermería)\n💼 Ciencias Empresariales (Administración, Contabilidad, Mercadeo)\n🎨 Diseño y Artes (Arquitectura, Diseño Gráfico, Bellas Artes)\n📚 Ciencias Sociales (Psicología, Derecho, Educación)\n\n💡 ¿Tienes alguna área específica en mente?";
        }
        
        // Respuestas sobre becas
        if (lowerMessage.includes('beca') || lowerMessage.includes('becas') || lowerMessage.includes('financiamiento')) {
            if (lowerMessage.includes('nacional') || lowerMessage.includes('panamá')) {
                return "🇵🇦 Becas Nacionales en Panamá:\n\n• IFARHU - Instituto para la Formación y Aprovechamiento de Recursos Humanos\n• SENACYT - Secretaría Nacional de Ciencia, Tecnología e Innovación\n• Beca Universal - Para estudiantes de bajos recursos\n• Beca por Excelencia - Para estudiantes destacados\n\n💰 También hay becas de:\n• Universidades públicas (UP, UTP)\n• Empresas privadas\n• Organizaciones no gubernamentales\n\n💡 ¿Te gustaría conocer los requisitos para alguna beca específica?";
            }
            if (lowerMessage.includes('internacional') || lowerMessage.includes('extranjero')) {
                return "🌍 Becas Internacionales:\n\n• Chevening (Reino Unido)\n• Fulbright (Estados Unidos)\n• DAAD (Alemania)\n• MEXT (Japón)\n• Erasmus+ (Europa)\n\n📋 Requisitos generales:\n• Excelente promedio académico\n• Dominio del idioma del país\n• Carta de motivación\n• Referencias académicas\n\n💡 ¿Te interesa algún país o programa específico?";
            }
            return "💰 Tenemos información sobre becas:\n\n🇵🇦 Nacionales: IFARHU, SENACYT, Beca Universal\n🌍 Internacionales: Chevening, Fulbright, DAAD, MEXT\n🏛️ Universitarias: UP, UTP, USMA, UIP\n\n💡 ¿Te gustaría conocer más sobre algún tipo específico de beca o programa?";
        }
        
        // Respuestas sobre el sitio web
        if (lowerMessage.includes('sitio') || lowerMessage.includes('web') || lowerMessage.includes('página')) {
            return "🌐 EduGuide es tu guía completa para la educación superior en Panamá.\n\n📱 Nuestro sitio web te ofrece:\n• Información detallada de universidades\n• Catálogo completo de carreras\n• Base de datos de becas\n• Herramientas de orientación vocacional\n• Contacto directo con instituciones\n\n💡 Navega por las secciones:\n• Universidades - Conoce todas las opciones\n• Carreras - Explora programas de estudio\n• Becas - Encuentra financiamiento\n• Contacto - Resuelve dudas específicas";
        }
        
        // Respuestas sobre Firebase
        if (lowerMessage.includes('firebase') || lowerMessage.includes('base de datos')) {
            return "🔥 Utilizamos Firebase como nuestra base de datos para:\n\n📊 Almacenar información actualizada sobre:\n• Universidades y sus programas\n• Carreras y requisitos\n• Becas disponibles\n• Usuarios registrados\n\n🔒 Características de seguridad:\n• Autenticación segura\n• Datos encriptados\n• Acceso controlado\n• Respaldo automático\n\n💡 Esto nos permite ofrecerte información confiable y actualizada en tiempo real.";
        }
        
        // Respuestas sobre admisión
        if (lowerMessage.includes('admisión') || lowerMessage.includes('inscribir') || lowerMessage.includes('requisitos')) {
            return "📝 Proceso de Admisión en Panamá:\n\n📋 Requisitos generales:\n• Bachillerato aprobado\n• Cédula de identidad\n• Certificado de notas\n• Examen de admisión (según universidad)\n• Fotografías\n\n📅 Fechas importantes:\n• UP: Enero-Febrero (primer semestre)\n• UTP: Febrero-Marzo\n• UDELAS: Marzo-Abril\n\n💡 Cada universidad tiene sus propios requisitos. ¿Te gustaría conocer los de alguna universidad específica?";
        }
        
        // Respuesta general
        return "🤖 ¡Hola! Soy el asistente virtual de EduGuide.\n\n💡 Puedo ayudarte con:\n• Información sobre universidades en Panamá\n• Detalles de carreras y programas\n• Información sobre becas y financiamiento\n• Proceso de admisión y requisitos\n• Orientación académica\n\n❓ ¿Puedes ser más específico sobre lo que te gustaría saber? Por ejemplo:\n• '¿Qué carreras ofrece la UP?'\n• '¿Cómo obtener una beca?'\n• '¿Cuáles son los requisitos para Medicina?'";
    }

    addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user';
        messageDiv.innerHTML = `
            ${message}
            <div class="message-time">${this.getCurrentTime()}</div>
        `;
        
        this.messages.push({ type: 'user', content: message, timestamp: new Date() });
        this.addMessageToDOM(messageDiv);
    }

    addBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot';
        messageDiv.innerHTML = `
            ${message}
            <div class="message-time">${this.getCurrentTime()}</div>
        `;
        
        this.messages.push({ type: 'bot', content: message, timestamp: new Date() });
        this.addMessageToDOM(messageDiv);
        
        // Agregar respuestas rápidas si es apropiado
        this.addQuickReplies(message);
        
        // Guardar en localStorage
        this.saveMessages();
    }

    addQuickReplies(message) {
        const lowerMessage = message.toLowerCase();
        let quickReplies = [];
        
        // Sugerencias basadas en el contenido del mensaje
        if (lowerMessage.includes('universidad') || lowerMessage.includes('universidades')) {
            quickReplies = [
                '¿Qué carreras ofrece la UP?',
                '¿Cuándo son las admisiones?',
                '¿Cuál es el costo de la UTP?',
                '¿Qué becas hay disponibles?'
            ];
        } else if (lowerMessage.includes('carrera') || lowerMessage.includes('estudiar')) {
            quickReplies = [
                '¿Cuánto dura Medicina?',
                '¿Qué ingenierías hay?',
                '¿Cuáles son los requisitos?',
                '¿Qué carreras tienen más empleo?'
            ];
        } else if (lowerMessage.includes('beca') || lowerMessage.includes('financiamiento')) {
            quickReplies = [
                '¿Cómo aplicar a IFARHU?',
                '¿Qué becas internacionales hay?',
                '¿Cuáles son los requisitos?',
                '¿Cuándo abren las convocatorias?'
            ];
        } else if (lowerMessage.includes('admisión') || lowerMessage.includes('inscribir')) {
            quickReplies = [
                '¿Qué documentos necesito?',
                '¿Cuándo son los exámenes?',
                '¿Cuál es el proceso paso a paso?',
                '¿Puedo transferir créditos?'
            ];
        } else {
            // Sugerencias generales
            quickReplies = [
                '¿Qué universidades hay en Panamá?',
                '¿Qué carreras puedo estudiar?',
                '¿Cómo obtener una beca?',
                '¿Cuándo abren las admisiones?'
            ];
        }
        
        // Mostrar respuestas rápidas
        this.showQuickReplies(quickReplies);
    }

    showQuickReplies(replies) {
        const messagesContainer = document.getElementById('chatbot-messages');
        
        // Remover respuestas rápidas anteriores
        const existingReplies = messagesContainer.querySelector('.quick-replies');
        if (existingReplies) {
            existingReplies.remove();
        }
        
        // Crear contenedor de respuestas rápidas
        const quickRepliesDiv = document.createElement('div');
        quickRepliesDiv.className = 'quick-replies';
        
        replies.forEach(reply => {
            const quickReply = document.createElement('div');
            quickReply.className = 'quick-reply';
            quickReply.textContent = reply;
            quickReply.addEventListener('click', () => {
                this.handleQuickReply(reply);
            });
            quickRepliesDiv.appendChild(quickReply);
        });
        
        messagesContainer.appendChild(quickRepliesDiv);
        this.scrollToBottom();
    }

    handleQuickReply(reply) {
        // Simular que el usuario escribió la pregunta
        document.getElementById('chatbot-input').value = reply;
        this.processMessage(reply);
        
        // Remover las respuestas rápidas
        const quickReplies = document.querySelector('.quick-replies');
        if (quickReplies) {
            quickReplies.remove();
        }
    }

    addSystemMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message system';
        messageDiv.textContent = message;
        
        this.addMessageToDOM(messageDiv);
    }

    addMessageToDOM(messageDiv) {
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTyping() {
        this.isTyping = true;
        document.getElementById('chatbot-typing').style.display = 'flex';
        this.scrollToBottom();
    }

    hideTyping() {
        this.isTyping = false;
        document.getElementById('chatbot-typing').style.display = 'none';
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('es-PA', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }

    saveMessages() {
        try {
            localStorage.setItem('eduguide-chatbot-messages', JSON.stringify(this.messages));
        } catch (error) {
            console.error('Error saving messages:', error);
        }
    }

    loadPreviousMessages() {
        try {
            const saved = localStorage.getItem('eduguide-chatbot-messages');
            if (saved) {
                this.messages = JSON.parse(saved);
                
                // Mostrar solo los últimos 10 mensajes
                const recentMessages = this.messages.slice(-10);
                recentMessages.forEach(msg => {
                    if (msg.type === 'user') {
                        this.addUserMessage(msg.content);
                    } else if (msg.type === 'bot') {
                        this.addBotMessage(msg.content);
                    }
                });
            }
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    }

    showNotification() {
        if (!this.isOpen) {
            document.getElementById('notification-badge').style.display = 'flex';
        }
    }

    // Método para limpiar historial
    clearHistory() {
        this.messages = [];
        localStorage.removeItem('eduguide-chatbot-messages');
        
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.innerHTML = '';
        
        // Agregar mensaje de bienvenida nuevamente
        const welcomeMessage = this.chatbotConfig?.welcomeMessage || "¡Hola! Soy el asistente virtual de EduGuide. ¿En qué puedo ayudarte hoy?";
        this.addBotMessage(welcomeMessage);
    }

    analyzeMessage(message) {
        const lowerMessage = message.toLowerCase();
        const analysis = {
            intent: 'general',
            entities: [],
            confidence: 0.8,
            language: 'es'
        };
        
        // Detectar intención del usuario
        if (lowerMessage.includes('universidad') || lowerMessage.includes('universidades')) {
            analysis.intent = 'universities';
            analysis.confidence = 0.9;
        } else if (lowerMessage.includes('carrera') || lowerMessage.includes('estudiar') || lowerMessage.includes('profesión')) {
            analysis.intent = 'careers';
            analysis.confidence = 0.9;
        } else if (lowerMessage.includes('beca') || lowerMessage.includes('financiamiento') || lowerMessage.includes('dinero')) {
            analysis.intent = 'scholarships';
            analysis.confidence = 0.9;
        } else if (lowerMessage.includes('admisión') || lowerMessage.includes('inscribir') || lowerMessage.includes('requisitos')) {
            analysis.intent = 'admission';
            analysis.confidence = 0.9;
        } else if (lowerMessage.includes('costo') || lowerMessage.includes('precio') || lowerMessage.includes('cuota')) {
            analysis.intent = 'costs';
            analysis.confidence = 0.8;
        } else if (lowerMessage.includes('empleo') || lowerMessage.includes('trabajo') || lowerMessage.includes('salario')) {
            analysis.intent = 'employment';
            analysis.confidence = 0.8;
        }
        
        // Detectar entidades específicas
        if (lowerMessage.includes('up') || lowerMessage.includes('panamá')) {
            analysis.entities.push('UP');
        }
        if (lowerMessage.includes('utp') || lowerMessage.includes('tecnológica')) {
            analysis.entities.push('UTP');
        }
        if (lowerMessage.includes('udelas') || lowerMessage.includes('américas')) {
            analysis.entities.push('UDELAS');
        }
        if (lowerMessage.includes('medicina') || lowerMessage.includes('médico')) {
            analysis.entities.push('Medicina');
        }
        if (lowerMessage.includes('ingeniería') || lowerMessage.includes('ingeniero')) {
            analysis.entities.push('Ingeniería');
        }
        
        return analysis;
    }

    logInteraction(userMessage, botResponse, analysis) {
        try {
            const interaction = {
                timestamp: new Date().toISOString(),
                userMessage,
                botResponse,
                analysis,
                sessionId: this.getSessionId()
            };
            
            // Guardar en localStorage para análisis local
            const interactions = JSON.parse(localStorage.getItem('eduguide-interactions') || '[]');
            interactions.push(interaction);
            
            // Mantener solo las últimas 100 interacciones
            if (interactions.length > 100) {
                interactions.length = 100;
            }
            
            localStorage.setItem('eduguide-interactions', JSON.stringify(interactions));
            
        } catch (error) {
            console.warn('No se pudo registrar la interacción:', error);
        }
    }

    getSessionId() {
        let sessionId = localStorage.getItem('eduguide-session-id');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('eduguide-session-id', sessionId);
        }
        return sessionId;
    }
}

// Inicializar el chatbot cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.eduguideChatbot = new EduGuideChatbot();
});

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EduGuideChatbot;
}
