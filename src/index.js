#!/usr/bin/env node
import { Command } from "commander";
import { priceCommand } from "./commands/price.js";
import { listCommand } from "./commands/list.js";
import { exportCommand } from "./commands/export.js";
const program = new Command();

program
  .name("crypto-price")
  .description("Fetch cryptocurrency prices from CoinPaprika API")
  .version("1.0.0");

program.addCommand(priceCommand);
program.addCommand(listCommand);
program.addCommand(exportCommand);

program.parse();
