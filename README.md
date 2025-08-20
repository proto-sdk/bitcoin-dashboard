# Bitcoin Network Statistics Dashboard

A real-time Bitcoin network statistics dashboard displaying live blockchain metrics and mining data with customizable energy cost tracking.

## 🚀 Features

- 📊 **Real-time Bitcoin price** and market cap
- ⚡ **Network hash rate** (EH/s) 
- 🎯 **Current mining difficulty**
- 🧱 **Latest block height**
- ⛏️ **Daily mining revenue** and annualized projections
- ⚡ **Local energy cost tracking** (customizable)
- 🔄 **Auto-refresh every 5 minutes**
- 📱 **Responsive design** for all devices
- 🎨 **Modern dark theme** with Bitcoin-inspired styling

## 📈 Live Dashboard

**View the live dashboard:** [https://proto-sdk.github.io/bitcoin-dashboard](https://proto-sdk.github.io/bitcoin-dashboard)

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

## ⚡ Setting Up Local Energy Cost Tracking

To enable personalized energy cost tracking for mining profitability:

### 🌍 Multi-User Configuration

**Multiple users can configure this dashboard to view their local energy costs!** Each user creates their own personalized version:

#### **Option 1: Fork & Customize (Recommended)**
Each user gets their own live dashboard:

1. **Fork the repository:**
   - Go to https://github.com/proto-sdk/bitcoin-dashboard
   - Click "Fork" to create your own copy
   - You get: `yourusername.github.io/bitcoin-dashboard`

2. **Configure your energy costs:**
   - Edit your `index.html` file
   - Add your EIA API key
   - Set your state code (CA, TX, NY, etc.)
   - Enable GitHub Pages in your fork settings

3. **Result:** Your own live dashboard with your local energy costs

#### **Option 2: Download & Host Locally**
Run it on your own computer/server:
```bash
git clone https://github.com/proto-sdk/bitcoin-dashboard.git
cd bitcoin-dashboard
# Edit index.html with your energy settings
# Open in browser or host on your server
```

#### **Option 3: Multiple Configurations**
Advanced users can create multiple versions:
- `bitcoin-dashboard-california` (CA energy costs)
- `bitcoin-dashboard-texas` (TX energy costs)
- `bitcoin-dashboard-newyork` (NY energy costs)

### 📊 Example Multi-User Scenario:

**Alice (California):**
- Forks repo → `alice.github.io/bitcoin-dashboard`
- Sets: `stateCode = 'CA'`, `eiaApiKey = 'alice_key'`
- Sees: California energy costs (~$0.25/kWh)

**Bob (Texas):**
- Forks repo → `bob.github.io/bitcoin-dashboard`
- Sets: `stateCode = 'TX'`, `eiaApiKey = 'bob_key'`
- Sees: Texas energy costs (~$0.12/kWh)

**Carol (New York):**
- Forks repo → `carol.github.io/bitcoin-dashboard`
- Sets: `stateCode = 'NY'`, `eiaApiKey = 'carol_key'`
- Sees: New York energy costs (~$0.18/kWh)

### 🔒 Privacy & Security:
- ✅ **Each user's API key** stays in their own fork
- ✅ **No central database** - everything is client-side
- ✅ **No data sharing** between users
- ✅ **Complete control** over your own version

### Step 1: Get an EIA API Key
1. Visit [https://www.eia.gov/opendata/](https://www.eia.gov/opendata/)
2. Click "Register" and create a free account
3. Copy your API key (starts with a long string of characters)

### Step 2: Configure Your Dashboard
1. **If using your own fork:** Edit `index.html` in your repository
2. **If hosting locally:** Edit your local `index.html` file

### Step 3: Update the Energy Cost Code
Find this section in `index.html` (around line 400):

```javascript
// Add placeholder link for energy cost setup
document.getElementById('energyCost').innerHTML = '<a href="https://github.com/proto-sdk/bitcoin-dashboard#setting-up-energy-cost-data" style="color: inherit; text-decoration: underline;">Setup Required</a>';
```

Replace it with:

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
- **Blockstream API** - Current block height
- **U.S. EIA API** - Energy cost data (optional, requires setup)

## 🛠 Technical Details

- **Pure HTML/CSS/JavaScript** - No frameworks required
- **Multiple API sources** for reliability
- **Error handling** and fallback states
- **Responsive grid layout**
- **Auto-refresh mechanism**
- **Modern glassmorphism design**
- **CORS-friendly APIs** for client-side requests

## 📱 Mobile Responsive

The dashboard automatically adapts to different screen sizes:
- **Desktop:** 3-column grid layout
- **Tablet:** 2-column grid layout  
- **Mobile:** Single column layout

## 🎨 Customization Options

You can easily customize:
- **Colors:** Modify CSS color variables
- **Refresh rate:** Change `setInterval` timing
- **Data sources:** Update API endpoints
- **Layout:** Adjust grid columns and card order
- **Metrics:** Add or remove statistics cards

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

**Perfect for:** Research papers, presentations, websites, trading analysis, mining profitability calculations, and any content requiring real-time Bitcoin network statistics with personalized energy cost tracking.
