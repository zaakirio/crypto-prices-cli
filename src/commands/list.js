import { Command } from "commander";
import { SUPPORTED_COINS } from "../util/coins.js";

export const listCommand = new Command("list")
  .description("List all supported cryptocurrency tickers")
  .action(handleList);

function handleList() {
  console.log("Supported Tickers:\n------------------");

  Object.entries(SUPPORTED_COINS).forEach(([ticker, coinId]) => {
    console.log(`${ticker.toUpperCase()} (${coinId})`);
  });
}
