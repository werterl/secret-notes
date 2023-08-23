<?php


namespace App\Enums;


enum ErrorEnum:string
{
    // Error code for note creation failure
    case NOTE_CREATE = 'error_note_create';

    // Error code for note removal failure
    case NOTE_DESTROY = 'error_note_remove';

    // Error code for email_report_sent update failure
    case NOTE_EMAIL_REPORT_UPDATE = 'error_note_report';

    // Error code for access to a note failure (incorrect delete_token)
    case ACCESS_NOTE = 'error_access_note';

    // Error code for general server errors
    case SERVER = 'error_server';
}
