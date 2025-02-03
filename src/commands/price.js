import { Command } from "commander";
import { fetchPrice } from "../services/crypto.js";
import { displayPriceInfo } from "../util/displayPriceInfo.js";

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


