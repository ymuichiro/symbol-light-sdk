export function uint8arrayToHex(size: number, uint8Array: Uint8Array): string {
  if (uint8Array.length !== size) {
    throw new Error(`The input must be a ${size}-byte Uint8Array.`);
  }

  return Array.from(uint8Array)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function hexToUint8Array(size: number, hex: string): Uint8Array {
  if (hex.length !== size * 2) {
    throw new Error(`The input must be a ${size}-byte (${size * 2} characters) hex string.`);
  }

  // Ensure the string contains only hexadecimal characters
  if (!/^[0-9A-Fa-f]+$/.test(hex)) {
    throw new Error("The input must consist of hexadecimal characters (0-9, A-F).");
  }

  // Convert the hex string to a Uint8Array
  const uint8Array: Uint8Array = new Uint8Array(size);
  for (let i = 0; i < 64; i += 2) {
    uint8Array[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }

  return uint8Array;
}
