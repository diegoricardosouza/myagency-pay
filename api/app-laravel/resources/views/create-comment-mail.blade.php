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
        <b>LINK COMPARTILHAVEL</b><br>
        Url: {{ $data['url'] }}<br>
    </p>

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
        <b>DADOS DO CLIENTE</b><br>
        Responsável: {{ $data['responsavel'] }}<br>
        Email: {{ $data['email'] }}<br>
        WhatsApp: {{ $data['whatsapp'] }}
    </p>

    <p>
        <b>ANEXOS</b><br>
        {{ $data['files'] }}
    </p>
</body>
</html>
