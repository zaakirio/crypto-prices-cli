// import { jest } from "@jest/globals";
import { exec } from "child_process";
import { promisify } from "util";
import { jest, describe, it, expect } from '@jest/globals';

const execAsync = promisify(exec);

describe("export command", () => {
  it("export  information", async () => {
    const { stdout } = await execAsync("node src/index.js export btc");
    expect(stdout).toContain("Price Information");
  });

  it("displays verbose information when flag is used", async () => {
    const { stdout } = await execAsync("node src/index.js export btc --verbose");
    expect(stdout).toContain("24h Change");
    expect(stdout).toContain("24h Volume");
  });
});
