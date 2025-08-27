# Bitcoin Network Statistics Dashboard

A real-time Bitcoin network statistics dashboard displaying live blockchain metrics and mining profitability data with customizable energy cost tracking.

## 🚀 Features

- ⚡ **Local Energy Cost Tracking** - Configure your local energy cost per kWh
- 📊 **Bitcoin Price** - Real-time price in USD from CoinGecko
- ⚡ **Network Hash Rate** - Total computational power of the Bitcoin network
- 🎯 **Mining Difficulty** - Current network difficulty (adjusts every 2,016 blocks)
- 🧱 **Block Height** - Latest block number in the blockchain
- 🏆 **Block Reward** - Current block reward in BTC
- 💡 **Break-even Electricity Price** - Maximum profitable electricity rate for your hardware
- 🎰 **Pool Luck/Performance** - Your mining pool's performance vs expected
- ⏰ **Time-of-Use Electricity Rates** - Current rate based on peak/off-peak schedule
- ⏱️ **Block Interval** - Average time between blocks in seconds
- 🎲 **Mining Probability** - Probability of finding a valid block per hash attempt
- 🔢 **Hashes to Win** - Average number of hashes needed to find a block
- 🔄 **Auto-refresh every 5 minutes**
- ⏱️ **Real-time update counter**
- 📱 **Responsive design** for all devices
- 🎨 **Modern dark theme** with orange accent borders

## 📈 Live Dashboard

