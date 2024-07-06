import nacl from "./services/nacl";
import { createPrivateKey } from "./services/privateKey";
import { strTransactonSerializedPayloadToUint8Array } from "./services/transaction";
import { hexToUint8Array, uint8arrayToHex } from "./services/util";
import { Size } from "./services/config";

export class SymbolKeypair {
  public readonly pair: nacl.SignKeyPair;

  public constructor(privateKey: string | Uint8Array) {
    if (typeof privateKey === "string") {
      this.pair = nacl.sign.keyPair.fromSeed(hexToUint8Array(Size.privateKey, privateKey));
    } else {
      if (privateKey.length !== 32) {
        throw new Error("The input must be a 32-byte (64 characters) hex string.");
      }
      this.pair = nacl.sign.keyPair.fromSeed(privateKey);
    }
  }

  public static createNewKeyPair(): SymbolKeypair {
    return new SymbolKeypair(createPrivateKey());
  }

  public get publicKey(): string {
    return uint8arrayToHex(Size.publicKey, this.pair.publicKey).toUpperCase();
  }

  public get privateKey(): string {
    return uint8arrayToHex(Size.privateKey, this.pair.secretKey).toUpperCase();
  }

  public sign(serializedTransaction: string | Uint8Array, generationHashSeed: string | Uint8Array): string {
    const __generationHashSeed: Uint8Array =
      typeof generationHashSeed === "string"
        ? hexToUint8Array(Size.generationHashSeed, generationHashSeed)
        : generationHashSeed;

    const __serializedTransaction: Uint8Array =
      typeof serializedTransaction === "string"
        ? strTransactonSerializedPayloadToUint8Array(serializedTransaction)
        : serializedTransaction;

    const signed = nacl.sign.detached(
      new Uint8Array([...__generationHashSeed, ...__serializedTransaction]),
      this.pair.secretKey
    );

    return uint8arrayToHex(Size.signature, signed).toUpperCase();
  }

  public static verify(
    serializedTransaction: string | Uint8Array,
    generationHashSeed: string | Uint8Array,
    signature: string | Uint8Array,
    publicKey: string | Uint8Array
  ): boolean {
    const __generationHashSeed: Uint8Array =
      typeof generationHashSeed === "string"
        ? hexToUint8Array(Size.generationHashSeed, generationHashSeed)
        : generationHashSeed;

    const __serializedTransaction: Uint8Array =
      typeof serializedTransaction === "string"
        ? strTransactonSerializedPayloadToUint8Array(serializedTransaction)
        : serializedTransaction;

    const __signature: Uint8Array =
      typeof signature === "string" ? hexToUint8Array(Size.signature, signature) : signature;
    const __publicKey: Uint8Array =
      typeof publicKey === "string" ? hexToUint8Array(Size.publicKey, publicKey) : publicKey;

    return nacl.sign.detached.verify(
      new Uint8Array([...__generationHashSeed, ...__serializedTransaction]),
      __signature,
      __publicKey
    );
  }
}
