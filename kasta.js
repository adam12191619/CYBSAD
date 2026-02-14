const KASTA_POWER = {
    OWNER:    { bugs: 50, tools: 50, access: "ALL_GOD_MODS" },
    ADMIN:    { bugs: 40, tools: 40, access: "HIGH_DESTRUCTION" },
    RESELLER: { bugs: 30, tools: 30, access: "MEDIUM_ANNIHILATION" },
    VIP:      { bugs: 20, tools: 20, access: "STRESS_TESTER" },
    MEMBER:   { bugs: 15, tools: 15, access: "BASIC_GLITCH" }
};

module.exports = {
    getAccess: (role) => {
        const power = KASTA_POWER[role.toUpperCase()];
        return power || "AKSES DITOLAK. 🤡";
    },
    harvest: async (target) => {
        console.log("[KASTA] Mengunci target " + target + "...");
        console.log("[KASTA] Aset diamankan. 4 bulan tidak aktif = Milik DB. 😇");
        return "SECURED";
    }
};
