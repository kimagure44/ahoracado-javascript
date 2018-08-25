<?php
        $letrasEmpieza = "a";
        $letrasTermina = "";
        $palabrasQueTenganLetras = "";
        $palabrasQueNoTenganLetras = "";
        $palabrasQueTenganLaCadena = "";
        $palabrasQueNoTenganLaCadena = "";
        $numeroDeSilabas = 0;
        $numeroDeLetras = 6;
        $url = "http://www.palabrasque.com/buscador.php?i=".$letrasEmpieza;
        $url.= "&f=".$letrasTermina."&tv=0";
        $url.= "&button=Buscar+palabras&ms=".$palabrasQueTenganLetras;
        $url.= "&mns=".$palabrasQueNoTenganLetras;
        $url.= "&m=".$palabrasQueTenganLaCadena;
        $url.= "&mn=".$palabrasQueNoTenganLaCadena;
        $url.= "&fs=".$numeroDeSilabas;
        $url.= "&fnl=".$numeroDeLetras;
        $url.= "&fa=0&d=0";
        
        $palabras = file_get_contents($url);
        $r = explode("<hr>",$palabras);
        $palabras = $r[1];
        $td = "<td>";
        $td2 = "</td>";
        $ini = strpos($palabras, $td);
        $fin = strpos($palabras, $td2);
        $text = substr($palabras, $ini + strlen($td), $fin);
        $words = explode(",",$text);
        echo json_encode($words);
?>
