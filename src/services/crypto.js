import { SUPPORTED_COINS } from "../util/coins.js";
import fs from "fs";

export async function fetchPrice(ticker) {
  const coinId = SUPPORTED_COINS[ticker.toLowerCase()];
  if (!coinId) {
    throw new Error(
      `Unsupported ticker: ${ticker}. Available tickers: ${Object.keys(SUPPORTED_COINS).join(", ")}`,
    );
  }

//   const response = await fetch(process.env.API_BASE_URL + coinId);
const response = await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`);

  if (!response.ok) {
    throw new Error(`API request failed with status: ${response.status}`);
  }

  const data = await response.json();
  return {
    price: data.quotes.USD.price,
    change24h: data.quotes.USD.percent_change_24h,
    volume24h: data.quotes.USD.volume_24h,
  };
}

export async function writeFile(data) {
  try {
    fs.writeFileSync("crypto-data.txt", JSON.stringify(data));
    console.log("Current price logged!");
  } catch (e) {
    console.log(e);
  }
}
