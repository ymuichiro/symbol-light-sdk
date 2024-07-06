import crypto from "crypto";

/**
 * Create a random 32-byte Uint8Array for Symbol Blockchain Private Key.
 * @returns {Uint8Array} - A randomly generated 32-byte uint8array.
 */
export function createPrivateKey(): Uint8Array {
  return crypto.randomBytes(32);
}
