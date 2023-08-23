<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {

            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
            margin-bottom: 20px;
        }
        p {
            color: #666;
            line-height: 1.6;
            margin: 10px 0;
        }
        strong {
            color: #222;
        }
        a {
            color: #007bff;
            text-decoration: none;
        }
        .note-details {
            margin-top: 20px;
            padding: 15px;
            background-color: #f9f9f9;
            border-radius: 8px;
        }
    </style>
</head>
<body>
<div class="container">
    <h1>@lang('Notification')</h1>
    <p>@lang('You have received this notification from the website'): <a href="{{ config('app.url') }}">{{ config('app.url') }}</a></p>

    <div class="note-details">
        <h2>@lang('Note Details')</h2>
        <p>@lang('The note you created has been read on'): <strong>{{ $dateRead }}</strong></p>
        <p>@lang('ID'): <strong>{{ $noteID }}</strong></p>
    </div>
</div>
</body>
</html>
