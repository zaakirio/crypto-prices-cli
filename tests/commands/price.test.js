import { Command } from "commander";
// import { fetchPrice } from "../../src/services/crypto.js";
// import { handlePrice, priceCommand } from "../../src/commands/price.js";
import { displayPriceInfo } from "../../src/util/displayPriceInfo.js";
import { jest, describe, it, expect } from '@jest/globals';

jest.unstable_mockModule("../../src/services/crypto.js", () => ({
  fetchPrice: jest.fn(),
}));
const { fetchPrice } = await import("../../src/services/crypto.js");
const  { handlePrice } = await import("../../src/commands/price.js");

process.exit = jest.fn();
console.log = jest.fn();
console.error = jest.fn();

describe("priceCommand", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("should fetch and display price information without verbose option", async () => {
    
    const mockData = { price: 50000, change24h: 0.5, volume24h: 1000000 };
    fetchPrice.mockResolvedValue(mockData);

    await handlePrice("BTC", { verbose: false });

    expect(fetchPrice).toHaveBeenCalledWith("BTC");
    expect(console.log).toHaveBeenCalledWith("Price Information:");
    expect(console.log).toHaveBeenCalledWith("BTC: 50000");
    expect(console.log).not.toHaveBeenCalledWith("24h Change: 0.5\n24h Volume: 1000000");
  });

  it("should fetch and display price information with verbose option", async () => {
    const mockData = { price: 50000, change24h: 0.5, volume24h: 1000000 };
    fetchPrice.mockResolvedValue(mockData);

    await handlePrice("BTC", { verbose: true });

    expect(fetchPrice).toHaveBeenCalledWith("BTC");
    expect(console.log).toHaveBeenCalledWith("Price Information:");
    expect(console.log).toHaveBeenCalledWith("BTC: 50000");
    expect(console.log).toHaveBeenCalledWith("24h Change: 0.5\n24h Volume: 1000000");
  });

  it("should handle errors and log them", async () => {
    const mockError = new Error("Failed to fetch price");
    fetchPrice.mockRejectedValue(mockError);

    await handlePrice("BTC", { verbose: false });

    expect(fetchPrice).toHaveBeenCalledWith("BTC");
    expect(console.error).toHaveBeenCalledWith("Error: Failed to fetch price");
  });

  it("should return the correct price information without verbose", () => {
    const mockData = { price: 50000, change24h: 0.5, volume24h: 1000000 };
    const result = displayPriceInfo("BTC", mockData, false);

    expect(result).toBe("BTC: 50000");
  });

  it("should return the correct price information with verbose", () => {
    const mockData = { price: 50000, change24h: 0.5, volume24h: 1000000 };
    const result = displayPriceInfo("BTC", mockData, true);

    expect(result).toBe("BTC: 5000024h Change: 0.5\n24h Volume: 1000000");
  });
});