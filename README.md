# Bitcoin Network Statistics Dashboard

A real-time Bitcoin network statistics dashboard displaying live blockchain metrics and mining data.

## 🚀 Features

- 📊 **Real-time Bitcoin price** and market cap
- ⚡ **Network hash rate** (EH/s) 
- 🎯 **Current mining difficulty**
- 🧱 **Latest block height**
- ⛏️ **Estimated active miners** (calculated from network hash rate)
- ⚡ **Local energy cost data** (optional setup required)
- 🔄 **Auto-refresh every 5 minutes**
- 📱 **Responsive design** for all devices
- 🎨 **Modern dark theme** with Bitcoin-inspired styling

## 📈 Live Dashboard

**View the live dashboard:** [https://proto-sdk.github.io/bitcoin-dashboard](https://proto-sdk.github.io/bitcoin-dashboard)

## 🔗 Data Sources

- **CoinGecko API** - Bitcoin price and market cap data
- **Mempool.space API** - Network statistics
- **Blockstream API** - Current block height
- **U.S. EIA API** - Energy cost data (optional)

## Setting Up Energy Cost Data

To enable the local energy cost feature:

1. Sign up for an API key from the U.S. Energy Information Administration (EIA) at: https://www.eia.gov/opendata/
2. Open `index.html` and locate the energy cost API section
3. Replace `'YOUR_EIA_API_KEY'` with your actual API key
4. Update the `stateCode` variable to match your state (e.g., 'CA' for California)

Example configuration:
```javascript
const eiaApiKey = 'your-actual-api-key';
const stateCode = 'CA'; // Replace with your state code
```

## 📱 Mobile Responsive

The dashboard automatically adapts to different screen sizes:
- Desktop: 3-column grid layout
- Tablet: 2-column grid layout  
- Mobile: Single column layout

## 🛠 Technical Details

- **Pure HTML/CSS/JavaScript** - No frameworks required
- **Multiple API sources** for reliability
- **Error handling** and fallback states
- **Responsive grid layout**
- **Auto-refresh mechanism**
- **Modern glassmorphism design**

## 📝 Embedding in Markdown

To embed this dashboard in your markdown documents:

```markdown
## Bitcoin Network Statistics

<iframe src="https://proto-sdk.github.io/bitcoin-dashboard" 
        width="100%" 
        height="600px" 
        frameborder="0"
        style="border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
</iframe>
```

## 📄 License

MIT License - Feel free to use and modify as needed.

---

**Perfect for:** Research papers, presentations, websites, and any content requiring real-time Bitcoin network statistics.
