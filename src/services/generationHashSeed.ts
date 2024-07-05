/**
 * Checks if the input string is a valid generationHashSeed and convert to Uint8Array.
 * A generationHashSeed is a 32-byte Hex string.
 *
 * @param {string} hexString - The input string to be validated and converted.
 * @returns {Uint8Array} - The resulting Uint8Array converted from the hex string.
 * @throws {Error} - Throws an error if the input is not a 32-byte (64 characters) hex string.
 */
export function strGenerationHashToUint8Array(hexString: string): Uint8Array {
  // Ensure the input is 32 bytes (64 characters)
  if (hexString.length !== 64) {
    throw new Error("The input must be a 32-byte (64 characters) hex string.");
  }

  // Ensure the string contains only hexadecimal characters
  if (!/^[0-9A-Fa-f]+$/.test(hexString)) {
    throw new Error("The input must consist of hexadecimal characters (0-9, A-F).");
  }

  // Convert the hex string to a Uint8Array
  const uint8Array: Uint8Array = new Uint8Array(32);
  for (let i = 0; i < 64; i += 2) {
    uint8Array[i / 2] = parseInt(hexString.slice(i, i + 2), 16);
  }

  return uint8Array;
}
