import NoteCrypto from "../../modules/crypto";

describe('NoteCrypto class test', () => {
    const secretKey = '7hyuFHk@0';
    const bodyText = 'bodyText';

    it('should encrypt/decrypt correctly', () => {
        const bodyEncrypt = new NoteCrypto(bodyText, secretKey).encrypt();
        const bodyDecrypt = new NoteCrypto(bodyEncrypt, secretKey).decrypt();
        expect(bodyDecrypt).toEqual(bodyText);
    });

    it('should throw an error for missing body', () => {
        const noteWithMissingBody = new NoteCrypto(null, secretKey);
        expect(() => noteWithMissingBody.encrypt()).toThrowError('Missing body or secret key for encryption.');
        expect(() => noteWithMissingBody.decrypt()).toThrowError('Invalid data or missing secret key for decryption.');
    });

    it('should throw an error for missing secret key', () => {
        const noteWithMissingKey = new NoteCrypto(bodyText, null);
        expect(() => noteWithMissingKey.encrypt()).toThrowError('Missing body or secret key for encryption.');
        expect(() => noteWithMissingKey.decrypt()).toThrowError('Invalid data or missing secret key for decryption.');
    });
});
