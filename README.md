# Symbol SDK Lightweight SDK for Signing Transactions

This is a lightweight SDK for signing transactions on the Symbol blockchain. It provides a simple interface for creating keypairs, signing transactions, and verifying signatures.

## Installation

```
npm install symbol-sdk-lightweight
```

## Usage

Here's a basic example of how to use the SDK:

```javascript
const { SymbolKeypair } = require("symbol-sdk-lightweight");

// Create a keypair from a private key
const privateKey = "EDB671EB741BD676969D8A035271D1EE5E75DF33278083D877F23615EB839FEC";
const keypair = new SymbolKeypair(privateKey);

// Generation hash seed (network specific)
const generationHashSeed = "49D6E1CE276A85B70EAFE52349AACCA389302E7A9754BCF1221E79494FC665A4";

// Serialized transaction (example)
const serializedTransaction = "b0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000087da603e7be5656c45692d5fc7f6d0ef8f24bb7a5c10ed5fda8c5cfbc49fcbc8000000000198544140420f00000000004f0047c709000000988e1191a25a88142c2fb3f69787576e3dc713efc1ce4de90000010000000000cc403c7a113bdf7c40420f0000000000";

// Sign the transaction
const signature = keypair.sign(serializedTransaction, generationHashSeed);
console.log("Signature:", signature);
```

## API Reference

### `SymbolKeypair`

#### Constructor

```typescript
constructor(privateKey: string | Uint8Array)
```

Creates a new `SymbolKeypair` instance from a private key.

#### Static Methods

```typescript
static createNewKeyPair(): SymbolKeypair
```

Creates a new random keypair.

```typescript
static verify(serializedTransaction: string | Uint8Array, generationHashSeed: string | Uint8Array, signature: string | Uint8Array, publicKey: string | Uint8Array): boolean
```

Verifies a signature for a given transaction.

#### Instance Properties

```typescript
get publicKey(): string
```

Returns the public key as a hexadecimal string.

```typescript
get privateKey(): string
```

Returns the private key as a hexadecimal string.

#### Instance Methods

```typescript
sign(serializedTransaction: string | Uint8Array, generationHashSeed: string | Uint8Array): string
```

Signs a serialized transaction using the keypair's private key and the network's generation hash seed.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

