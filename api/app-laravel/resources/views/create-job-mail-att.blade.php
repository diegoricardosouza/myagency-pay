<!DOCTYPE html>
<html>
<head>
    <title>Solicitação de Criação</title>
    <style>
        body {
            font-family: Verdana, Arial, Helvetica, sans-serif;
        }
    </style>
</head>
<body>
    <p>
        <b>SOLICITAÇÃO</b><br>
        Ref: {{ $data['ref'] }}<br>
        Data: {{ $data['data'] }}<br>
        Hora: {{ $data['hora'] }}<br>
        Site: {{ $data['site'] }}<br>
        Página que deseja atualizar: {{ $data['page'] }}
    </p>

    <p>
        <b>CONTEÚDOS</b><br>
        {!! $data['informacoes'] !!}
    </p>

    <p>
        <b>OBSERVAÇÕES</b><br>
        {!! $data['observacoes'] !!}
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