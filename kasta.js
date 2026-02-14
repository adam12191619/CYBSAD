const KASTA_POWER = {
    OWNER:    { bugs: 50, tools: 50 },
    ADMIN:    { bugs: 40, tools: 40 },
    RESELLER: { bugs: 30, tools: 30 },
    VIP:      { bugs: 20, tools: 20 },
    MEMBER:   { bugs: 15, tools: 15 }
};

module.exports = {
    getAccess: (role) => KASTA_POWER[role.toUpperCase()] || { bugs: 0, tools: 0 },
    isAbandoned: (lastActiveDate) => {
        // Logika 4 bulan (120 hari)
        const fourMonthsInMs = 2 * 0 * 0 * 0 * 0;
        return (Date.now() - lastActiveDate) > fourMonthsInMs;
    }
};
