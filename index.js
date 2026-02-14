// Ganti bagian logika pairing lu dengan ini:
sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === 'close') {
        console.log("[!] Koneksi terputus, mencoba bangkit lagi...");
        startCYBSAD();
    } else if (connection === 'open') {
        console.log("[🟢] KONEKSI TERBUKA. SISTEM SIAP.");
    }

    // Hanya minta kode jika belum terdaftar dan koneksi mulai stabil
    if (!sock.authState.creds.registered && connection === 'connecting') {
        // Kasih jeda 6 detik biar gak kena 'Connection Closed' lagi
        setTimeout(async () => {
            try {
                const code = await sock.requestPairingCode("628216025242");
                console.log(`\n[🔑] KODE PAIRING LU: ${code}\n`);
            } catch (err) {
                console.log("[!] Gagal minta kode, coba jalankan ulang.");
            }
        }, 6000); 
    }
});
