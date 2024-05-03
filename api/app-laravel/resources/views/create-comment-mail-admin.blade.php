<!DOCTYPE html>
<html>
<head>
    <title>Comentário da Solicitação Criada</title>
    <style>
        body {
            font-family: Verdana, Arial, Helvetica, sans-serif;
        }
    </style>
</head>
<body>
    <p>
        <b>COMENTÁRIO</b><br>
        Data: {{ $data['data'] }}<br>
        Hora: {{ $data['hora'] }}<br>
    </p>

    <p>
        Sua espera acabou.<br>
        A arte que você pediu acabou de ficar pronta.<br>
        Clique no link  e confira como ficou.
    </p>

    <p>
        <b>LINK SOLICITAÇÃO</b><br>
        Url: {{ $data['url'] }}<br>
    </p>

    <p>
        <b>ANEXOS</b><br>
        {{ $data['files'] }}
    </p>
</body>
</html>
