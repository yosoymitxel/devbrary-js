# Devbrary JS test library

El archivo devbrary.js es una librería hecha en jQuery que contiene una serie de funciones y métodos que se pueden utilizar para versatilizar ciertas aciones en el código JavaScript. 
Esta biblioteca incluye funciones para el manejo de DOM y HTML, el manejo de URLs, el manejo de SQL, el manejo de strings, el manejo de fechas, el manejo de arrays, el manejo de variables y el debug de aplicaciones. 

## Categorías

Devbrary JS test library está organizada en diferentes categorías que agrupan las funciones según su funcionalidad. Aquí hay una lista de las categorías disponibles:

* TEST     = Debug y utilidades para
* STR      = Manejo de string
* FORM     = Validaciones de formulario
* IS       = Tipo de variable
* FEC      = Manejo de fechas
* URL      = Manejo de Urls
* DOM      = Manejo de DOM - HTML
* ARR      = Manejo de Arrays
* HTML     = Se utiliza para embeber en html

Este se divide en distintas finalidades de funciones usando como prefijo `DevBrary.`

**Ejemplo:** `DevBrary.test_var_dump('prueba')`

* **str:** manejo de string
```
DevBrary.str_reemplazar_expresion_regular('Hola', '\w+',' ')
```
* **test:** manejo de testeo
```
DevBrary.test_var_dom_dump('id-elemento')
```
* **dom:** manejo de DOM
```
DevBrary.dom_crear_elemento('p','Valor del contenido','id-padre','id-elemento','clases','name',['otros','atributos'],['valor','de atributos'])
```
* **is:** saber que tipo de dato es
```
DevBrary.is_array(['valor'])
```
* **form:** validación de elementos del domde
```
DevBrary.form_email('mail@mail.com')
```
* **url:** manejo de url
```
DevBrary.url_get_host('http://www.pagina.prueba.com')
```
* **arr:** manejo de array
```
DevBrary.arr_incluye_texto(['prueba'],'prueba')
```
* **fec:** manejo de fechas
```
DevBrary.fec_fecha_actual()
```

## Pre-requisitos

* [jQuery](https://jquery.com/)

## Instalación 
#### Al descargarla usa esta etiqueta html para añadirla a tu proyecto

```
<script id="dev-js-devbrary" src="/devbrary.js"></script> 
```

#### Puedes agregarlo a tu proyecto con la siguiente etiqueta html:

```
<script id="dev-js-devbrary" src="https://cdn.jsdelivr.net/gh/yosoymitxel/devbrary-js-test-library@master/devbrary.js"></script> 
```

#### O con la versión minificada:

```
<script id="dev-js-devbrary" src="https://cdn.jsdelivr.net/gh/yosoymitxel/devbrary-js-test-library@master/devbrary.min.js"></script> 
```

#### También puedes agregarlo usando JQuery

```
$.getScript( "https://cdn.jsdelivr.net/gh/yosoymitxel/devbrary-js-test-library@master/devbrary.js", function( data, textStatus, jqxhr ) {
  console.log( "Fue cargado correctamente." );
});
```

## Ejecutando las pruebas

Puedes escribir `echo('prueba')` o `DevBrary.test_echo('prueba')` para saber si esta fue instalada correctamente

## Construido con 

* JavasScript - Lenguaje de programación
* [jQuery](https://jquery.com/) - Manejador de DOM

## Licencia 

Este proyecto está bajo la Licencia (MIT) 


---
⌨️ con ❤️ por [yosoymitxel](https://github.com/yosoymitxel)
