// import { fetchPrice, writeFile } from '../../src/services/crypto.js';
// import { jest, describe, it, expect } from '@jest/globals';

// import fs from 'fs';

// // Mock node-fetch and fs
// jest.mock('fs');

// describe('fetchPrice', () => {
//   beforeEach(() => {
//     // Clear all instances and calls to constructor and all methods:
//     fetch.mockClear();
//   });

//   it('should fetch the price for a supported ticker', async () => {
//     const mockData = {
//       quotes: {
//         USD: {
//           price: 50000,
//           percent_change_24h: 5,
//           volume_24h: 1000000
//         }
//       }
//     };
//     fetch.mockResolvedValueOnce({
//       ok: true,
//       json: () => Promise.resolve(mockData),
//     });

//     const result = await fetchPrice('btc');
//     expect(result).toEqual({
//       price: 50000,
//       change24h: 5,
//       volume24h: 1000000
//     });
//     expect(fetch).toHaveBeenCalledWith('https://api.coinpaprika.com/v1/tickers/bitcoin');
//   });

//   it('should throw an error for an unsupported ticker', async () => {
//     await expect(fetchPrice('unsupported'))
//       .rejects
//       .toThrow('Unsupported ticker: unsupported. Available tickers: btc, eth');
//   });

//   it('should throw an error if the API request fails', async () => {
//     fetch.mockResolvedValueOnce({
//       ok: false,
//       status: 404,
//     });

//     await expect(fetchPrice('btc'))
//       .rejects
//       .toThrow('API request failed with status: 404');
//   });
// });

// describe('writeFile', () => {
//   it('should write data to a file', () => {
//     const data = "test data";
//     writeFile(data);
//     expect(fs.writeFileSync).toHaveBeenCalledWith('crypto-data.txt', data);
//   });

//   it('should log an error if writing to the file fails', () => {
//     const consoleSpy = jest.spyOn(console, 'log');
//     fs.writeFileSync.mockImplementationOnce(() => {
//       throw new Error('File write error');
//     });

//     writeFile("test data");
//     expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
//   });
// });