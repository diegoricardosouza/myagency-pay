<!DOCTYPE html>
<html>
<head>
    <title>Pedido Realizado!</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        body {
            /* font-family: Verdana, Arial, Helvetica, sans-serif; */
            font-family: 'Cabin', sans-serif;
            background: #f9f9f9;
            margin: 0;
            padding: 0;
        }

        .container {
            background: #FFF;
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 33px 55px;
        }

        .logo {
            text-align: center;
            margin-bottom: 20px;
        }

        .logo img {
            max-width: 180px;
        }

        .button {
            display: inline-block;
            padding: 14px 44px 13px;
            line-height: 120%;
            background: #003f91;
            color: #FFF;
            border-radius: 6px;
            text-align: center;
            text-transform: uppercase;
            font-weight: 700;
            text-decoration: none;
        }

        p {
            font-size: 16px;
            line-height: 25.6px;
        }

        h1 {
            font-size: 25px;
        }

        .text-center {
            text-align: center;
        }

        .t {
            font-size: 25px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="https://inovasite.com/wp-content/uploads/2023/01/InovaSite-Horizontal-1.png" alt="">
        </div><br><br>

        {{-- <p>
            <b>COMENTÁRIO</b><br>
            Data: {{ $data['data'] }}<br>
            Hora: {{ $data['hora'] }}<br>
        </p><br> --}}

        <p class="text-center">
            <strong class="t">Pedido Realizado!</strong><br><br>
            Um novo pedido foi realizado no artes.<br>
            Clique no link e confira.
        </p><br><br><br>

        <div class="text-center">
            <a href={{ $data['url'] }} class="button" target="_blank">
                Ver Pedido
            </a>
        </div><br><br>

        <p>
            Obrigado,<br>
            Equipe InovaSite
        </p>
    </div>
</body>
</html>
