$(function(){
    loadSchedule(239);

    $(".Liga").on("click", function(e) {
        var id = e.target.id;

        var leagueId = 239;

        if(id == 'England'){
            leagueId = 128;
            loadSchedule(leagueId);
        }
        else if(id == 'Italy')
        {
            leagueId = 135
            loadSchedule(leagueId);
        }
    });

    $("#leagues").on("click", function(e) {
        var baseUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        window.location.href = ""+baseUrl+"/Live-Footy/Ligas.html";
    });

    $("#clubs").on("click", function(e) {
        var baseUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        window.location.href = ""+baseUrl+"/Live-Footy/Clubs.html";
    });


    function loadSchedule(leagueId) {
        var apiUrl = 'https://v3.football.api-sports.io/fixtures?league='+leagueId+'&next=6'

        $.ajax({
            url: apiUrl,
            type: "GET",
            headers: {
                "x-rapidapi-host":"v3.football.api-sports.io",
                "x-rapidapi-key": "92622eef76f332fd8d18240ba74d3f92"
            },
            success: function(response) {
                var fixtures = response.response;

                fixtures.forEach(fixture => {
                    var date = convertDatetime(fixture.fixture.date);
                    var home = fixture.teams.home.name;
                    var away = fixture.teams.away.name;

                    var tabla = $('#schedule');
                    var nuevaFila = $('<tr>');

                    nuevaFila.append($('<td>').text(date));
                    nuevaFila.append($('<td>').text('Liga Betplay'));
                    nuevaFila.append($('<td>').text(home + ' vs ' + away));    
                    
                    tabla.find('tbody').append(nuevaFila);
                });
            },
            error: function(error) {              
              console.error(error);
            }
        });
    }

    function convertDatetime (datetime){
         // Crear un objeto Date utilizando la fecha y hora proporcionadas
        var fecha = new Date(datetime);

        // Obtener el desplazamiento horario en minutos para la zona horaria de Colombia
        //var desplazamientoHorario = -300; // UTC-5 (Colombia está en UTC-5 durante todo el año)

        // Ajustar la fecha y hora utilizando el desplazamiento horario
        fecha.setMinutes(fecha.getMinutes());

        // Obtener los componentes de la fecha y hora ajustados
        var ano = fecha.getFullYear();
        var mes = fecha.getMonth() + 1; // Los meses comienzan en 0 en JavaScript, por lo que se suma 1
        var dia = fecha.getDate();
        var horas = fecha.getHours();
        var minutos = fecha.getMinutes();

        // Convertir las horas al formato de 12 horas
        var horas12 = horas % 12 || 12; // Si es 0, se cambia a 12

        // Determinar si es AM o PM
        var periodo = horas < 12 ? 'AM' : 'PM';

        // Agregar un cero inicial a las horas y minutos si son menores que 10
        horas12 = horas12 < 10 ? '0' + horas12 : horas12;
        minutos = minutos < 10 ? '0' + minutos : minutos;

        // Formatear la fecha y hora ajustados como una cadena en el formato deseado (por ejemplo, DD/MM/AAAA hh:MM AM/PM)
        var fechaHoraColombia = `${dia}/${mes}/${ano} ${horas12}:${minutos} ${periodo}`;

        return fechaHoraColombia;
    }
});