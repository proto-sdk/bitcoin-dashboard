# Embedding Bitcoin Dashboard in Stoplight Studio

Stoplight Studio is an API documentation platform that supports Markdown content. Here are several ways to embed your Bitcoin dashboard:

## Method 1: Markdown with JavaScript Widget (Best)

```markdown
# Bitcoin Network Statistics

<div id="bitcoin-stats"></div>
<script src="https://proto-btc-dashboard.github.io/widget.js"></script>

The live data above shows current Bitcoin network metrics including hash rate (~500+ EH/s) and estimated active miners (~500,000+ devices).
```

## Method 2: Direct Link with Preview

```markdown
# Bitcoin Network Statistics

[![Bitcoin Dashboard Preview](https://via.placeholder.com/600x300/1a1a2e/f7931a?text=Bitcoin+Network+Dashboard)](https://proto-btc-dashboard.github.io)

**[📊 View Live Bitcoin Network Statistics →](https://proto-btc-dashboard.github.io)**

Current network metrics:
- **Hash Rate:** ~500+ EH/s
- **Estimated Miners:** ~500,000+ devices  
- **Real-time price and blockchain data**
```

## Method 3: HTML Embed (if Stoplight supports HTML)

```html
<div style="width: 100%; height: 600px; border: 1px solid #ddd; border-radius: 8px;">
  <iframe src="https://proto-btc-dashboard.github.io" 
          width="100%" 
          height="600px" 
          frameborder="0"
          style="border-radius: 8px;">
  </iframe>
</div>
```

## Method 4: API Integration

If Stoplight supports dynamic content, you can create an API endpoint:

```yaml
# In your OpenAPI spec
paths:
  /bitcoin-stats:
    get:
      summary: Get Bitcoin Network Statistics
      responses:
        '200':
          description: Current Bitcoin network metrics
          content:
            application/json:
              schema:
                type: object
                properties:
                  price:
                    type: number
                    example: 95000
                  hashRate:
                    type: string
                    example: "500.25 EH/s"
                  estimatedMiners:
                    type: string
                    example: "500,250"
                  blockHeight:
                    type: integer
                    example: 870000
```

## Method 5: Compact Widget

```markdown
# Bitcoin Stats

<object data="https://proto-btc-dashboard.github.io/compact.html" 
        width="100%" 
        height="200px" 
        type="text/html">
  <a href="https://proto-btc-dashboard.github.io">View Bitcoin Stats</a>
</object>
```

## Method 6: Static Data Table (Fallback)

```markdown
# Bitcoin Network Statistics

| Metric | Current Value | Description |
|--------|---------------|-------------|
| **Price** | $95,000+ | Current USD price |
| **Hash Rate** | ~500 EH/s | Network computational power |
| **Difficulty** | ~95T | Current mining difficulty |
| **Block Height** | 870,000+ | Latest block number |
| **Est. Miners** | ~500,000 | Active mining devices |
| **Market Cap** | $1.9T+ | Total market capitalization |

*[📊 View live dashboard for real-time updates →](https://proto-btc-dashboard.github.io)*
```

## Stoplight-Specific Tips

1. **Test in Preview Mode:** Use Stoplight's preview to see which methods work
2. **Use Markdown Extensions:** Stoplight may support additional Markdown features
3. **Check HTML Support:** Some Stoplight plans allow HTML in documentation
4. **API Integration:** Consider adding the dashboard as part of your API documentation

## Recommended Approach for Stoplight

Start with **Method 1 (JavaScript Widget)** as it's most likely to work in Stoplight's Markdown renderer. If that doesn't work, fall back to **Method 2 (Direct Link)** which will definitely work.

## Testing

To test which method works best in your Stoplight environment:

1. Create a test page in Stoplight
2. Try Method 1 first
3. If JavaScript doesn't execute, use Method 2
4. For API documentation, consider Method 4

The goal is to show: "As of [current date], Bitcoin network hash rate is ~500+ EH/s with ~500,000+ estimated active miners" with live updating data.
