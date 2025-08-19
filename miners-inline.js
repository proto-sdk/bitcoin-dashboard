// Bitcoin Miners Count Widget - Inline Text Version
// Usage: <span id="bitcoin-miners">Loading...</span><script src="https://proto-sdk.github.io/bitcoin-dashboard/miners-inline.js"></script>

(function() {
    function formatNumber(num) {
        if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
        if (num >= 1e3) return (num / 1e3).toFixed(0) + 'K';
        return num.toLocaleString();
    }

    function estimateMiners(hashrate) {
        // Assuming average modern ASIC miner does ~100 TH/s
        const avgMinerHashrate = 100e12; // 100 TH/s in H/s
        return Math.round(hashrate / avgMinerHashrate);
    }

    async function fetchMinersCount() {
        try {
            // Fetch difficulty to calculate hash rate
            const difficultyResponse = await fetch('https://blockchain.info/q/getdifficulty');
            const difficulty = await difficultyResponse.text();
            
            // Calculate hash rate from difficulty
            const hashrate = parseFloat(difficulty) * Math.pow(2, 32) / 600;
            
            // Estimate number of miners
            const estimatedMiners = estimateMiners(hashrate);
            
            // Update all elements with bitcoin-miners id or class
            const elements = document.querySelectorAll('#bitcoin-miners, .bitcoin-miners');
            elements.forEach(element => {
                element.textContent = formatNumber(estimatedMiners) + '+';
                element.style.color = '#f7931a';
                element.style.fontWeight = 'bold';
                element.title = 'Last updated: ' + new Date().toLocaleString();
            });
            
        } catch (error) {
            console.error('Error fetching miners count:', error);
            const elements = document.querySelectorAll('#bitcoin-miners, .bitcoin-miners');
            elements.forEach(element => {
                element.textContent = '500K+';
                element.style.color = '#f7931a';
                element.style.fontWeight = 'bold';
                element.title = 'Error loading data - showing estimated value';
            });
        }
    }

    // Initialize when DOM is ready
    function initMinersWidget() {
        fetchMinersCount();
        // Update every 5 minutes
        setInterval(fetchMinersCount, 5 * 60 * 1000);
    }

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMinersWidget);
    } else {
        initMinersWidget();
    }
})();
