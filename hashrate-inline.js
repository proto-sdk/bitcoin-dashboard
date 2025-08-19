// Bitcoin Hash Rate Widget - Inline Text Version
// Usage: <span id="bitcoin-hashrate">Loading...</span><script src="https://proto-sdk.github.io/bitcoin-dashboard/hashrate-inline.js"></script>

(function() {
    function formatHashRate(hashrate) {
        const ehPerSecond = hashrate / 1e18;
        return ehPerSecond.toFixed(0) + '+ EH/s';
    }

    async function fetchHashRate() {
        try {
            // Fetch difficulty to calculate hash rate
            const difficultyResponse = await fetch('https://blockchain.info/q/getdifficulty');
            const difficulty = await difficultyResponse.text();
            
            // Calculate hash rate from difficulty
            const hashrate = parseFloat(difficulty) * Math.pow(2, 32) / 600;
            
            // Update all elements with bitcoin-hashrate id or class
            const elements = document.querySelectorAll('#bitcoin-hashrate, .bitcoin-hashrate');
            elements.forEach(element => {
                element.textContent = formatHashRate(hashrate);
                element.style.color = '#f7931a';
                element.style.fontWeight = 'bold';
                element.title = 'Last updated: ' + new Date().toLocaleString();
            });
            
        } catch (error) {
            console.error('Error fetching hash rate:', error);
            const elements = document.querySelectorAll('#bitcoin-hashrate, .bitcoin-hashrate');
            elements.forEach(element => {
                element.textContent = '500+ EH/s';
                element.style.color = '#f7931a';
                element.style.fontWeight = 'bold';
                element.title = 'Error loading data - showing estimated value';
            });
        }
    }

    // Initialize when DOM is ready
    function initHashRateWidget() {
        fetchHashRate();
        // Update every 5 minutes
        setInterval(fetchHashRate, 5 * 60 * 1000);
    }

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHashRateWidget);
    } else {
        initHashRateWidget();
    }
})();
