# Crypto Price CLI

A command-line tool to fetch cryptocurrency prices from the CoinPaprika API.

## Project Structure
```
src/
├── commands/        # Command implementations
│   ├── list.js
│   ├── price.js
│   └── export.js
├── util/         # Configuration and constants
│   └── coins.js
├── services/       # Business logic and API calls
│   └── crypto.js
└── index.js        # Entry point
```

## Installation

```bash
# Install dependencies
npm install

# Link the CLI tool globally
npm link
```

## Usage

```bash
# Get basic price information
crypto-price price btc

# Get detailed price information
crypto-price price eth --verbose

# List supported tickers
crypto-price list

# Show help
crypto-price --help
```

## Supported Cryptocurrencies

- BTC (Bitcoin)
- ETH (Ethereum)
- SOL (Solana)
- DOT (Polkadot)
- ADA (Cardano)

## Adding New Cryptocurrencies

To add support for new cryptocurrencies, add their ticker and CoinPaprika ID to the `SUPPORTED_COINS` object in `src/config/coins.js`.

## Known bugs

Resolve jest mocking with crypto service
