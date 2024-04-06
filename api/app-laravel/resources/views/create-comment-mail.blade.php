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
        <b>CRIAÇÃO DO COMENTÁRIO</b><br>
        Data: {{ $data['data'] }}<br>
        Hora: {{ $data['hora'] }}<br>
    </p>

    <p>
        <b>CONTEÚDO</b><br>
        {{ $data['conteudo'] }}
    </p>

    <p>
        <b>ANEXOS</b><br>
        {{ $data['files'] }}
    </p>
</body>
</html>
