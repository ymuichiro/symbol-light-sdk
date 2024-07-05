import { generateKeypair, sign } from "./services/keypair";
import { strGenerationHashToUint8Array } from "./services/generationHashSeed";
import { strTransactonSerializedPayloadToUint8Array } from "./services/transaction";

const pair = generateKeypair();

const strGenerationHashSeed = "49D6E1CE276A85B70EAFE52349AACCA389302E7A9754BCF1221E79494FC665A4";
const strSelializedTransaction =
  "b0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000087da603e7be5656c45692d5fc7f6d0ef8f24bb7a5c10ed5fda8c5cfbc49fcbc8000000000198544140420f00000000004f0047c709000000988e1191a25a88142c2fb3f69787576e3dc713efc1ce4de90000010000000000cc403c7a113bdf7c40420f0000000000";

// 文字列で受け取った場合はUint8Arrayに変換する。Uint8Arrayで受け取った場合は、そのまま使う。
const generationHash: Uint8Array = strGenerationHashToUint8Array(strGenerationHashSeed);
const selializedTransaction = strTransactonSerializedPayloadToUint8Array(strSelializedTransaction);

const data = new Uint8Array([...generationHash, ...selializedTransaction]);

const signature = sign(data, pair.secretKey);
console.log(signature);

// static attachSignature(transaction, signature) {
//   transaction.signature = new nc.Signature(signature.bytes);

//   const transactionHex = uint8ToHex(this.toNonVerifiableTransaction(transaction).serialize());
//   const signatureHex = signature.toString();
//   const jsonPayload = `{"data":"${transactionHex}", "signature":"${signatureHex}"}`;
//   return jsonPayload;
// }

function uint8ArrayToHex(uint8Array: Uint8Array) {
  return Array.from(uint8Array)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

const jsonPayload = `{"data":"${strSelializedTransaction}", "signature":"${uint8ArrayToHex(signature)}"}`;

console.log(jsonPayload);
