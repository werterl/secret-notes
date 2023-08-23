import CryptoJS from "crypto-js";

// NoteCrypto class for working with AES encryption and decryption of notes
// Library https://github.com/brix/crypto-js
export default class NoteCrypto {
    #body; // Note content
    #secret_key; // Secret key for encryption/decryption

    constructor(body, secret_key) {
        this.#body = body;
        this.#secret_key = secret_key;
    }

    // Method for encryption
    // Returns a base64 encoded string
    // Throws an exception if the body or secret key is missing
    encrypt() {
        if (this.#body && this.#secret_key) {
            return CryptoJS.AES.encrypt(this.#body, this.#secret_key).toString();
        } else {
            throw new Error('Missing body or secret key for encryption.');
        }
    }

    // Method for decryption
    // The body should contain a base64 encoded string
    decrypt() {
        if (this.#body && this.#secret_key) {
            return CryptoJS.AES.decrypt(this.#body, this.#secret_key).toString(CryptoJS.enc.Utf8);
        } else {
            throw new Error('Invalid data or missing secret key for decryption.');
        }
    }
}
