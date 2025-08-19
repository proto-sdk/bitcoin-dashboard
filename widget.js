// Bitcoin Network Statistics Widget
// Usage: <div id="bitcoin-stats"></div><script src="https://proto-sdk.github.io/bitcoin-dashboard/widget.js"></script>

(function() {
    // Widget styles
    const styles = `
        .bitcoin-widget {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            border-radius: 15px;
            padding: 20px;
            color: white;
            max-width: 800px;
            margin: 20px auto;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .bitcoin-widget h3 {
            color: #f7931a;
            text-align: center;
            margin-bottom: 20px;
            font-size: 1.5em;
        }
        .bitcoin-stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        .bitcoin-stat-item {
            background: rgba(255,255,255,0.1);
            padding: 15px;
            border-radius: 10px;
            text-align: center;
            border: 1px solid rgba(255,255,255,0.1);
        }
        .bitcoin-stat-value {
            font-size: 1.4em;
            font-weight: bold;
            color: #f7931a;
            margin-bottom: 5px;
        }
        .bitcoin-stat-label {
            font-size: 0.9em;
            color: #b0b3b8;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .bitcoin-widget-footer {
            text-align: center;
            margin-top: 15px;
            font-size: 0.8em;
            color: #888;
        }
        .bitcoin-loading {
            color: #3498db;
            font-style: italic;
        }
    `;

    // Add styles to page
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Format numbers
    function formatNumber(num) {
        if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
        if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
        if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
        if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
        return num.toLocaleString();
    }

    function formatHashRate(hashrate) {
        const ehPerSecond = hashrate / 1e18;
        return ehPerSecond.toFixed(2) + ' EH/s';
    }

    function estimateMiners(hashrate) {
        const avgMinerHashrate = 100e12;
        const estimatedMiners = Math.round(hashrate / avgMinerHashrate);
        return formatNumber(estimatedMiners);
    }

    // Create widget HTML
    function createWidget() {
        return `
            <div class="bitcoin-widget">
                <h3>⚡ Bitcoin Network Statistics</h3>
                <div class="bitcoin-stats-grid">
                    <div class="bitcoin-stat-item">
                        <div class="bitcoin-stat-value" id="widget-price">Loading...</div>
                        <div class="bitcoin-stat-label">Price (USD)</div>
                    </div>
                    <div class="bitcoin-stat-item">
                        <div class="bitcoin-stat-value" id="widget-hashrate">Loading...</div>
                        <div class="bitcoin-stat-label">Hash Rate</div>
                    </div>
                    <div class="bitcoin-stat-item">
                        <div class="bitcoin-stat-value" id="widget-miners">Loading...</div>
                        <div class="bitcoin-stat-label">Est. Miners</div>
                    </div>
                    <div class="bitcoin-stat-item">
                        <div class="bitcoin-stat-value" id="widget-blocks">Loading...</div>
                        <div class="bitcoin-stat-label">Block Height</div>
                    </div>
                </div>
                <div class="bitcoin-widget-footer">
                    <span id="widget-updated">Loading...</span> | 
                    <a href="https://proto-sdk.github.io/bitcoin-dashboard" target="_blank" style="color: #f7931a;">View Full Dashboard</a>
                </div>
            </div>
        `;
    }

    // Fetch data
    async function fetchWidgetData() {
        try {
            const [priceResponse, blockResponse, difficultyResponse] = await Promise.all([
                fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'),
                fetch('https://blockstream.info/api/blocks/tip/height'),
                fetch('https://blockchain.info/q/getdifficulty')
            ]);

            const priceData = await priceResponse.json();
            const blockHeight = await blockResponse.text();
            const difficulty = await difficultyResponse.text();

            const hashrate = parseFloat(difficulty) * Math.pow(2, 32) / 600;

            document.getElementById('widget-price').textContent = '$' + parseFloat(priceData.bitcoin.usd).toLocaleString();
            document.getElementById('widget-hashrate').textContent = formatHashRate(hashrate);
            document.getElementById('widget-miners').textContent = estimateMiners(hashrate);
            document.getElementById('widget-blocks').textContent = parseInt(blockHeight).toLocaleString();
            document.getElementById('widget-updated').textContent = 'Updated: ' + new Date().toLocaleTimeString();

        } catch (error) {
            console.error('Widget error:', error);
            document.getElementById('widget-updated').textContent = 'Error loading data';
        }
    }

    // Initialize widget
    function initWidget() {
        const container = document.getElementById('bitcoin-stats') || document.getElementById('bitcoin-widget');
        if (container) {
            container.innerHTML = createWidget();
            fetchWidgetData();
            // Refresh every 5 minutes
            setInterval(fetchWidgetData, 5 * 60 * 1000);
        }
    }

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
})();