**View the live dashboard:** [https://proto-sdk.github.io/bitcoin-dashboard](https://proto-sdk.github.io/bitcoin-dashboard)

## 📊 Dashboard Cards

The dashboard displays 12 key Bitcoin network statistics:

### Core Network Metrics
1. **Bitcoin Price (USD)** - Current market price from CoinGecko
2. **Network Hash Rate** - Total computational power securing the network (EH/s)
3. **Mining Difficulty** - Current difficulty adjustment (updates every 2,016 blocks)
4. **Current Block Height** - Latest block number on the blockchain

### Mining Statistics
5. **Block Reward** - Current block reward in BTC (includes halvings)
6. **Interval** - Average time between blocks in seconds
7. **Probability** - Probability of finding a valid block per hash attempt
8. **Hashes to Win** - Average number of hashes needed to find a block

### Mining Operator Tools (Configurable)
9. **Local Energy Cost (kWh)** - Your local electricity rate for profitability calculations
10. **Break-even Electricity Price** - Maximum electricity cost where mining remains profitable
11. **Pool Luck/Performance** - Your pool's 24h performance (100% = expected)
12. **Time-of-Use Rate** - Current electricity rate based on peak/off-peak schedule

## 🎮 Navigation

The dashboard includes navigation tabs in the top-right corner:
- **Dashboard** - Main statistics view
- **GitHub** - Link to the repository
- **Setup** - Configuration instructions
- **Refresh Data** - Manual data refresh

## 🔧 How to Use This Dashboard

### Option 1: Use the Live Version
Simply visit [https://proto-sdk.github.io/bitcoin-dashboard](https://proto-sdk.github.io/bitcoin-dashboard) to view real-time Bitcoin network statistics.

### Option 2: Fork and Customize Your Own
This is an **open-source project** under MIT License. You can:

1. **Fork the repository:**
   - Go to [https://github.com/proto-sdk/bitcoin-dashboard](https://github.com/proto-sdk/bitcoin-dashboard)
   - Click "Fork" to create your own copy
   - Enable GitHub Pages in your fork's settings

2. **Download and host locally:**
   ```bash
   git clone https://github.com/proto-sdk/bitcoin-dashboard.git
   cd bitcoin-dashboard
   # Open index.html in your browser or serve with any web server
   ```

3. **Embed in your website:**
   ```html
   <iframe src="https://proto-sdk.github.io/bitcoin-dashboard" 
           width="100%" height="600px" frameborder="0">
   </iframe>
   ```

## ⚡ Configuring Mining Operator Tools

### Break-even Electricity Price
Click the card to configure your miner's efficiency (W/TH):
- **S19 XP**: 21.5 W/TH
- **S19j Pro**: 29.5 W/TH
- **S19**: 34.5 W/TH
- **S9**: 98 W/TH

The dashboard will calculate the maximum electricity price where your mining operation remains profitable based on current BTC price and network difficulty.

### Pool Luck/Performance
Click to enter your mining pool name. The dashboard will display your pool's performance:
- **>105%**: Lucky (green) - Finding more blocks than expected
- **95-105%**: Normal (white) - Expected performance
- **<95%**: Unlucky (red) - Finding fewer blocks than expected

### Time-of-Use Electricity Rates
Configure your peak and off-peak electricity schedule in JSON format:
```json
{
  "peak": {"start": 16, "end": 21, "rate": 0.15},
  "offPeak": {"rate": 0.08}
}
```
The dashboard will automatically display the current rate based on your local time.

## ⚡ Setting Up Local Energy Cost Tracking

To enable personalized energy cost tracking for mining profitability:

### Step 1: Get a Free EIA API Key
1. Visit [EIA API Registration](https://www.eia.gov/opendata/register.php)
2. Register for a free account
3. Get your API key from the dashboard

### Step 2: Find Your State Code
Look up your state's abbreviation:
- `CA` - California
- `TX` - Texas  
- `NY` - New York
- `FL` - Florida
- [Full list of state codes](https://www.eia.gov/state/)

### Step 3: Update the Code
In `index.html`, find the energy cost section and replace:

```javascript
// Fetch local energy cost data using the Energy Information Administration (EIA) API
try {
    const eiaApiKey = 'YOUR_EIA_API_KEY_HERE'; // Replace with your actual API key
    const stateCode = 'CA'; // Replace with your state code (e.g., 'TX', 'NY', 'FL')
    const eiaResponse = await fetch(`https://api.eia.gov/v2/electricity/retail-sales/data/?api_key=${eiaApiKey}&frequency=monthly&data[0]=price&facets[state][]=${stateCode}&sort[0][column]=period&sort[0][direction]=desc&length=1`);
    const eiaData = await eiaResponse.json();
    
    if (eiaData.response.data.length > 0) {
        const latestPrice = eiaData.response.data[0].price;
        document.getElementById('energyCost').textContent = `$${latestPrice.toFixed(3)}`;
    } else {
        document.getElementById('energyCost').textContent = 'N/A';
    }
} catch (energyError) {
    console.error('Error fetching energy cost data:', energyError);
    document.getElementById('energyCost').textContent = 'Error';
}
```

### Step 4: Configure Your Location
Update these values in the code above:
- `YOUR_EIA_API_KEY_HERE`: Your actual EIA API key
- `CA`: Your state code (e.g., `TX` for Texas, `NY` for New York, `FL` for Florida)

### Step 5: Save and Deploy
- **GitHub Pages:** Commit and push your changes
- **Local hosting:** Save the file and refresh your browser

## 🌍 State Codes for Energy Data

Common US state codes for the EIA API:
- `CA` - California
- `TX` - Texas  
- `NY` - New York
- `FL` - Florida
- `WA` - Washington
- `OR` - Oregon
- `NV` - Nevada
- `MT` - Montana
- `WY` - Wyoming

[Full list of state codes](https://www.eia.gov/state/)

## 🔗 Data Sources

- **CoinGecko API** - Bitcoin price and market cap data
- **Mempool.space API** - Network statistics and difficulty
- **Blockchain.info API** - Block reward, interval, probability, and hashes to win data
- **Blockstream API** - Current block height
- **U.S. EIA API** - Energy cost data (optional, requires setup)

## 🛠 Technical Details

- **Pure HTML/CSS/JavaScript** - No frameworks required
- **Multiple API sources** for reliability
- **Error handling** and fallback states
- **Responsive grid layout**
- **Auto-refresh mechanism** every 5 minutes
- **Real-time update counter** showing time since last refresh
- **Local storage** for persistent configuration
- **Modern glassmorphism design** with dark theme
- **CORS-friendly APIs** for client-side requests

## 📱 Mobile Responsive

The dashboard automatically adapts to different screen sizes:
- **Desktop:** 3-4 column grid layout
- **Tablet:** 2-column grid layout  
- **Mobile:** Single column layout

## 🎨 Customization Options

You can easily customize:
- **Colors:** Modify CSS color variables and border colors
- **Refresh rate:** Change `setInterval` timing (default: 5 minutes)
- **Data sources:** Update API endpoints
- **Layout:** Adjust grid columns and card order
- **Metrics:** Add or remove statistics cards
- **Mining configurations:** Store your hardware specs locally

## 📄 Open Source License

**MIT License** - You are free to:
- ✅ Use commercially
- ✅ Modify and distribute
- ✅ Include in private projects
- ✅ Sell or include in paid products

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/proto-sdk/bitcoin-dashboard/issues)
- **Discussions:** [GitHub Discussions](https://github.com/proto-sdk/bitcoin-dashboard/discussions)
- **Documentation:** This README and inline code comments

---

**Perfect for:** Mining operators, traders, researchers, presentations, mining profitability analysis, and anyone needing real-time Bitcoin network statistics with personalized mining calculations.
