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
        Data: {{ $data['data'] }}<br>
        Hora: {{ $data['hora'] }}<br>
        Formatos: {{ $data['formatos'] }}<br>
        Outros Formatos: {{ $data['outros_formatos'] }}
    </p>

    <p>
        <b>CONTEÚDOS DA ARTE</b><br>
        Frase Destaque: {{ $data['frase_destaque'] }}<br>
        {{ $data['informacoes'] }}
    </p>

    <p>
        <b>OBSERVAÇÕES</b><br>
        {{ $data['observacoes'] }}
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
