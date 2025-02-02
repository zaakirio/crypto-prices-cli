import { fetchPrice, writeFile } from '../../src/services/crypto.js';
import { SUPPORTED_COINS } from "../../src/util/coins.js";
import { jest, describe, it, expect } from '@jest/globals';
import fs from "fs";
jest.mock("fs")
// Mock the fetch API
global.fetch = jest.fn();

// Mock the fs module
jest.mock("fs", () => ({
    writeFileSync: jest.fn(), // Properly mock fs.writeFileSync
  }));


describe("writeFile", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear all mocks, including fs.writeFileSync
        // console.log = jest.fn(); // Mock console.log to avoid cluttering test output
    });

    it("should write data to a file", async () => {
        const mockData = { price: 50000, change24h: 2.5, volume24h: 1000000000 };

        const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    
        await writeFile(mockData);
        
        expect(fs.writeFileSync).toHaveBeenCalledWith(
          "crypto-data.txt",
          JSON.stringify(mockData)
        );
        expect(consoleSpy).toHaveBeenCalledWith("Current price logged!");
        
        consoleSpy.mockRestore();
    });

    it("should log an error if writing to the file fails", () => {
        const mockError = new Error("File write error");
        fs.writeFileSync("a.txt","test").mockImplementationOnce(() => {
            throw mockError;
        });

        const mockData = { price: 50000, change24h: 2.5, volume24h: 1000000000 };

        writeFile(mockData);
        expect(fs.writeFileSync).toHaveBeenCalledWith(
            "crypto-data.txt",
            JSON.stringify(mockData),
          );
        expect(console.log).toHaveBeenCalledWith(mockError);
    });
});






describe("fetchPrice", () => {
    beforeEach(() => {
        jest.clearAllMocks()
        fetch.mockClear();
    });

    it("should fetch the price for a supported ticker", async () => {
        const mockData = {
            quotes: {
                USD: {
                    price: 50000,
                    percent_change_24h: 2.5,
                    volume_24h: 1000000000,
                },
            },
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockData),
        });

        const ticker = "btc";
        const result = await fetchPrice(ticker);

        expect(fetch).toHaveBeenCalledWith(
            `https://api.coinpaprika.com/v1/tickers/${SUPPORTED_COINS[ticker.toLowerCase()]}`,
        );
        expect(result).toEqual({
            price: mockData.quotes.USD.price,
            change24h: mockData.quotes.USD.percent_change_24h,
            volume24h: mockData.quotes.USD.volume_24h,
        });
    });

    it("should throw an error for an unsupported ticker", async () => {
        const ticker = "unsupported";

        await expect(fetchPrice(ticker)).rejects.toThrow(
            `Unsupported ticker: ${ticker}. Available tickers: ${Object.keys(SUPPORTED_COINS).join(", ")}`,
        );
    });

    it("should throw an error if the API request fails", async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 404,
        });

        const ticker = "btc";

        await expect(fetchPrice(ticker)).rejects.toThrow(
            "API request failed with status: 404",
        );
    });
});