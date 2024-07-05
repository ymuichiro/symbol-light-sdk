// @ts-check
import { PrivateKey } from "symbol-sdk";
import { SymbolFacade } from "symbol-sdk/symbol";

const facade = new SymbolFacade("testnet");

const transaction = facade.transactionFactory.create({
  type: "transfer_transaction_v1",
  signerPublicKey: "87DA603E7BE5656C45692D5FC7F6D0EF8F24BB7A5C10ED5FDA8C5CFBC49FCBC8",
  fee: 1000000n,
  deadline: 41998024783n,
  recipientAddress: "TCHBDENCLKEBILBPWP3JPB2XNY64OE7PYHHE32I",
  mosaics: [{ mosaicId: 0x7cdf3b117a3c40ccn, amount: 1000000n }],
});

const serialize = transaction.serialize();

function uint8ArrayToHex(uint8Array) {
  return Array.from(uint8Array)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

console.log(uint8ArrayToHex(serialize));

const privateKey = new PrivateKey("EDB671EB741BD676969D8A035271D1EE5E75DF33278083D877F23615EB839FEC");
const signature = facade.signTransaction(new facade.static.KeyPair(privateKey), transaction);

const jsonPayload = facade.transactionFactory.static.attachSignature(transaction, signature);

console.log(jsonPayload);
