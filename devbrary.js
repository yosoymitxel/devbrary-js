/*
Librería DevBrary
Fecha de inicio: 11/12/2019

Lista de categorías:

TEST     = Debug y utilidades para
STR      = Manejo de string
FORM     = Validaciones de formulario
IS       = Tipo de variable
FEC      = Manejo de fechas
URL      = Manejo de Urls
DOM      = Manejo de DOM - HTML
ARR      = Manejo de Arrays
HTML     = Se utiliza para embeber en html

*/

/*Test*/
class DevBrary{
    static test_echo(texto,valor=false,delimitador=':'){
        if(!valor){
            console.log(texto);
        }else{
            console.log(`${texto} ${delimitador} ${valor}`);
        }
    
    }
    
    static test_var_dom_dump(idObjeto){
        let id = DevBrary.is_string(idObjeto)? idObjeto : null;
        if(DevBrary.dom_existe_elemento(idObjeto)){
            echo('Objeto: ');
            echo($(id));
            echo('Id   : '+$(id).attr('id'));
    
            if(!DevBrary.str_esta_vacio($(id).prop('name'))){
                echo('Name : '+$(id).prop('name'));
            }
    
            if(!DevBrary.str_esta_vacio($(id).val())){
                echo('Value: '+$(id).val());
            }
    
            if(!DevBrary.str_esta_vacio($(id).text())){
                echo('Text : '+DevBrary.str_trim($(id).text()));
            }
    
            if(!DevBrary.str_esta_vacio($(id).attr('css'))){
                echo('Css  : '+$(id).attr('css'));
            }
    
            if(!DevBrary.str_esta_vacio($(id).attr('class'))){
                echo('Class: '+$(id).attr('class'));
            }
    
            if(!DevBrary.str_esta_vacio($(id).attr('style'))){
                echo('Style: '+$(id).attr('class'));
            }
        }else{
            echo('El elemento "'+id+'" no existe en el DOM.');
        }
    }
    
    static test_contador_texto_para_pruebas(texto='Prueba',reiniciar=false) {
        if( typeof DevBrary.test_contador_texto_para_pruebas.counter == 'undefined' || reiniciar == true ) {
            DevBrary.test_contador_texto_para_pruebas.counter = 0;
        }
        DevBrary.test_contador_texto_para_pruebas.counter++;
        echo(texto+': '+DevBrary.test_contador_texto_para_pruebas.counter);
    }
    
    static test_contador_automatico(valor=false) {
        if( typeof DevBrary.test_contador_automatico.counter == 'undefined' || valor===0) {
            DevBrary.test_contador_automatico.counter = 0;
        }
        DevBrary.test_contador_automatico.counter++;
        
        return DevBrary.test_contador_automatico.counter;
    }
    
    static test_es_tipo_de_dato(dato,tipo) {
        return DevBrary.test_var_dump(dato,false,true) == tipo
    }
    
    static test_var_dump(dato,imprimir=true,retornar=false) {
        let tipoDato = typeof dato;
        let valorDato = dato;
        
        switch (tipoDato) {
            case 'number':
                if (Number.isSafeInteger(valorDato)) {
                    tipoDato = 'int';
                } else {
                    tipoDato = 'float';
                }
                if(imprimir) echo(tipoDato + '(' + valorDato + ')');
                if(retornar) return tipoDato;
                break;
            case 'string':
                if(imprimir) echo(tipoDato + '(' + valorDato.length + ') "' + valorDato + '"');
                if(retornar) return 'string';
                break;
            case 'boolean':
                if(imprimir) echo(tipoDato + ' "' + valorDato + '"');
                if(retornar) return 'boolean';
                break;
            case 'undefined':
                if(imprimir) echo('La variable no está definida. (undefined)');
                if(retornar) return 'undefined';
                break;
            case 'object':
                if (Array.isArray(valorDato)) {
                    tipoDato = 'array';
                    if(imprimir){
                        echo(`${tipoDato} (${valorDato.length})\n${DevBrary.test_print_array(valorDato,null,true,true,true)}`)
                    }
                    if(retornar) return 'array';
                }else if(valorDato == null){
                    if(imprimir) echo('NULL');
                    if(retornar) return 'null';
                }else if(DevBrary.dom_existe_elemento($(dato).attr('id'))){
                    DevBrary.test_var_dom_dump($(dato).attr('id'));
                }else if(dato !== undefined && dato !== null && dato.constructor == Object){
                    if(imprimir) echo('Objeto de tipo JSON');
                    if(imprimir) echo(dato);
                    if(retornar) return 'json';
                }else if(DevBrary.test_objeto_incluye_propiedad(dato,['source','lastIndex','exec','test'])){
                    if(imprimir) echo('Expresión regular RegExp');
                    if(imprimir) echo(dato);
                    if(retornar) return 'regexp';
                }else if(typeof $(dato).html === 'function' && $(dato).html()){
                    if(imprimir) echo('Objeto DOM');
                    if(imprimir) echo(dato);
                    if(retornar) return 'dom';
                }else{
                    if(imprimir) echo('Objeto no reconocido');
                    if(retornar) return 'Objeto no reconocido';
                }
                break;
            case 'boolean':
                if(imprimir) echo(tipoDato + ' "' + valorDato + '"');
                if(retornar) return 'boolean';
                break;
            case 'undefined':
                if(imprimir) echo('La variable no está definida. (undefined)');
                if(retornar) return 'undefined';
                break;
        }
    }
    
