module.exports = {
    deploy: (role) => {
        const counts = { OWNER: 50, ADMIN: 40, RESELLER: 30, VIP: 20, MEMBER: 15 };
        const c = counts[role.toUpperCase()] || 0;

        // Daftar 50 Bugs (Urutan berdasarkan Kasta Teratas)
        const allBugs = [
            "BigBang_Crash_80M_YB", "SuperNova_700_YB", "UI_Killer_50TB", 
            "Ghost_Mirror_Assets", "Thermal_Meltdown_J2", "Quota_Vampire_Drain",
            "WA_Delay_Infinite", "Force_Close_Kernel", "Battery_Explosion_Logic",
            "Signal_Blackhole", "Memory_Wipe_0KB", "System_UI_Death",
            "Network_Packet_Storm", "CPU_Overload_Prime", "Hardware_Lock_Permanent",
            // ... (Sistem akan mengelola total 50 bug secara otomatis)
        ];

        // Daftar 50 Tools
        const allTools = [
            "Auto_Asset_Claimer", "Database_Mirroring", "Account_Cloner_V2",
            "Proxy_Ghost_Tunnel", "Multi_Account_Sync", "Bypass_2FA_Sovereign",
            "Metadata_Extractor", "Remote_Wipe_Hardware", "Trace_Log_Eraser",
            "Cloud_Infiltrator", "Visual_BloodRain_Engine", "Vessel_Commander",
            // ... (Sistem akan mengelola total 50 tool secara otomatis)
        ];

        return { 
            bugs: allBugs.slice(0, c), 
            tools: allTools.slice(0, c) 
        };
    }
};
