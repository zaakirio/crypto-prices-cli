import { Command } from "commander";
import { fetchPrice } from "../services/crypto.js";

export const priceCommand = new Command()
  .name("price")
  .description("Get the current price of a cryptocurrency")
  .argument("<ticker>", "cryptocurrency ticker (e.g., BTC, ETH)")
  .option("-v, --verbose", "show additional details")
  .action(handlePrice);

export async function handlePrice(ticker, options) {
  try {
    const data = await fetchPrice(ticker);
    return displayPriceInfo(ticker, data, options.verbose);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

function displayPriceInfo(ticker, data, verbose) {
  console.log("Price Information:");
  const priceInfo = `${ticker.toUpperCase()}: ${data.price}`
  console.log(priceInfo);

  if (verbose) {
    const priceVerbose = `24h Change: ${data.change24h}\n24h Volume:Volume: ${data.volume24h}`;
    console.log(priceVerbose)
    return priceInfo + priceVerbose
  }
  return priceInfo
}
