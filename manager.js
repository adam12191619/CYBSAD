module.exports = {
    deploy: (role) => {
        const counts = { OWNER: 50, ADMIN: 40, RESELLER: 30, VIP: 20, MEMBER: 15 };
        const c = counts[role.toUpperCase()] || 0;
        
        const bugs = [
            "BigBang_80M_YB", "SuperNova_700_YB", "UI_Crash_50TB", "Quota_Vampire", 
            "Kernel_Panic", "Thermal_Melt", "WA_Delay_Infinite", "Battery_Drainer",
            "Signal_Jammer", "Memory_Blackhole" // ... Lanjutkan sampai 50
        ].slice(0, c);

        return { bugs, tools: Array(c).fill("CYBSAD_TOOL_PRO") };
    }
};
