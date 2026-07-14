const { Client, LocalAuth } = require('whatsapp-web.js'); // O la librería exacta que uses
const qrcode = require('qrcode-terminal');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000; // El puerto donde correrá tu API del formulario

// Middlewares necesarios
app.use(cors());
app.use(express.json());

// Inicialización del cliente de WhatsApp
const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Escanea este código QR con tu WhatsApp:');
});

client.on('ready', () => {
    console.log('🤖 ¡Tu Bot de WhatsApp está listo y conectado!');
});

// ========================================================
// RUTA DE LA API PARA RECIBIR LOS DATOS DEL FORMULARIO
// ========================================================
app.post('/api/formulario', async (req, res) => {
    const { nombre, telefono, email, mensaje } = req.body;

    // Tu número de WhatsApp de destino (el tuyo o donde quieras recibir las alertas de clientes)
    // Debe incluir el código de país (57 para Colombia) seguido de tu número, y terminar en '@c.us'
    const tuNumeroWhatsApp = '573053988180@c.us'; 

    // Estructuramos el mensaje elegante que te llegará a tu WhatsApp
    const textoMensaje = `💼 *¡Nuevo Cliente en Carlitos Tech!* 💼\n\n` +
                         `👤 *Nombre:* ${nombre}\n` +
                         `📞 *Teléfono:* ${telefono}\n` +
                         `📧 *Email:* ${email}\n` +
                         `📝 *Mensaje:* ${mensaje}`;

    try {
        // Le ordenamos al bot enviar el mensaje a tu chat
        await client.sendMessage(tuNumeroWhatsApp, textoMensaje);
        
        res.status(200).json({ success: true, message: 'Mensaje enviado a WhatsApp con éxito.' });
    } catch (error) {
        console.error('Error al enviar el mensaje por WhatsApp:', error);
        res.status(500).json({ success: false, message: 'No se pudo enviar el mensaje por WhatsApp.' });
    }
});

// Iniciar el cliente de WhatsApp
client.initialize();

// Iniciar el servidor Express
app.listen(PORT, () => {
    console.log(`🚀 Servidor de la API corriendo en http://localhost:${PORT}`);
});

// --- Aquí abajo se mantiene tu lógica actual de respuestas automáticas (client.on('message', ...)) ---
client.on('message', async message => {

    if (message.from.includes('@g.us')) return;
    if (message.fromMe) return;

    const texto = message.body.toLowerCase();

    if (
        texto.includes('hola') ||
        texto.includes('Hola') ||
        texto.includes('informacion') ||
        texto.includes('información') ||
        texto.includes('info') ||
        texto.includes('servicios') ||
        texto.includes('ayuda') ||
        texto.includes('menu') ||
        texto.includes('menú')
    ) 
    {

        await message.reply(

            `🚀 *PUNNT CONVERSION*

            Bienvenido.

            ¿En qué podemos ayudarte?

            1️⃣ Diseño de páginas web
            2️⃣ Landing Pages de Conversión
            3️⃣ Tiendas Online
            4️⃣ Automatización de Ventas 
            5️⃣ Posicionamiento SEO
            6️⃣ Optimizacion de Conversiones
            7️⃣ Mantenimiento Web
            8️⃣ Branding Digital

            ✍️ Escribe el número de la opción.`
        );

        return;
        }

        if (texto === '1') {
            await message.reply(
                `💻 Diseño de páginas web

                Creamos sitios web profesionales optimizados para convertir visitantes en clientes,¡ESPERA TE CONECTAMOS CON NUESTRO PERSONAL!

                Por favor envíanos:

                👤 Nombre
                📱 Teléfono
                🏢 Nombre de tu negocio

                Y un asesor te contactará.`
            );
        return;
        }

        if (texto === '2') {
            await message.reply(
                `📈 Landing Pages de Conversión

                Páginas enfocadas en generar más contactos y ventas para tu negocio.

                Por favor envíanos:

                👤 Nombre
                📱 Teléfono
                🏢 Nombre de tu negocio

                Y un asesor te contactará.`
            );
        return;
        }

        if (texto === '3') {
            await message.reply(
                `🛒 Tiendas Online

                Desarrollamos e-commerce con pasarelas de pago e inventario.

                Por favor envíanos:

                👤 Nombre
                📱 Teléfono
                🏢 Nombre de tu negocio

                Y un asesor te contactará.`
            );
        return;
        }

        if (texto === '4') {
            await message.reply(
                `🤖  Automatización de Ventas

                Implementamos chatbots, CRM y procesos automáticos.

                Por favor envíanos:

                👤 Nombre
                📱 Teléfono
                🏢 Nombre de tu negocio

                Y un asesor te contactará.`
            );
        return;
        }

        if (texto === '5') {
            await message.reply(
                `🔍  Posicionamiento SEO

                Posicionamos tu negocio en Google para obtener más clientes

                Por favor envíanos:

                👤 Nombre
                📱 Teléfono
                🏢 Nombre de tu negocio

                Y un asesor te contactará.`
            );
        return;
        }

        if (texto === '6') {
            await message.reply(
                `🤖 Optimización de Conversión

                Mejoramos el rendimiento de tus páginas para aumentar las conversiones

                Por favor envíanos:

                👤 Nombre
                📱 Teléfono
                🏢 Nombre de tu negocio

                Y un asesor te contactará.`
            );
        return;
        }

        if (texto === '7') {
            await message.reply(
                `🤖 Mantenimiento Web

                Ofrecemos servicios de mantenimiento para mantener tu sitio web actualizado y seguro.

                Por favor envíanos:

                👤 Nombre
                📱 Teléfono
                🏢 Nombre de tu negocio

                Y un asesor te contactará.`
            );
        return;
        }

        if (texto === '8') {
            await message.reply(
                `🤖 Branding Digital

                Desarrollamos estrategias de marca para destacar en el mercado

                Por favor envíanos:

                👤 Nombre
                📱 Teléfono
                🏢 Nombre de tu negocio

                Y un asesor te contactará.`
            );
        return;
        }

        await message.reply(
            `No entendí tu mensaje.

            Escribe:

            • hola
            • información
            • menu

            para ver nuestros servicios.`
        );
});