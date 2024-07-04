import { generateKeypair, sign } from "./services/keypair";

const pair = generateKeypair();
console.log(pair);

// 実際には selializedTransaction を Uint8Array に変換して渡す
const signed = sign(new Uint8Array([1, 2, 3]), pair.secretKey);
console.log(signed);
