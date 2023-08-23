// Server errors corresponding to possible server response codes
// If not present in the list, the server response code will be displayed
export const serverErrors = {
    404: 'error_404',
    429: 'error_429',
    500: 'error_500',
    422: 'error_422',
    'decrypt': 'error_decrypt',
};

// Errors occurring during note creation form submission
export const clientErrors = {
    passwordMismatch: 'error_password_mismatch',
    passwordLength: 'error_password_length',
    noteMaxLength: 'error_note_length',
};
