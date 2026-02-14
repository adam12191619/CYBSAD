const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys");
const pino = require("pino");
const readline = require("readline");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (text) => new Promise((resolve) => rl.question(text, resolve));

async function startCYBSAD() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_db');
    const sock = makeWASocket({
        logger: pino({ level: 'silent' }),
        auth: state,
        printQRInTerminal: false
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection } = update;

        if (connection === 'close') {
            console.log("[!] Koneksi terputus, membangkitkan mesin...");
            startCYBSAD();
        } else if (connection === 'open') {
            console.log("\n[🟢] CYBSAD ONLINE. SENDER TAK DIKENAL AKTIF. 💀");
        }
    });

    // LOGIKA PAIRING YANG ANTI-ERROR 428
    if (!sock.authState.creds.registered) {
        console.log("\n=== CYBSAD PAIRING SYSTEM ===");
        const phone = await question("[?] Masukkan No HP Sender (628xxx): ");
        
        console.log("[!] Menunggu sinkronisasi server (10 detik)...");
        setTimeout(async () => {
            try {
                let code = await sock.requestPairingCode(phone);
                console.log(`\n[🔑] KODE PAIRING LU: ${code}`);
                console.log("[!] Masukkan kode ini di WhatsApp Lu sekarang!\n");
            } catch (err) {
                console.log("[!] Gagal tarik kode. Ketik 'pkill -9 node' lalu coba lagi.");
            }
        }, 10000); // Kita kasih jeda 10 detik biar koneksi mateng
    }