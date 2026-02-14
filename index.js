const Extractor = require('./extractor.js');
const Manager = require('./manager.js');

async function sovereignExecution(target, role) {
    if (role !== "OWNER") return console.log("Akses Ditolak.");

    // 1. Cari Pintu Belakang & Sedot Data
    const access = await Extractor.huntBackdoor(target);
    
    if (access.status === "INFILTRATED") {
        console.log("[+] PROSES SEDOT DATA DIMULAI...");
        await Extractor.harvestToDB("data_gmail", "CREDENTIALS");
        await Extractor.harvestToDB("foto_galeri", "IMAGE");
        
        console.log("[+] SEMUA ASET TELAH PINDAH KE DATABASE. 😇");
        
        // 2. Jika aset sudah di DB, baru lepaskan kiamat
        console.log("[!!!] DATA SECURED. INITIATING FINAL ANNIHILATION...");
        const power = Manager.deploy(role);
        console.log(`[!] MENGGUNAKAN BUG: ${power.bugs[0]} (80M YB)`);
        
        // Target Innalillahi
        console.log("[-] STATUS TARGET: PERMANENT DEAD. ⚰️🗿");
    }
}

sovereignExecution("NOMOR_PENIPU", "OWNER");
