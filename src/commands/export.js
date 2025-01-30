import { Command } from "commander";
import { fetchPrice, writeFile } from "../services/crypto.js";
import {handlePrice} from "../commands/price.js"

export const exportCommand = new Command()
  .name("export")
  .description("Export current price of currency to .csv file")
  .argument("<ticker>", "cryptocurrency ticker (e.g., BTC, ETH)")
  .option("-v, --verbose", "show additional details")
  .action(handleExport);

async function handleExport(ticker,options) {
  try {
    const data = await handlePrice(ticker,options);
    writeFile(data);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