    static test_tipo_dato(dato) {
        let tipoDato = typeof dato;
        let valorDato = dato;
        
        switch (tipoDato) {
            case 'number':
                if (Number.isSafeInteger(valorDato)) {
                    tipoDato = 'int';
                } else {
                    tipoDato = 'float';
                }
                return tipoDato;
            case 'string':
                return 'string';
            case 'object':
                if (Array.isArray(valorDato)) {
                    return 'array';
                }else if(valorDato == null){
                    return 'null';
                }else if(DevBrary.dom_existe_elemento($(dato).attr('id'))){
                    return 'dom';
                }else if(dato !== undefined && dato !== null && dato.constructor == Object){
                    return 'json';
                }else{
                    return 'Objeto no reconocido';
                }
            case 'boolean':
                return 'boolean';
            case 'undefined':
                return 'undefined';
        }
    }
    
    static test_depurar(condicion=false,obj=false) {
        if(condicion){
            DevBrary.test_var_dump(obj);
        }
    }
    
    static test_obj_to_bool(obj) {
        return !!obj
    }
    
    static test_print_array(array,nivelTabulado=0,detalles=false,retornar=false,tipoDeDato=false) {
        let i             = 0
        let valorImprimir = ''
        let tabulado      = '\t'.repeat(nivelTabulado)
        let detalle       = detalles   ? `${tabulado}\tarray (${array.length})\n` : ''
    
        for (let valor of array){
            if (DevBrary.is_array(valor)){
                valorImprimir += `${tabulado}${i} :\n${detalle}${DevBrary.test_print_array(valor,nivelTabulado+1,detalles,retornar,tipoDeDato)}`
            }else{
                let tipoDato   = tipoDeDato ? DevBrary.test_tipo_dato(valor)+' ' : ''
                valorImprimir += `${tabulado}${i} : ${tipoDato}${valor}\n`
            }
    
            i++
        }
    
        if (nivelTabulado!=0 || retornar){
            return valorImprimir
        }else{
            echo(valorImprimir)
        }
    }
    
    static test_propiedades_objeto(o) {
        let objectToInspect
        let result = []
    
        for(objectToInspect = o; objectToInspect !== null;
            objectToInspect = Object.getPrototypeOf(objectToInspect)) {
            result = result.concat(
                Object.getOwnPropertyNames(objectToInspect)
            );
        }
    
        return result
    }
    
    static test_objeto_incluye_propiedad(o,propiedad) {
        let propriedades = DevBrary.test_propiedades_objeto(o)
        return DevBrary.arr_is_in_array(propriedades,propiedad)
    }
    
    /*STR*/
    
    static str_quitar_espacios_blancos(texto) {
        return DevBrary.is_string(texto)?(texto.replace(/\s/g,"")):'';
    }
    
    static str_to_url_amigable(texto){
        if(DevBrary.is_string(texto)){
            texto = DevBrary.str_quitar_acentos(texto)
    
            texto = texto.toLowerCase().trim()
          
            // Elimina los caracteres especiales y los espacios en blanco
            texto = texto.replace(/[^a-z0-9]/g, '')
            texto = texto.replace(/\s+/g, '-')
    
        }
    
        return texto
    }

    static str_sin_acentos(texto){
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    
    
    static str_sin_caracteres_especiales(texto){
        texto = DevBrary.str_quitar_acentos(texto)

        let cadena = texto.toLowerCase().trim()

        cadena = cadena.replace(/[^a-z0-9\s\t\n]/g, "")
      
        return cadena;
    }

    static str_quitar_espacios_extra(texto){
        if(DevBrary.is_string(texto,1)){
            texto = DevBrary.str_trim(texto)
            texto = texto.replace(/\s\s+/g, ' ')
            texto = texto.replace(/\s\s/g, '')
            return texto
        }
    
        return '';
    }
    
    static str_conseguir_numero_string (texto,returnArray=false){
        if(DevBrary.is_numero(texto)){
            return texto;
        }else if (DevBrary.is_string(texto)){
            let numero =  texto.match(/-?\d+/g)
    
            //Se valida si es es un array, hay caso (como el segundo) donde no sale un número directamente sino un array
            numero = Array.isArray(numero)  && !returnArray ? numero.join('') : numero
            return numero;
        }
    
        return false;
    }
    
    static str_formato_numero(numero,separadorMiles='.',separadorDecimal=','){
        let partes = numero.toString().split('.');
        partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, separadorMiles);
        return partes.join(separadorDecimal);
    }
    
    static str_separador_unidad_mil(numero,separadorDecimal=','){
        return DevBrary.str_formato_numero(numero)
    }

    static str_esta_vacio(texto){
        texto = DevBrary.str_convertir_a_sting(texto);
        return !(texto !== undefined && texto!== null && texto.length > 0 && texto !== '')
    }
    
    static str_reemplazar_expresion_regular(t,expresion,reemplazo) {
        expresion = DevBrary.str_reg_corregir_expresion(expresion);
        
        if(DevBrary.is_string(t) && DevBrary.str_reg_incluye(t,expresion)){
            let re = DevBrary.str_reg_crear_expresion(expresion);
            return t.replace(re,reemplazo);
        }
    
        return t;
    }
    
    static str_convertir_a_sting(t) {
        if(!DevBrary.test_es_tipo_de_dato(t,'string')){
            switch (DevBrary.test_tipo_dato(t)){
                case 'int':
                case 'boolean':
                case 'float':
                    t = String(t);
                    break;
                case 'null':
                case 'undefined':
                default:
                    t= '';
                    break;
            }
        }
    
        return t;
    }
    
    static str_incluye(t,busqueda) {
        return DevBrary.is_string(t)?t.includes(busqueda):'';
    }
    
    static str_reg_incluye(t,expresion) {
        let expreg = DevBrary.str_reg_crear_expresion(expresion);
        return DevBrary.is_string(t)?expreg.test(t):false;
    }
    
    static str_reg_corregir_expresion(expresion){
        return (DevBrary.str_inicia_con(expresion,'/') && DevBrary.str_termina_con(expresion,'/')) ?
            expresion.substring(1,expresion.length-1) :
            /*AGREGAR FALTA G*/
            expresion
    }
    
