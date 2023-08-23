// Helper class Help
export default class Help {
    // Method for generating a random string of a given length
    // Used for generating a random secret key for encrypting a note
    static randomKey(length) {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const randomValues = new Uint8Array(length);
        window.crypto.getRandomValues(randomValues);

        let result = "";

        for (let i = 0; i < length; i++) {
            const randomIndex = randomValues[i] % charset.length;
            result += charset.charAt(randomIndex);
        }

        return result;
    }

    // Static method to filter language based on selected code
    static filterLang = (lang, selected_code) => lang.code === selected_code;
}
