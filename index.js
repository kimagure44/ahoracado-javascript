var index;
var letras = [];
var fallos = 10;
var finJuego = false;
var significado;
$(document).on("keypress", function(e) {
    if (finJuego == false) {
        var letra = String.fromCharCode(e.keyCode).toUpperCase();
        var acierto = false;
        $(letras).each(function(i, v) {
            if (letra == v.toUpperCase()) {
                $("#contenedor .letra:nth-child(" + (i + 1) + ")").html(letra);
                $("#contenedor .letra:nth-child(" + (i + 1) + ")").css("color", "#00aa00");
                $("#contenedor .letra:nth-child(" + (i + 1) + ")").attr("data-lock", "1");
                console.log($("#contenedor .letra").attr("data-lock"));
                $("#contenedor .letra").each(function(i, v) {
                    if ($(v).attr("data-lock") == 1) {
                        finJuego = true;
                    } else {
                        finJuego = false;
                        return finJuego;
                    }
                })
                acierto = true;
            }
        });
        if (acierto == false) {
            var letraMal = $("#fallos").html();
            if (letraMal.indexOf(letra) < 0) {
                $("#fallos").append(letra + "-");
                $("#contadorFallos").html("Fallos...." + fallos);

                if (fallos == 0) {
                    finJuego = true;
                }
                fallos--;
            }
        }
    }
    if (finJuego == true && fallos > 0) {
        $("body").append("GANA.... Significado: " + significado);
        $("a").attr("target", "blank");
        $(document).off("keypress");
    }
    if (finJuego == true && fallos <= 0) {
        $("body").append("Pierde.... Significado: " + significado);
        $("a").attr("target", "blank");
        $(document).off("keypress");
    }
});
$(document).ready(function() {
    $.ajax({
        url: "palabras.php",
        type: "post",
        dataType: "json",
        cache: "false",
        success: function(data) {
            var palabras = data.length - 1;
            var sel = Math.floor((Math.random() * palabras));
            var palabraSel = data[sel];
            significado = palabraSel;
            var p1 = palabraSel.indexOf('>');
            var p2 = palabraSel.indexOf("</a>");
            var palFin = palabraSel.substring(p1 + 1, p2 - 1);
            console.log(palFin);
            var palabraSelLon = palFin.length;
            for (cont = 0; cont < palabraSelLon; cont++) {
                letras.push(palFin.substr(cont, 1));
            }
            var palabra = "";
            $(letras).each(function(i, v) {
                if (v == " ") {
                    palabra += "<div class='espacio' data-letra='1' data-lock='1'></div>";
                } else {
                    palabra += "<div class='letra' data-letra='0' data-lock='0'></div>";
                }
            });
            $("#contenedor").html(palabra);
            $(".letra").on("click", function() {
                if ($("#letraTemporal").length > 0) {
                    $("#letraTemporal").remove();
                }
                var el = $(this);
                index = el.index() + 1;
                $("#contenedor .letra").attr("data-letra", "0");
                $("#contenedor .letra:nth-child(" + index + ")").attr("data-letra", "1");
            })
        },
        beforeSend: function() {
            $("#contenedor").html("Cargando...");
        }
    });
});