    static str_reg_crear_expresion(expresion,flag='g') {
        let reg = ''
        
        if(DevBrary.test_es_tipo_de_dato(expresion,'regexp')) {
            reg = expresion.flags !== '' ? expresion : new RegExp(expresion.source,flag)
        }else if(DevBrary.str_inicia_con(expresion,'/') && DevBrary.str_reg_incluye(expresion,/\/[gim]?$/g)){
            let regFlag = DevBrary.str_reg_conseguir(expresion,/\/[gim]?$/g)
            flag        = DevBrary.is_string(DevBrary.str_reemplazar(regFlag,'/',''),1) ? DevBrary.str_reemplazar(regFlag,'/','') : flag
            expresion   = DevBrary.str_reemplazar(expresion,[/^\//,/\/[gim]?$/],'')
            reg = new RegExp(expresion,flag)
        }else{
            reg = new RegExp(expresion,flag)
        }
    
        return reg
    }
    
    static str_reg_conseguir(t,expresion) {
        expresion = DevBrary.str_reg_crear_expresion(expresion)
        
        if( DevBrary.str_reg_incluye(t,expresion) ){
            t = t.match(expresion)
            return t.length>1 ? t : t[0]
        }
    
        return false;
    }
    
    static str_primera_letra_mayuscula(texto){
        return texto.charAt(0).toUpperCase() + (texto.slice(1)).toLocaleLowerCase();
    }
    
    static str_contar_caracteres(t) {
        return (DevBrary.is_string(t))? t.length : 0
    }
    
    static str_inicia_con(t,busqueda) {
        return DevBrary.is_string(t)? t.startsWith(busqueda) : false;
    }
    
    static str_termina_con(t,busqueda) {
        return DevBrary.is_string(t)? t.endsWith(busqueda) : false;
    }
    
    static str_to_lower(t) {
        return DevBrary.is_string(t,1) ?
            t.toLocaleLowerCase() :
            false;
    }
    
    static str_to_upper(t) {
        return DevBrary.is_string(t,1) ?
            t.toUpperCase() :
            false;
    }
    static str_to_capitalize(t) {
        return t.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
    }
    
    static str_capitalizar(t) {
        return DevBrary.str_to_capitalize(t)
    }
    
    static str_conseguir_expresion_regular(t,expresion) {
        return DevBrary.str_reg_conseguir(t,expresion)
    }
    
    static str_acortar_texto(t,cantidadCaracteres) {
        if(DevBrary.is_string(t,1)){
            return (DevBrary.is_string(t,cantidadCaracteres)) ? DevBrary.str_substring(t,0,cantidadCaracteres)+'...' : t;
        }
    
        return '';
    }
    
    static str_substring(t,inicio, fin) {
        if(DevBrary.is_string(t,1) && DevBrary.is_numero(inicio) && DevBrary.is_numero(fin)){
            if(fin<0){
                return t.substring(inicio, (t.length + fin) )
            }
            
            return t.substring(inicio,fin)
        }
    
        return false;
    }
    
    static str_trim(t,left=false,right=false) {
        if (DevBrary.is_string(t)){
            if((!left && !right) || (left && right)){
                t = t.trim()
            }else{
                t = left ? t.trimLeft() : t.trimRight()
            }
    
        }
    
        return t
    }
    
    static str_replace(t,busqueda,reemplazo) {
        if(DevBrary.is_string(t) && (DevBrary.is_string(busqueda) || DevBrary.is_array(busqueda) || DevBrary.is_regexp(busqueda)) && (DevBrary.is_string(reemplazo) || DevBrary.is_array(reemplazo)) ){
            if(DevBrary.is_array(busqueda)) {
                for (let i = 0, iMax = DevBrary.arr_count(busqueda); i < iMax; i++){
                    let valor  = DevBrary.is_array(reemplazo) ? reemplazo[i] : reemplazo
                    let buscar = DevBrary.is_regexp(busqueda[i]) && busqueda[i].flags !== 'g' ? DevBrary.str_reg_crear_expresion(busqueda[i].source) : busqueda[i]
                    t          = t.replaceAll(buscar,valor)
                }
    
            }else{
                busqueda = DevBrary.is_regexp(busqueda) && busqueda.flags !== 'g' ? DevBrary.str_reg_crear_expresion(busqueda.source) : busqueda
                t        = t.replaceAll(busqueda,reemplazo)
            }
    
            return t
        }
    
        return false
    }
    
    static str_reemplazar(t,busqueda,reemplazo) {
        return DevBrary.str_replace(t,busqueda,reemplazo)
    }
    
    static str_quitar_acentos(t){
        if(DevBrary.is_string(t)){
            return t.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        }
    
        return t
    }
    
    /*FORM*/
    
    static form_email(t) {
        return ( (/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+/.test(t)) && DevBrary.str_quitar_espacios_blancos(t) == t);
    }
    
    static form_url(t,validarExistencia=false) {
        let re = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        return (!validarExistencia) ?
            re.test(t) && DevBrary.str_quitar_espacios_blancos(t) === t :
            re.test(t) && DevBrary.url_pagina_existe(t) && DevBrary.str_quitar_espacios_blancos(t) === t
    }
    
    static form_text_area(idObjeto,longitud=0) {
        return DevBrary.is_string((DevBrary.dom_obj_value(idObjeto)), longitud)
    }
    
    static form_radio_box(idObjeto) {
        return DevBrary.test_obj_to_bool($(DevBrary.dom_objeto(idObjeto)).is(":checked"))
    }
    
    static form_select(idSelect) {
        return DevBrary.test_obj_to_bool(DevBrary.dom_obj_value(idSelect))
    }
    
    static form_input_string(idSelect,longitud=0) {
        return DevBrary.is_string(DevBrary.dom_obj_value(idSelect),longitud)
    }
    
    static form_input_numero(idSelect) {
        return DevBrary.is_numero(DevBrary.dom_obj_value(idSelect))
    }
    
    /*IS*/
    
    static is_string(t,longitud=0) {
        return (typeof t == 'string' && t.length>=longitud);
    }
    
    static is_numero(obj) {
        return DevBrary.test_es_tipo_de_dato(obj,'int') || DevBrary.test_es_tipo_de_dato(obj,'float') ;
    }
    
    static is_bool(obj) {
        return DevBrary.test_es_tipo_de_dato(obj,'bool');
    }
    
    static is_undefined(obj) {
        return DevBrary.test_es_tipo_de_dato(obj,'undefined');
    }
    
    static is_array(obj,tamanio=0) {
        return (DevBrary.test_tipo_dato(obj)==='array' && obj.length>=tamanio);
    }
    
    static is_regexp(obj) {
        return DevBrary.test_es_tipo_de_dato(obj,'regexp');
    }
    
    static is_json(obj) {
        return DevBrary.test_es_tipo_de_dato(obj,'json');
    }
    
    static is_null(obj) {
        return DevBrary.test_es_tipo_de_dato(obj,'null');
    }
    
    /*FECHA*/
    
    static fec_fecha_actual() {
        let f     = new Date();
        let fecha = `${f.getDay()}/${f.getDate()}/${f.getFullYear()}`;
        return fecha;
    }
    
    static fec_fecha_actual_texto() {
        var meses      = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
        var diasSemana = new Array ("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
        var f          = new Date();
        let fecha = `${diasSemana[f.getDay()]} ${f.getDate()} de ${meses[f.getMonth()]} de ${f.getFullYear()}`;
        return fecha;
    }
    
    /*URL*/
    
    static url_decode(t){
        return decodeURIComponent(t)
    }
    
    static url_encode(t){
        return encodeURIComponent(t)
    }
    
    static url_get_host(url) {
        if(DevBrary.form_url(url)){
            let link = DevBrary.url_string_a_url(url);
            return link.hostname;
        }
    
        return false;
    }
    
    static url_pagina_existe(url) {
        try {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            xhr.send();
            return (xhr.status == 200)
        } catch(err) {
            return(false);
        }
    }
    
    static url_string_a_url(url) {
        let link = document.createElement('a');
        link.href = url;
        return link;
    }
    
    static url_abrir_enlace(url,target='') {
        url = DevBrary.str_quitar_espacios_blancos(url);
        return window.open(url, target);
    }
    
    static url_this_host() {
        return window.location.host
    }
    
    static url_this_pagina_actual() {
        return window.location.pathname
    }
    
    static url_str_a_url_amigable(texto,quitarTodos=true) {
        return (DevBrary.str_sin_caracteres_especiales(texto,quitarTodos)).replace(/_/g,'-');
    }
    
    /*DOM*/
    
    static dom_agregar_bootstrap(versionBootstrap='4.4.1',versionJquery='3.4.1',versionPopper='1.16.0') {
        DevBrary.dom_agregar_css(`https://maxcdn.bootstrapcdn.com/bootstrap/${versionBootstrap}/css/bootstrap.min.css`,'bootstrap-css');
        DevBrary.dom_agregar_js(`https://ajax.googleapis.com/ajax/libs/jquery/${versionJquery}/jquery.min.js`,'jquery-js');
        DevBrary.dom_agregar_js(`https://cdnjs.cloudflare.com/ajax/libs/popper.js/${versionPopper}/umd/popper.min.js`,'popper-js');
        DevBrary.dom_agregar_js(`https://maxcdn.bootstrapcdn.com/bootstrap/${versionBootstrap}/js/bootstrap.min.js`,'bootstrap-js');
    }
    
    static dom_agregar_js(url,titulo='') {
        url = DevBrary.form_url(url) ? url : DevBrary.url_this_host()+url
        
        if(DevBrary.form_url(url) && DevBrary.url_pagina_existe(url)){
            titulo = DevBrary.is_string(titulo,1) ?
                titulo:
                DevBrary.url_get_host(url);
            $('body').append(`<script id="${titulo}" src="${url}"></script>`);
            return true;
        }
    
        return false;
    }
    
    static dom_agregar_css(url,titulo='') {
        url = DevBrary.form_url(url) ? url : DevBrary.url_this_host()+url
        
        if(DevBrary.form_url(url) && DevBrary.url_pagina_existe(url)){
            titulo = DevBrary.is_string(titulo,1) ?
                titulo:
                DevBrary.url_get_host(url);
            $('head').append(`<link id="${titulo}" rel="stylesheet" href="${url}">`);
            return true;
        }
    
        return false;
    }
    
    static dom_existe_elemento(idObjeto){
        if(!DevBrary.test_es_tipo_de_dato(idObjeto,'dom')){
            idObjeto = DevBrary.str_quitar_espacios_extra(idObjeto)
    
            if(DevBrary.is_string(idObjeto,1)){
                if(DevBrary.dom_es_etiqueta_html(idObjeto)){
                    if(($(idObjeto).length>0)){
                        return true;
                    }
                }
    
                idObjeto = DevBrary.dom_str_a_id(idObjeto)
    
                if(!DevBrary.str_esta_vacio($(idObjeto).parent().html()) || $(idObjeto).parent().html()){
                    return true
                }
            }
    
        }else{
            return true
        }
    
        return false;
    }
    
    static dom_obj_attr(idObjeto,attr,valor=false) {
        let id         = DevBrary.dom_str_a_id(idObjeto)
        let asignarValor = DevBrary.test_obj_to_bool(valor)
    
        if (DevBrary.dom_existe_elemento(id) && DevBrary.is_string(attr,1)){
            switch (attr) {
                case "value":
                case "val":
                    if(!asignarValor){
                        return $(id).val()
                    }else{
                        $(id).val(valor)
                    }
                    break;
                case "id":
                    if(!asignarValor){
                        return $(id).attr('id')
                    }else{
                        $(id).attr('id',valor)
                    }
                    break;
                case "name":
                    if(!asignarValor){
                        return $(id).attr('name')
                    }else{
                        $(id).attr('name',valor)
                    }
                    break;
                case "class":
                    if(!asignarValor){
                        return $(id).attr('class');
                    }else{
                        $(id).attr('class',valor)
                    }
                    break;
                case "html":
                    if(!asignarValor){
                        return $(id).html()
                    }else{
                        $(id).html(valor)
                    }
                    break;
                case "text":
                    if(!asignarValor){
                        return  $(id).text()
                    }else{
                        $(id).text(valor)
                    }
                    break;
                default:
                    if(!asignarValor){
                        return $(id).attr(attr,valor)
                    }else{
                        $(id).attr(attr,valor)
                    }
            }
        }
    }
    
    static dom_obj_value(idObjeto,valor=null) {
        return DevBrary.dom_obj_attr(t_trim(idObjeto)) ?
            DevBrary.dom_obj_attr(idObjeto,'value',valor) :
            false
    }
    
    static dom_obj_class(idObjeto,valor='') {
        return DevBrary.dom_existe_elemento(t_trim(idObjeto)) ?
            DevBrary.dom_obj_attr(idObjeto,'class',valor) :
            false
    }
    
    static dom_obj_html(idObjeto,valor='') {
        return DevBrary.dom_existe_elemento(t_trim(idObjeto)) ?
            DevBrary.dom_obj_attr(idObjeto,'html',valor) :
            false
    }
    
    static dom_obj_text(idObjeto,valor='') {
        return DevBrary.dom_existe_elemento(t_trim(idObjeto)) ?
            DevBrary.dom_obj_attr(idObjeto,'text',valor) :
            false
    }
    
    static dom_objeto(idObjeto,buscarTodo=false) {
        if(DevBrary.is_string(idObjeto)){
            idObjeto = t_trim(idObjeto);
            let id = idObjeto.startsWith('#')?idObjeto:'#'+idObjeto;
    
            if(!DevBrary.str_esta_vacio($(id).attr('id'))){
                if (buscarTodo){
                    return $(id);
                }else{
                    return $(id)[0];
                }
            }
        }
    
        return false;
    }
    
    static dom_copiar_en_portapapeles(dato) {
        let $temp = $("<textarea>")
        $("body").append($temp)
        $temp.val(dato).select()
        let result = document.execCommand("copy")
        $temp.remove()
        return result
    }
    
    static dom_crear_elemento(etiqueta,contenido,idElementoPadre='body',id='',clase='',name='',arrayAtributosTitulo=null,arrayAtributosValores=null) {
        idElementoPadre = DevBrary.dom_str_a_id(idElementoPadre);
       
        if (DevBrary.dom_existe_elemento(idElementoPadre)){
            let attr = (DevBrary.is_array(arrayAtributosTitulo,1) && DevBrary.is_array(arrayAtributosValores,1)) ?
                DevBrary.dom_generar_string_atributos(arrayAtributosTitulo,arrayAtributosValores) :
                null;
            $(idElementoPadre).append(`<${etiqueta} id="${id}" class="${clase}" name="${name}" ${attr}>${contenido}</${etiqueta}>`);
            return true;
        }
    
        return false;
    }
    
    static dom_generar_string_atributos(arrayAtributosTitulo,arrayAtributosValores) {
        if (DevBrary.is_array(arrayAtributosTitulo,1) && DevBrary.is_array(arrayAtributosValores,1)){
            var attr = '';
            
            for(let i=0;i<arrayAtributosTitulo.length;i++){
                attr += arrayAtributosTitulo[i]+'="'+arrayAtributosValores[i]+'" ';
            }
            
            return attr;
        }
    
        return false
    }
    
    static dom_obj_find(idElementoPadre,busqueda) {
        if (DevBrary.is_string(idElementoPadre,1) && DevBrary.is_string(busqueda,1)){
            idElementoPadre = DevBrary.dom_str_a_id(idElementoPadre);
           
            if(DevBrary.dom_existe_elemento(idElementoPadre)){
                busqueda = DevBrary.dom_str_a_id(busqueda);
                return $(idElementoPadre).find(busqueda);
            }
        }
    
        return false;
    }
    
    static dom_es_etiqueta_html(t) {
        let array = ['a','abbr','address','area','article','aside','audio','b','base','bdi','bdo','blockquote',
            'body','br','button','canvas','caption','cite','code','col','colgroup','colgroup','command',
            'datalist','dd','del','details','dfn','dialog','div','dl','dt','em','embed','fieldset','figcaption',
            'figure','figure','footer','form','h1','h6','head','header','hgroup','hr','html','i','iframe','img',
            'input','ins','kbd','keygen','label','input','legend','fieldset','figure','details','li','link','map',
            'mark','menu','meta','meter','nav','noscript','objet','ol','optgroup','option','output','p','param',
            'pre','progress','q','rp','rt','ruby','s','samp','script','section','select','small','source','span',
            'strong','style','sub','summary','details','sup','table','tbody','td','textarea','tfoot','th','thead',
            'time','title','tr','track','ul','var','video','wbr'];
        return (DevBrary.is_string(t,1) && DevBrary.arr_incluye_texto(array,t));
    }
    
    static dom_texto_existe_en_pagina(t) {
        return (DevBrary.is_string(t,1) && DevBrary.str_incluye( DevBrary.dom_obj_html('body') ,t)) ?
            DevBrary.str_incluye( DevBrary.dom_obj_html('body') ,t) :
            false;
    }
    
    static dom_copiar_en_portapapeles_attr_elemento(id,attr='value') {
        id   = DevBrary.dom_str_a_id(id);
        attr = DevBrary.str_to_lower(DevBrary.str_quitar_espacios_blancos(attr));
        let valor;
        
        if (DevBrary.dom_existe_elemento(id) && DevBrary.is_string(attr,1)){
            switch (attr) {
                case "value":
                case "val":
                case "v":
                    valor = $(id).val();
                    break;
                case "id":
                case "i":
                    valor = $(id).attr('id');
                    break;
                case "name":
                case "n":
                    valor = $(id).attr('name');
                    break;
                case "class":
                case "c":
                    valor = $(id).attr('class');
                    break;
                case "html":
                case "h":
                    valor = $(id).html();
                    break;
                case "text":
                case "t":
                    valor = $(id).text();
                    break;
                default:
                    return false;
            }
            DevBrary.dom_copiar_en_portapapeles(valor);
            return true;
        }
    
        return false;
    }
    
    static dom_str_a_id(id) {
        if(!DevBrary.test_es_tipo_de_dato(id,'dom')){
            id = DevBrary.str_quitar_espacios_extra(id);
           
            if (DevBrary.is_string(id)){
                id = DevBrary.dom_es_etiqueta_html(id) || DevBrary.str_inicia_con(id,'#') || DevBrary.str_inicia_con(id,'.') ?
                    DevBrary.str_quitar_espacios_extra((id) ):
                    DevBrary.str_quitar_espacios_extra(('#'+id));
                return id;
            }
        }else{
            return id;
        }
    
        return '';
    }
    
    static dom_str_a_unidad_de_medida(t) {
        t = DevBrary.str_convertir_a_sting(t);
        let arrayUnidades = ['px','%','vh','rem','em'];
    
        for (let i=0; i<arrayUnidades.length;i++){
            if (DevBrary.str_termina_con(t,arrayUnidades[i])){
                return arrayUnidades[i];
            }
        }
    
        t = DevBrary.str_conseguir_numero_string(t);
        return (DevBrary.is_numero(t)) ? t+'px': false;
    }
    
    static dom_cambiar_width_heigth(idElemento, width=null, height = null, minWidth = null, minHeight = null) {
        idElemento = DevBrary.dom_str_a_id(idElemento);
        
        if(DevBrary.dom_existe_elemento(idElemento)){
            let estilosArray       = [width, height, minWidth, minHeight];
            let estilosTituloArray = ['width', 'height', 'min-width', 'min-height'];
            let atributos          = '';
    
            for (let i=0;i<4;i++){
                if(estilosArray[i] && (DevBrary.is_numero(estilosArray[i]) || DevBrary.is_numero(DevBrary.str_conseguir_numero_string(estilosArray[i]))) ){
                    estilosArray[i] = DevBrary.str_quitar_espacios_blancos(DevBrary.str_to_lower(DevBrary.str_convertir_a_sting(estilosArray[i])));
                    estilosArray[i] = DevBrary.dom_str_a_unidad_de_medida(estilosArray[i]);
    
                }else {
                    estilosArray[i] = false;
                }
    
            }
    
            for (let i=0;i<4;i++){
                if(estilosArray[i]){
                    atributos = estilosTituloArray[i]+':'+estilosArray[i]+' ';
                }
            }
    
            return DevBrary.dom_style_agregar(idElemento,atributos);
        }
    
        return false;
    }
    
    static dom_style_agregar(idElemento,atributos,reemplazar=false) {
        idElemento = DevBrary.dom_str_a_id(idElemento);
        
        if(DevBrary.dom_existe_elemento(idElemento)){
            let estilos = !reemplazar ? DevBrary.dom_obj_attr(idElemento,'style') : ''
            DevBrary.dom_obj_attr(idElemento,'style',estilos+atributos)
            return true;
        }
    
        return false;
    }
    
    static dom_crear_iframe(url,idElementoPadre='body',id='iframe',clases='',width='',height='',arrayAtributosTitulo=null,arrayAtributosValores=null) {
        idElementoPadre = DevBrary.dom_str_a_id(idElementoPadre);
    
        if(DevBrary.form_url(url) && DevBrary.url_pagina_existe(url) && DevBrary.dom_existe_elemento(idElementoPadre)){
            width  = DevBrary.dom_str_a_unidad_de_medida(width);
            width  = width  ? width  : '';
    
            height = DevBrary.dom_str_a_unidad_de_medida(height);
            height = height ? height : '';
    
            let arrayTituloValor = DevBrary.dom_generar_array_titulo_valor(DevBrary.arr_unir_arrays(['src','width','height'],arrayAtributosTitulo),DevBrary.arr_unir_arrays([url,width,height], arrayAtributosValores));
    
            return DevBrary.dom_crear_elemento('iframe','',idElementoPadre,id,clases,'',arrayTituloValor[0],arrayTituloValor[1]);
        }
    
        return false;
    }
    
    static dom_generar_array_titulo_valor(arrayAtributosTitulo,arrayAtributosValores) {
        if(DevBrary.is_array(arrayAtributosTitulo) && DevBrary.is_array(arrayAtributosValores)){
            let arrayTituloValor = new Array(2);
            let arrayTitulo      = [];
            let arrayValores     = [];
            let j                = 0;
    
            for (let i=0; i<arrayAtributosTitulo.length; i++){
                if(DevBrary.is_string(DevBrary.str_convertir_a_sting(arrayAtributosTitulo  [i]),1) &&
                    DevBrary.is_string(DevBrary.str_convertir_a_sting(arrayAtributosValores[i]),1) ){
                    arrayTitulo .push(arrayAtributosTitulo [i]);
                    arrayValores.push(arrayAtributosValores[i]);
                    j++;
                }
            }
    
            if (j>0){
                arrayTituloValor[0] = arrayTitulo;
                arrayTituloValor[1] = arrayValores;
                return arrayTituloValor;
            }
            
            return false;
        }else
        if( DevBrary.is_string(DevBrary.str_convertir_a_sting(arrayAtributosTitulo), 1) &&
            DevBrary.is_string(DevBrary.str_convertir_a_sting(arrayAtributosValores),1) ){
    
            arrayTituloValor[0] = arrayAtributosTitulo;
            arrayTituloValor[1] = arrayAtributosValores;
            return arrayTituloValor;
        }
        return false;
    }
    
    static dom_crear_elemento_con_string(etiqueta,contenido='',idElementoPadre='body',atributos='',cerrado=true) {
        let elemento = `<${etiqueta} ${atributos}>${contenido}`;
        elemento    += (cerrado) ? `</${etiqueta}>` : '';
        return DevBrary.dom_agregar_html(elemento,idElementoPadre);
    }
    
    static dom_crear_elemento_personalizado(etiqueta,contenido='',idElementoPadre='body',id='',clases='',arrayAtributosTitulo=null,arrayAtributosValores=null,etiquetaCerrada=true) {
        idElementoPadre = DevBrary.dom_str_a_id(idElementoPadre);
       
        if(DevBrary.is_string(etiqueta,1) && DevBrary.dom_existe_elemento(idElementoPadre)){
            let atributos = DevBrary.dom_generar_string_atributos(arrayAtributosTitulo.push('class'),arrayAtributosValores.push(clases));
            let elemento  = `<${etiqueta} id="${id}" ${atributos}>${contenido}`;
            elemento      = (etiquetaCerrada) ? elemento+`</${etiqueta}>` : elemento ;
            return DevBrary.dom_agregar_html(elemento,idElementoPadre);
        }
    
        return false;
    }
    
    static dom_generar_texto_de_html(etiqueta,contenido='',id='',clases='',arrayAtributosTitulo=null,arrayAtributosValores=null,etiquetaCerrada=true) {
        if(DevBrary.is_string(etiqueta,1)){
            let atributos = DevBrary.dom_generar_string_atributos(arrayAtributosTitulo.push('class'),arrayAtributosValores.push(clases));
            let elemento  = `<${etiqueta} id="${id}" ${atributos}>${contenido}`;
            return(etiquetaCerrada) ? elemento+`</${etiqueta}>` : elemento ;
        }
    
        return false;
    }
    
    static dom_agregar_html(textoHtml,idElementoPadre,alFinal=true) {
        idElementoPadre = DevBrary.dom_str_a_id(idElementoPadre);
      
        if (DevBrary.dom_existe_elemento(idElementoPadre) && DevBrary.str_reg_incluye(textoHtml,/(<)(.|\n)+(>)$/)){
            if (alFinal){
                $(idElementoPadre).append(textoHtml);
            }else {
                $(idElementoPadre).prepend(textoHtml);
            }
            return true;
        }
    
        return false;
    }
    
    static dom_agregar_jquery(version='1.3.1',etiquetaPadre='head',logCargado=false) {
        //etiquetaPadre = DevBrary.dom_es_etiqueta_html(etiquetaPadre) ? etiquetaPadre : 'head';
        // agregamos archivo-ltr.css o archivo-rtl.css
        let script = document.createElement( "script" );
        script.type = "text/javascript";
        script.src = `https://ajax.googleapis.com/ajax/libs/jquery/${version}/jquery.min.js`;
      
        if(logCargado){
            script.onload = function () {
                echo('JQuery '+version+' ha sido cargado correctamente');
            };
        }
    
        document.getElementsByTagName(etiquetaPadre)[0].appendChild(script);
    }
    
    static dom_get_js(url) {
        if(DevBrary.form_url(url)){
            $.getScript( url, function( data, textStatus, jqxhr ) {
                echo( "Script cargado")
            }).fail(function(error) {
                echo( "Script error" ,error)
            })
        }
    
    }
    
    static dom_convertir_html_a_jpg(idElemento,nombreArchivo='screenshot-'+DevBrary.str_sin_caracteres_especiales(DevBrary.fec_fecha_actual()),mostrarLogCargado){
        DevBrary.dom_get_js( "https://www.linkeapy.ga/assets/js/htmltocanvas.js")
        DevBrary.dom_get_js( "https://www.linkeapy.ga/assets/js/filesaver.js")
    
        idElemento = DevBrary.dom_str_a_id(idElemento);
        
        html2canvas($(idElemento), {
            onrendered: function(canvas) {
                theCanvas = canvas;
                canvas.toBlob(function(blob) {
                    saveAs(blob, nombreArchivo+".jpg");
                });
            }
        });
    }
    
    static dom_agregar_js_a_iframe(id,script, scriptId='script-iframe') {
        id = DevBrary.dom_str_a_id(id)
        var $iframes = $(id);
        
        $iframes.each(function () {
            var thisDoc = this.contentWindow.document;
            if ( ! thisDoc.getElementById(scriptID)) {
                var scriptObj = thisDoc.createElement("script");
                scriptObj.type = "text/javascript";
                scriptObj.id = scriptId;
                scriptObj.innerHTML = script;
                thisDoc.body.appendChild(scriptObj);
            }
        });
    }
    
    static dom_class_replace(idElemento,classBuscar,classReemplazar='') {
        idElemento = DevBrary.dom_str_a_id(idElemento)
       
        if (DevBrary.dom_existe_elemento(idElemento)){
            $(idElemento).removeClass(classBuscar).addClass(classReemplazar)
            return true
        }
    
        return false;
    }
    
    static dom_class_toogle(idElemento,classBuscar,classReemplazar='') {
        idElemento = DevBrary.dom_str_a_id(idElemento)
       
        if (DevBrary.dom_existe_elemento(idElemento)){
            $(idElemento).toggleClass(classBuscar)
            $(idElemento).toggleClass(classReemplazar)
            return true
        }
    
        return false;
    }
    
    static dom_scroll_top(velocidadMS = 500){
        $("html, body").animate({scrollTop: 0}, 500);
    }
    
    /*Array*/
    
    static arr_unir_arrays(array1,array2) {
        let result;
        
        if (DevBrary.is_array(array1) && DevBrary.is_array(array2)){
            result = array1.concat(array2);
        }else if(DevBrary.is_array(array1)){
            result = array1;
        }else if(DevBrary.is_array(array2)){
            result = array2;
        }else{
            result = false;
        }
    
        return result;
    }
    
    static arr_incluye_texto(array,t,logitudTexto=1) {
        if(DevBrary.is_array(array) && DevBrary.is_string(t,logitudTexto)){
            return array.includes(t);
        }
    
        return false;
    }
    
    static arr_print_array(array,detalles=false,retornar=false,tipoDeDato=false) {
        DevBrary.test_print_array(array,null,detalles,retornar,tipoDeDato)
    }
    
    static arr_count(array) {
        return DevBrary.is_array(array) ? array.length : false
    }
    
    static arr_is_in_array(array,valor) {
        let result = false
    
        if (DevBrary.is_array(array)){
            if (DevBrary.is_array(valor)){
                let i  = 0
                result = true
    
                for(let value of valor){
                    if (!array.includes(value)){
                        result = false
                        break
                    }
                }
    
            }
    
        }else {
            result = array.includes(valor)
        }
    
        return result
    }
    
    static arr_extraer_en_partes(array,inicio,fin=undefined) {
        if (DevBrary.is_array(array)){
            return array.slice(inicio, (DevBrary.is_undefined(fin) ? count(array)-1 : fin) )
        }
    
        return false
    }
    
    static arr_posicion_en_array(array,busqueda) {
        if (DevBrary.is_array(array) && (DevBrary.is_string(busqueda,1) || DevBrary.is_numero(busqueda))){
            return array.indexOf(busqueda)
        }
    
        return false
    }
    
    /*HTML*/
    
    static html_permitir_caracteres_input( permitidos,caracteresExtra='', elEvento = event) {
        //Se usa con onkeypress
        // onkeypress="return DevBrary.html_permitir_caracteres_input('num')"
        // onkeypress="return DevBrary.html_permitir_caracteres_input('car')"
        // onkeypress="return DevBrary.html_permitir_caracteres_input('num_car')"
        // Variables que definen los caracteres permitidos
        let numeros            = "0123456789"+caracteresExtra;
        let caracteres         = " abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZáéíóúÁÉÍÓÚ"+caracteresExtra;
        let numeros_caracteres = numeros + caracteres;
        let teclas_especiales  = [8, 37, 39, 46];
        // 8 = BackSpace, 46 = Supr, 37 = flecha izquierda, 39 = flecha derecha
    
    
        // Seleccionar los caracteres a partir del parámetro de la función
        switch(permitidos) {
            case 'num':
            case 'numero':
            case 'numeros':
                permitidos = numeros;
                break;
            case 'car':
            case 'caracteres':
            case 'letras':
            case 'texto':
                permitidos = caracteres;
                break;
            case 'num_car':
            case 'alfanumerico':
            case 'letrasnumeros':
            case 'numerosyletras':
                permitidos = numeros_caracteres;
                break;
        }
    
        // Obtener la tecla pulsada
        var evento = elEvento || window.event;
        var codigoCaracter = evento.charCode || evento.keyCode;
        var caracter = String.fromCharCode(codigoCaracter);
    
        // Comprobar si la tecla pulsada es alguna de las teclas especiales
        // (teclas de borrado y flechas horizontales)
        var tecla_especial = false;
        for(var i in teclas_especiales) {
            if(codigoCaracter == teclas_especiales[i]) {
                tecla_especial = true;
                break;
            }
        }
    
        // Comprobar si la tecla pulsada se encuentra en los caracteres permitidos
        // o si es una tecla especial
        return permitidos.indexOf(caracter) != -1 || tecla_especial;
    }
    
    static html_limitar_input(cantidadCaracteres,evento=event) {
        let elemento  = (evento.srcElement);
        let unicode   = evento.keyCode? evento.keyCode : evento.charCode;
        let contenido = DevBrary.str_convertir_a_sting($(elemento).val());
    
        // Permitimos las siguientes teclas:
        // 8 backspace
        // 46 suprimir
        // 13 enter
        // 9 tabulador
        // 37 izquierda
        // 39 derecha
        // 38 subir
        // 40 bajar
    
        if(unicode==8 || unicode==46 || unicode==13 || unicode==9 || unicode==37 || unicode==39 || unicode==38 || unicode==40){
            return true;
        }
    
        // Si ha superado el limite de caracteres devolvemos false
        return (!contenido.length>=cantidadCaracteres);
    }
    
    static html_no_permitir_espacios_input(evento=event) {
        let elemento   = (evento.srcElement);
        let unicode    = evento.keyCode? evento.keyCode : evento.charCode;
        let contenido  = DevBrary.str_convertir_a_sting($(elemento).val());
        if(unicode==9 || unicode==20 || unicode==13){
            return false;
        }
    }
    
    static html_input_text(cantidadCaracteres=false,conEspacios=true,evento=event) {
        cantidadCaracteres = !(cantidadCaracteres) ? (cantidadCaracteres).length : cantidadCaracteres;
        let limitar        = DevBrary.html_limitar_input(cantidadCaracteres,evento);
        let espacios       = (conEspacios) ? DevBrary.html_no_permitir_espacios_input(evento) : true;
    
        return limitar && espacios;
    }
    
    /*LLAMADA DE FUNCION MÁS BREVE*/
    /*
    function echo (texto,valor=false){
        DevBrary.test_echo(texto,valor);
    }
    function var_dump (texto,imprimir=true,retornar=false){
        DevBrary.test_var_dump(texto,imprimir,retornar);
    }
    function var_dom_dump (texto){
        DevBrary.test_var_dom_dump(texto);
    }
    function t_trim(t) {
        return DevBrary.str_quitar_espacios_extra(t)
    }
    function count(array){
        return DevBrary.arr_count(array)
    }
    */    
}
