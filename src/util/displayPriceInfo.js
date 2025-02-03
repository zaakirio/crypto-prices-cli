export function displayPriceInfo(ticker, data, verbose) {
    console.log("Price Information:");
    const priceInfo = `${ticker.toUpperCase()}: ${data.price}`
    console.log(priceInfo);
  
    if (verbose) {
      const priceVerbose = `24h Change: ${data.change24h}\n24h Volume: ${data.volume24h}`;
      console.log(priceVerbose)
      return priceInfo + priceVerbose
    }
    return priceInfo
  }