const TRANSACTION_HEADER_SIZE: number = [
  4, // size
  4, // reserved1
  64, // signature size
  32, // signer public key size
  4, // reserved2
].reduce((x, y) => x + y);

const AGGREGATE_HASHED_SIZE: number = [
  4, // version, network, type
  8, // maxFee
  8, // deadline
  32, // transactionsHash size（Hash256.SIZE）
].reduce((x, y) => x + y);

class TransactionType {
  static AGGREGATE_COMPLETE = 16705;
  static AGGREGATE_BONDED = 16961;
}

/**
 * Checks if the given transaction buffer represents an aggregate transaction.
 *
 * @param {Uint8Array} transactionBuffer - The buffer containing the transaction data.
 * @returns {boolean} - Returns true if the transaction is of type AGGREGATE_BONDED or AGGREGATE_COMPLETE, false otherwise.
 */
function isAggregateTransaction(transactionBuffer: Uint8Array): boolean {
  const txTypeOffset: number = TRANSACTION_HEADER_SIZE + 2; // skip version and network byte
  const txType: number = (transactionBuffer[txTypeOffset + 1] << 8) + transactionBuffer[txTypeOffset];
  const aggregateTypes: number[] = [TransactionType.AGGREGATE_BONDED, TransactionType.AGGREGATE_COMPLETE];
  return aggregateTypes.some((aggregateType) => aggregateType === txType);
}

/**
 * Extracts the data buffer from the given transaction buffer.
 *
 * @param {Uint8Array} transactionBuffer - The buffer containing the transaction data.
 * @returns {Uint8Array} - The extracted data buffer.
 */
function transactionDataBuffer(transactionBuffer: Uint8Array): Uint8Array {
  const dataBufferStart: number = TRANSACTION_HEADER_SIZE;
  const dataBufferEnd: number = isAggregateTransaction(transactionBuffer)
    ? TRANSACTION_HEADER_SIZE + AGGREGATE_HASHED_SIZE
    : transactionBuffer.length;

  return transactionBuffer.subarray(dataBufferStart, dataBufferEnd);
}

export function strTransactonSerializedPayloadToUint8Array(hexString: string): Uint8Array {
  // Convert the hex string to a Uint8Array
  const uint8Array: Uint8Array = new Uint8Array(32);
  for (let i = 0; i < 64; i += 2) {
    uint8Array[i / 2] = parseInt(hexString.slice(i, i + 2), 16);
  }
  return transactionDataBuffer(uint8Array);
}
