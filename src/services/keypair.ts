import nacl from "tweetnacl";

export function generateKeypair() {
  // 内部の動作
  // crypto.randomBytes(32); にてランダムな32バイトのバイナリデータを生成
  // nacl.box.keyPair = function() {
  //   var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
  //   var sk = new Uint8Array(crypto_box_SECRETKEYBYTES);
  //   crypto_box_keypair(pk, sk);
  //   return {publicKey: pk, secretKey: sk};
  // };
  // 公開鍵は crypto_scalarmult にて ed25519 の公開鍵を生成
  return nacl.sign.keyPair();
}

export function sign(message: Uint8Array, secretKey: Uint8Array) {
  // 内部の動作
  // nacl.sign.detached = function(msg, secretKey) {
  //   var signedMsg = nacl.sign(msg, secretKey);
  //   var sig = new Uint8Array(crypto_sign_BYTES);
  //   for (var i = 0; i < sig.length; i++) sig[i] = signedMsg[i];
  //   return sig;
  // };
  return nacl.sign.detached(message, secretKey);
}
