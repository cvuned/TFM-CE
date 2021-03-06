//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++
//Variables globales:
//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++

var personId = Math.floor((Math.random() * 1000000) + 1);
var group =99; 
//var Balanceo = Math.floor(Math.random()*2 + 1);
var state=99;           //controla el ensayo dentro de cada fase
var stateTexto=99;      //controla la pantalla de textos
var fase = 0;           //controla en qué fase estamos
var stateQuest = 1;     //controla en qué pregunta del cuestionario estamos
var training=[];        //contendrá el array de ensayos
var data=[];            //contendrá los datos.
var fecha="";           //contendrá la fecha/hora.
var Cuestionario=[];    //contiene las respuestas al cuestionario de generalizacion
var t0 = 0; 
var t1 = 0; 

// Indicadores de estado para ver qué pregunta se lanza  
var juiciorealizado =0;
var confianzaevaluada =0;
var riesgoevaluado =0;

//variables demográficas:
var Gender=""; 
var	Age=99;
var Experience=99;
var BalPanel = Math.floor((Math.random() * 2) + 1); //para aleatorizar la posición del panel de respuesta para cada sujeto
var PartIP = "";


var PregInduccionPrecio = "";	// No se usa, TFK comprobar y eliminar
var PregInduccion = ""; 		// No se usa, TFK comprobar y eliminar

// Seguimiento de los participantes en cada grupo para adjudicar contrabalanceo o no
var balanceo = 1;  		// controla el número de participantes del grupo de contrabalanceo
var experimental = 0; 	// controla el número de participantes del grupo de contrabalanceo

//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++
//Funciones generales:
//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++


//función para inyectar HTML:
function pintarHTML(targetDiv, htmlContenido){ 
	document.getElementById(targetDiv).innerHTML=htmlContenido;
}

//función para desordenar arrays...
function shuffle(array) {    
    var rand, 
        index = -1,        
        length = array.length,        
        result = Array(length);    
    while (++index < length) {        
        rand = Math.floor(Math.random() * (index + 1));        
        result[index] = result[rand];        
        result[rand] = array[index];    }    
    return result;
}


//función para rellenar arrays...
function fillArray(value, len) { 
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr.push(value);
  }
  return arr;
}
    
//funciones para mostrar/ocultar paneles:
function mostrar(panel){panel.style.display="block";}
function ocultar(panel){panel.style.display="none";}


//función de fecha:
function stringDate() {
  var fecha = new(Date);
  return(String(fecha.getDate() + "/" + (fecha.getMonth()+1) + "/" + fecha.getFullYear() + "-" + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds()));
}


//precache de imágenes:
var preloadImages="img/BatatrimBoton.png, img/enfermo.png, img/noBatatrimBoton.png, img/noBatatrimBoton2.png, img/Nooutcome.png, img/outcome.png, img/outcomeAvion.png, img/outcomeNoAvion.png, img/Sano.png, img/uned.png, img/RecalibradoNo.png, img/RecalibradoSi.png".split(",");
var tempIMG=[];

function preloadIMG(){
	for (var i=0;i<preloadImages.length;i++){
		tempIMG[i]=new Image();
		tempIMG[i].src=preloadImages[i];    }
}

//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++
//Función ARRANCA:
//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++

//función global
function arranca(){
    //preloadIMG();
    //GeneraEnsayos();
    
	// firebase.database().ref().on("value", gotData, errData); 	// MODO DEMO SIN CONEXIÓN
	
	
	// Ver IP
	PartIP = myip;
	//console.log("my IP is: "+PartIP+"."); //debug
	
	function gotData(data) {
		
		//console.log("-------EMPIEZA EL UPDATE!----------") 		// debug
	    //console.log(data.val());									// debug
	    //console.log("Experimental: "+experimental+".");			// debug
	    //console.log("Balanceo: "+balanceo+".");					// debug
	    
	    // balanceo = data.val().GrupoControlContrabalanceo;		// MODO DEMO SIN CONEXIÓN
	    // experimental = data.val().GrupoControlExp;				// MODO DEMO SIN CONEXIÓN

	    //console.log("Experimental: "+experimental+".");			// debug
	    //console.log("Balanceo: "+balanceo+".");					// debug
	  
	    //if(balanceo > experimental){								// debug (el condicional entero)
		//	console.log("Arranca(): Balanceo > experimental");    
		//	console.log("porque"+balanceo+" > que "+experimental+", ole");
		//}
		//else {
		//	console.log("Arranca(): Pues no, experimental Igual o mayor");
		//	console.log("porque"+experimental+" > que "+balanceo+", ole");
		//}
		//console.log("-------UPDATE COMPLETO!----------")			// debug
	};
		
	function errData(err) {
		console.log("Error!");
		console.log(err);
	};
	
	state=0;
    stateTexto=0;
    fase=0;
    
    //genero las cadenas de outcomes:
    
    switch (Fase1.Contingencia){
        case "ContNula": 
            
            for(var i=0; i<5; i++){ //creo 5 bloques de 10 con 70% de éxito
                var arrayOutcome= [1, 1, 1, 1, 1, 1, 1, 0, 0, 0];
                arrayOutcome=shuffle(arrayOutcome);
                Fase1.posibleOutcomes=Fase1.posibleOutcomes.concat(arrayOutcome);
                
                var arrayOutcome3= [1, 1, 1, 1, 1, 1, 1, 0, 0, 0];
                arrayOutcome3=shuffle(arrayOutcome3);
                Fase2.posibleOutcomes=Fase2.posibleOutcomes.concat(arrayOutcome3);

                
            }
            break;
			//console.log(arrayOutcome);	// debug
			//console.log(arrayOutcome2);	// debug
			//console.log(arrayOutcome3);	// debug
			//console.log(arrayOutcome4);	// debug
        case "ContPositiva": // Esto no debería ejecutarse TFK 
            for(var i=0; i<5; i++){ //creo 5 bloques...
                var arrayOutcome= [1, 1, 1, 1, 1, 1, 0, 0];
                arrayOutcome=shuffle(arrayOutcome);
                Fase1.posibleOutcomesYES=Fase1.posibleOutcomesYES.concat(arrayOutcome);
                var arrayOutcome2= [1, 0, 0, 0, 0, 0, 0, 0];
                arrayOutcome2=shuffle(arrayOutcome2);
                Fase1.posibleOutcomesNO=Fase1.posibleOutcomesNO.concat(arrayOutcome2);
                
                var arrayOutcome3= [1, 1, 1, 1, 1, 1, 0, 0];
                arrayOutcome3=shuffle(arrayOutcome3);
                Fase2.posibleOutcomesYES=Fase2.posibleOutcomesYES.concat(arrayOutcome3);
                var arrayOutcome4= [1, 1, 1, 1, 1, 1, 0, 0];
                arrayOutcome4=shuffle(arrayOutcome4);
                Fase2.posibleOutcomesNO=Fase2.posibleOutcomesNO.concat(arrayOutcome4);
                
            }             
    }
    
    pregInduccion();
    //if(group=="control"){
    //    siguienteTexto();    
    //}
    //else if(group=="Experimental"){
    //    pregInduccion();	  
    //}
	
    
    alert("Pulsa F11 para verme a pantalla completa.");
}


function asignagrupo() {

	group= "Experimental";	
	// En función del número de participantes que hayan realizado la tarea en la secuencia normal
	// y de contrabalanceo, asigna a un grupo o a otro al participante. 
	if(balanceo > experimental){
        //console.log("Balanceo > experimental");    						// debug
		//console.log("porque"+balanceo+" > que "+experimental+", ole");	// debug
		group= "Experimental"; 
		//console.log("If: Pues te ha tocado grupo :"+group+".");			// debug
		// GRUPO EXPERIMENTAL Normal: Tarea aeronáutica -> Tarea alergia
		training=[Fase2, Fase1];

	}
	else {
		//console.log("Pues no, experimental Igual o mayor"); 				// debug
		//console.log("porque"+experimental+" > que "+balanceo+", ole");	// debug
		group= "Contrabalanceo"; //se asigna el grupo manualmente
		// group= "Experimental"; //Solo para pruebas cuando el contrabalanceo no estaba
		//console.log("Else: Pues te ha tocado grupo : Contrabalanceo, pero como TFK estamos de testeo: "+group+"."); // debug
		// EXPERIMENTAL Contrabalanceo: Tarea alergia -> Tarea aeronáutica
		// training=[Fase2, Fase1]; // Solo para pruebas cuando el contrabalanceo no estaba
		training=[Fase1, Fase2];  

	}
    //console.log("Pues te ha tocado grupo :"+group+".");					// debug
	//group= "Experimental"; //se asigna el grupo manualmente
    // group= "Control"; //se asigna el grupo manualmente - TFK Parece que no va... 
}    
//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++
//GENERACION DE ENSAYOS:
//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++

//var ordenContingencias = shuffle(["ContNula", "ContPositiva"]); //decide al azar el orden de las fases
var ordenContingencias = shuffle(["ContNula", "ContNula"]); // No decided nada. 

var Fase1 = {
  	nombreClave: "Batatrim",
	nombreSindrome: "Síndrome de Lindsay",
	ImagenClave: "img/BatatrimBoton.png",
	ImagenNOClave: "img/noBatatrimBoton.png",
	ImagenSindrome: "img/Nooutcome.png",
	ImagenSano: "img/outcome.png",
    numTrials: 50,
    posibleOutcomes: [],
    secuenciaCells: [],
    secuenciaResps: [],
    Contingencia: ordenContingencias[0],
    Juicio: 999,
    Confianza: 999,
	Riesgo: 999,
	TiemposRespuesta: [],
}

var Fase2 = {
	nombreClave: "recalibrado",
	nombreSindrome: "Comportamientos erráticos de los sensores",
	ImagenClave: "img/RecalibradoSi.png",
	ImagenNOClave: "img/RecalibradoNo.png",
	ImagenSindrome: "img/outcomeNoAvion.png",
	ImagenSano: "img/outcomeAvion.png",
    numTrials: 50,
    posibleOutcomes: [],   
    secuenciaCells: [],
    secuenciaResps: [],
    Contingencia: ordenContingencias[1],
    Juicio: 999,
    Confianza: 999,
	Riesgo: 999,
	TiemposRespuesta: [],
}

function RandomString(length){
    var mask = 'ABCDEFGHIJKLMNOPQRSTUVW';
//    var mask = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    return result;
}


function showCue(){
    ocultar(divTextos);
    ocultar(divEleccion);
    ocultar(divOutcome);
    ocultar(divBoton);
    	
    document.getElementById("divPreStatus").classList.remove('FadeOut');
    
    mostrar(divContingencia);
    
	t0 = performance.now(); // Medir tiempos
	//console.log("El tiempo actual es: "+t0+"."); // debug
	
	if(training[fase] == Fase2){ 
		pintarHTML("divPreStatus", "<img src=\""+Fase2.ImagenSindrome+"\" width=250px>"+
				"<br><br><br><p class=\"mensaje\">El piloto de esta aeronave ha informado de comportamientos erráticos de los sensores de ángulo de ataque.</p><p class=\"mensaje\">¿Quieres recalibrar el sensor?</p>");
    
		pintarHTML("divRegistro", "<h3>Aeronave EC-"+RandomString(3)+"</h3>");
    }
	else if(training[fase] == Fase1){
		pintarHTML("divPreStatus", "<img src=\""+Fase1.ImagenSindrome+"\" width=250px>"+
              "<br><br><br><p class=\"mensaje\">Este paciente tiene el "+Fase1.nombreSindrome+".</p><p class=\"mensaje\">¿Quieres administrarle "+ Fase1.nombreClave+"?</p>");
    
		pintarHTML("divRegistro", "<h3>Paciente "+RandomString(4)+"</h3>");
	}
	
	
    mostrar(divRegistro);
    mostrar(divPreStatus);
    setTimeout('mostrarEleccion()', 500);
    
    //mostrar(divEleccion);
    //setTimeout('mostrar(divEleccion)', 500); 
}

function mostrarEleccion(){
		
	if(training[fase] == Fase1){ 

		if(BalPanel==1){
				pintarHTML('divEleccion',
				   "<div ><button id=\"botonYES\" value=\"YES\" class=\"botonEleccion\" onclick='respuestaYES()'><img src=\""+training[fase].ImagenClave+"\" width=150px class=\"icon icon_hover\" id=\"imagenYES\"></button></div><div ><button id=\"botonNO\" value=\"NO\" class=\"botonEleccion\" onclick='respuestaNO()'><img src=\""+training[fase].ImagenNOClave+"\" width=150px  class=\"icon icon_hover\" id=\"imagenNO\"></button></div><div id=\"mensajeCue\"></div>"
				   );
		}
		else if(BalPanel==2){
				pintarHTML('divEleccion',
				   "<div ><button id=\"botonNO\" value=\"NO\" class=\"botonEleccion\" onclick='respuestaNO()'><img src=\""+training[fase].ImagenNOClave+"\" width=150px  class=\"icon icon_hover\" id=\"imagenNO\"></button></div><div ><button id=\"botonYES\" value=\"YES\" class=\"botonEleccion\" onclick='respuestaYES()'><img src=\""+training[fase].ImagenClave+"\" width=150px class=\"icon icon_hover\" id=\"imagenYES\"></button></div><div id=\"mensajeCue\"></div>"
				   );

		}

		mostrar(divEleccion);
    }
	else if(training[fase] == Fase2){

		if(BalPanel==1){
				pintarHTML('divEleccion',
				   "<div ><button id=\"botonYES\" value=\"YES\" class=\"botonEleccion\" onclick='respuestaYES()'><img src=\""+training[fase].ImagenClave+"\" width=150px class=\"icon icon_hover\" id=\"imagenYES\"></button></div><div ><button id=\"botonNO\" value=\"NO\" class=\"botonEleccion\" onclick='respuestaNO()'><img src=\""+training[fase].ImagenNOClave+"\" width=150px  class=\"icon icon_hover\" id=\"imagenNO\"></button></div><div id=\"mensajeCue\"></div>"
				   );
		}
		else if(BalPanel==2){
				pintarHTML('divEleccion',
				   "<div ><button id=\"botonNO\" value=\"NO\" class=\"botonEleccion\" onclick='respuestaNO()'><img src=\""+training[fase].ImagenNOClave+"\" width=150px  class=\"icon icon_hover\" id=\"imagenNO\"></button></div><div ><button id=\"botonYES\" value=\"YES\" class=\"botonEleccion\" onclick='respuestaYES()'><img src=\""+training[fase].ImagenClave+"\" width=150px class=\"icon icon_hover\" id=\"imagenYES\"></button></div><div id=\"mensajeCue\"></div>"
				   );

		}

		mostrar(divEleccion);
	}
	
    if(BalPanel==1){
            pintarHTML('divEleccion',
               "<div ><button id=\"botonYES\" value=\"YES\" class=\"botonEleccion\" onclick='respuestaYES()'><img src=\""+training[fase].ImagenClave+"\" width=150px class=\"icon icon_hover\" id=\"imagenYES\"></button></div><div ><button id=\"botonNO\" value=\"NO\" class=\"botonEleccion\" onclick='respuestaNO()'><img src=\""+training[fase].ImagenNOClave+"\" width=150px  class=\"icon icon_hover\" id=\"imagenNO\"></button></div><div id=\"mensajeCue\"></div>"
               );
    }
    else if(BalPanel==2){
            pintarHTML('divEleccion',
               "<div ><button id=\"botonNO\" value=\"NO\" class=\"botonEleccion\" onclick='respuestaNO()'><img src=\""+training[fase].ImagenNOClave+"\" width=150px  class=\"icon icon_hover\" id=\"imagenNO\"></button></div><div ><button id=\"botonYES\" value=\"YES\" class=\"botonEleccion\" onclick='respuestaYES()'><img src=\""+training[fase].ImagenClave+"\" width=150px class=\"icon icon_hover\" id=\"imagenYES\"></button></div><div id=\"mensajeCue\"></div>"
               );

    }

    mostrar(divEleccion);
}

function respuestaYES(){
	t1 = performance.now(); // Medir tiempos
	//console.log("El tiempo actual es: "+t1+"."); // debug
	tiempotranscurrido = t1 - t0; //
	//console.log("El tiempo de respuesta es: "+tiempotranscurrido+"."); // debug
	training[fase].TiemposRespuesta.push(tiempotranscurrido); 
	
	
	document.getElementById("botonNO").classList.add('unselected');
    training[fase].secuenciaResps.push(1);
    document.getElementById("imagenYES").classList.remove('icon_hover');
    document.getElementById("imagenYES").classList.remove('icon');
    document.getElementById("imagenNO").classList.remove('icon');
    document.getElementById("imagenYES").classList.add('iconselected');
    
    document.getElementById("botonYES").disabled = true;
    document.getElementById("botonNO").disabled = true;

    document.getElementById("divPreStatus").classList.add('FadeOut');
    mostrar(divPreStatus);
    
	if(training[fase] == Fase2){ 

		pintarHTML("mensajeCue", "<p class=\"mensaje\">Has recalibrado el sensor</p>");
	}
	else if(training[fase] == Fase1){

		pintarHTML("mensajeCue", "<p class=\"mensaje\">Has usado "+training[fase].nombreClave+"</p>");
	}
    
    setTimeout('showOutcome()', 500);
}

function respuestaNO(){
	t1 = performance.now(); // Medir tiempos
	//console.log("El tiempo actual es: "+t1+"."); // debug
	tiempotranscurrido = t1 - t0; //Medir tiempos
	//console.log("El tiempo de respuesta es: "+tiempotranscurrido+".");// debug
	training[fase].TiemposRespuesta.push(tiempotranscurrido); 
	
    document.getElementById("botonYES").classList.add('unselected');
    training[fase].secuenciaResps.push(0);
    document.getElementById("imagenNO").classList.remove('icon_hover');
    document.getElementById("imagenYES").classList.remove('icon');
    document.getElementById("imagenNO").classList.remove('icon');
    document.getElementById("imagenNO").classList.add('iconselected');       
    
    document.getElementById("botonYES").disabled = true;
    document.getElementById("botonNO").disabled = true;
    
    document.getElementById("divPreStatus").classList.add('FadeOut');
    mostrar(divPreStatus);
    
	if(training[fase] == Fase2){ 
		
		pintarHTML("mensajeCue", "<p class=\"mensaje\">No has recalibrado el sensor</p>");
	}
	else if(training[fase] == Fase1){

		pintarHTML("mensajeCue", "<p class=\"mensaje\">No has usado "+training[fase].nombreClave+"</p>");		
	}
    
    setTimeout('showOutcome()', 500);
}


function showOutcome(){

    var imgOutcome = "";
    var textoOutcome = "";
    
    switch(training[fase].secuenciaResps[state]){
        case 1: //si ha respondido 1:
            if(training[fase].posibleOutcomes[state]==1) {
                imgOutcome = training[fase].ImagenSano;
				if(training[fase] == Fase2){ 
				
					textoOutcome = "<br><p class=\"mensaje\">¡El problema ha sido resuelto!</p>";
				}
				else if(training[fase] == Fase1){
			
					textoOutcome = "<br><p class=\"mensaje\">¡El paciente ha superado la crisis!</p>";
				}		
				training[fase].secuenciaCells.push("a");
                //console.log(" debug: cell a");
            }
                
            else if(training[fase].posibleOutcomes[state]==0){
                imgOutcome = training[fase].ImagenSindrome;
				if(training[fase] == Fase2){ 
				
					textoOutcome = "<br><p class=\"mensajeMALO\">¡El problema NO ha sido resuelto!</p>";
				}
				else if(training[fase] == Fase1){
			
	                textoOutcome = "<br><p class=\"mensajeMALO\">¡El paciente NO ha superado la crisis!</p>";
				}		
    
                training[fase].secuenciaCells.push("b");
                //console.log(" debug: cell b");
            }
     
            break;
        case 0: //si ha respondido 0:
            if(training[fase].posibleOutcomes[state]==1) {
                imgOutcome = training[fase].ImagenSano;
				if(training[fase] == Fase2){ 
					textoOutcome = "<br><p class=\"mensaje\">¡El problema ha sido resuelto!</p>";
				
				}
				else if(training[fase] == Fase1){
					textoOutcome = "<br><p class=\"mensaje\">¡El paciente ha superado la crisis!</p>";

				}
				training[fase].secuenciaCells.push("c");   
                //console.log(" debug: cell c"); 				// debug
            }
                
            else if(training[fase].posibleOutcomes[state]==0){
                imgOutcome = training[fase].ImagenSindrome;
               	if(training[fase] == Fase2){ 
					textoOutcome = "<br><p class=\"mensajeMALO\">¡El problema NO ha sido resuelto!</p>";
				
				}
				else if(training[fase] == Fase1){
					textoOutcome = "<br><p class=\"mensajeMALO\">¡El paciente NO ha superado la crisis!</p>";

				}  
                training[fase].secuenciaCells.push("d"); 
                //console.log(" debug: cell d"); 				// debug
            }            
            
    }
        

    pintarHTML('divOutcome', "<img src=\""+imgOutcome+"\" width=250px><br><br>"+textoOutcome);
    if(training[fase] == Fase2){ 
		pintarHTML('divBoton', "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='ITI()' value='Siguiente aeronave'/>")	
	}
	else if(training[fase] == Fase1){
		pintarHTML('divBoton', "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='ITI()' value='Siguiente paciente'/>")	

	}
    mostrar(divOutcome);
    setTimeout('mostrar(divBoton)', 500);
    
    
}


function ITI(){
    
    ocultar(divOutcome);
    ocultar(divContingencia);
	ocultar(divBoton);	
        
    document.getElementById("botonNO").classList.remove('unselected');
    document.getElementById("botonYES").classList.remove('unselected');
    document.getElementById("imagenNO").classList.remove('iconselected');
    document.getElementById("imagenYES").classList.remove('iconselected');

    document.getElementById("imagenNO").classList.add('icon_hover');
    document.getElementById("imagenNO").classList.add('icon');
    document.getElementById("imagenYES").classList.add('icon_hover');
    document.getElementById("imagenYES").classList.add('icon');    
    
    document.getElementById("botonYES").disabled = false;
    document.getElementById("botonNO").disabled = false;
    
    document.getElementById("divPreStatus").classList.remove('FadeOut');
    
    if(state<training[fase].numTrials-1){
        state++;
        setTimeout("showCue()", 500);
    }
     else if(state==training[fase].numTrials-1){

		showJuicio();
		juiciorealizado++;
	
     }
}

function showJuicio(){
    ocultar(divContingencia);
    ocultar(divTextos);
    
    if(training[fase] == Fase2){ 
		textoJuicio= "<p class=\"pregunta\">¿Hasta qué punto crees que el recalibrado es efectivo para resolver los comportamientos erráticos de los sensores de ángulo de ataque?</p>";
	}
	else if(training[fase] == Fase1){
		textoJuicio= "<p class=\"pregunta\">¿Hasta qué punto crees que el "+
			training[fase].nombreClave+" es efectivo para curar las crisis del "+training[fase].nombreSindrome+"?</p>";
	}
		
	textoInstrucciones="<p>Responde usando la siguiente escala, donde los números se interpretan así:</p><ul><li>0: Nada efectivo.</li><li>100: Completamente efectivo.</li></ul><p>Puedes hacer clic dentro de la escala tantas veces como desees hasta marcar el valor que consideres más adecuado. Cualquier valor entre 0 y 100 es válido.</p><br><br>";
	textoJuicio = textoJuicio.concat(textoInstrucciones);
	
	pintarHTML('divPregunta', textoJuicio);
		
    document.getElementById("sliderJuicio").classList.add('sliderCONTPrimero');

    ReseteoJuicios();
    
    document.getElementById("textInput").disabled = true;
    document.getElementById("textInput").value = "";

    
    textoBoton="<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='validaJuicio()' value='Confirmar'/>";
    pintarHTML('divBoton', textoBoton);
    
    mostrar(divJuicio);
    setTimeout('mostrar(divBoton)', 500);

}

function showConfianza(){
    ocultar(divContingencia);
    ocultar(divTextos);
    
    if(training[fase] == Fase2){ 
		textoConfianza= "<p class=\"pregunta\">¿Hasta qué punto estás seguro de tu respuesta sobre la efectividad del recalibrado?</p>";
	}
	else if(training[fase] == Fase1){
		textoConfianza= "<p class=\"pregunta\">¿Hasta qué punto estás seguro de tu respuesta sobre la efectividad del "+training[fase].nombreClave+"?</p>";
	}

	textoInstrucciones="<p>Responde usando la siguiente escala, donde los números se interpretan así:</p><ul><li>0: He respondido al azar.</li><li>100: Completamente seguro.</li></ul><p>Puedes hacer clic dentro de la escala tantas veces como desees hasta marcar el valor que consideres más adecuado. Cualquier valor entre 0 y 100 es válido.</p><br><br>";
	textoConfianza = textoConfianza.concat(textoInstrucciones);
	pintarHTML('divPregunta', textoConfianza);
    
    document.getElementById("sliderJuicio").classList.add('sliderCONTPrimero');

    ReseteoJuicios();
    
    document.getElementById("textInput").disabled = true;
    document.getElementById("textInput").value = "";

    
    textoBoton="<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='validaJuicio()' value='Confirmar'/>";
    pintarHTML('divBoton', textoBoton);
    
    mostrar(divJuicio);
    setTimeout('mostrar(divBoton)', 500);    
}

function showRiesgo(){
    ocultar(divContingencia);
    ocultar(divTextos);
    
    if(training[fase] == Fase2){ 
		textoRiesgo= "<p class=\"pregunta\">¿Qué nivel de riesgo has considerado que tenían tus decisiones para la seguridad de la aeronave?</p>";
	}
	else if(training[fase] == Fase1){
		textoRiesgo= "<p class=\"pregunta\">¿Qué nivel de riesgo has considerado que tenían tus decisiones para la salud de los pacientes?</p>";
	}
	textoInstrucciones="<p>Responde usando la siguiente escala, donde los números se interpretan así:</p><ul><li>0: Ningún riesgo.</li><li>100: Riesgo catastrófico.</li></ul><p>Puedes hacer clic dentro de la escala tantas veces como desees hasta marcar el valor que consideres más adecuado. Cualquier valor entre 0 y 100 es válido.</p><br><br>";
	textoRiesgo = textoRiesgo.concat(textoInstrucciones);

	pintarHTML('divPregunta', textoRiesgo);
    
    document.getElementById("sliderJuicio").classList.add('sliderCONTPrimero');

    ReseteoJuicios();
    
    document.getElementById("textInput").disabled = true;
    document.getElementById("textInput").value = "";

    
    textoBoton="<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='validaJuicio()' value='Confirmar'/>";
    pintarHTML('divBoton', textoBoton);
    
    mostrar(divJuicio);
    setTimeout('mostrar(divBoton)', 500);
    

}


function updateTextInput(val) {
	document.getElementById('textInput').value=val; 
}

function validaJuicio(){
    if (document.getElementById('textInput').value!=""){
		
		// Vamos a grabar el valor del slider en un punto u otro según nuestra fase
		if(training[fase].Juicio==999){
			training[fase].Juicio=document.getElementById('textInput').value;
			//console.log("--- LA HORA DEL JUICIO ESTÁ CERCA!!! ---");			// debug
			//console.log(training[fase].Juicio);								// debug
		}	
		else if(training[fase].Confianza==999){
			training[fase].Confianza=document.getElementById('textInput').value;
			//console.log("--- LA HORA DE LA CONFIANZA ESTÁ CERCA!!! ---");		// debug
			//console.log(training[fase].Confianza);							// debug
		}	
		else if(training[fase].Riesgo==999){
			training[fase].Riesgo=document.getElementById('textInput').value;
			//console.log("--- LA HORA DEL RIESGO ESTÁ CERCA!!! ---");			// debug
			//console.log(training[fase].Riesgo);								// debug
		}
		//training[fase].Juicio=document.getElementById('textInput').value;
        //console.log("--- LA HORA DEL JUICIO ESTÁ CERCA!!! ---");
		//console.log(training[fase].Juicio);
		document.getElementById("sliderJuicio").classList.remove('sliderCONTPrimero');
        
		if(confianzaevaluada==0){
			showConfianza();
			confianzaevaluada++;
		}
		else if(riesgoevaluado==0){
			showRiesgo();
			riesgoevaluado++;
		}	
		else if(riesgoevaluado==1){
			cambiafase();
		}
        
	}
	else {
        alert("Contesta la pregunta");
        document.getElementById("sliderJuicio").classList.add('sliderCONTPrimero');
        document.getElementById("textInput").value = "";
         }   
}

function cambiafase(){
    if(fase==0) {
        fase++;
        state=0; 
        
		juiciorealizado=0;
		confianzaevaluada=0;
		riesgoevaluado=0;
     }
    
    siguienteTexto();
}

function ReseteoJuicios(){
	document.getElementById('sliderJuicio').value=-10000;
	document.getElementById('textInput').value="";
}


//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++
//FUNCIONES DE CONTROL DE TEXTOS:
//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++


function siguienteTexto(){
	
	mostrar(divTextos);
	mostrar(divBoton);
    ocultar(divContingencia);
    ocultar(divJuicio);
    ocultar(divCuestionariosEdad);
	
    htmlContenido=arrayInstruc[stateTexto];
	htmlBotones=arrayBoton[stateTexto];
	
	pintarHTML("divTextos",htmlContenido);
    pintarHTML("divBoton",htmlBotones);

    stateTexto++;	
}

function previoTexto(){
	stateTexto=stateTexto-2;
    siguienteTexto();
}

// Inicializamos el arrayInstruc con el modo experimental normal
// si estamos con grupo de contrabalanceo habrá que cambiarlo. 
var arrayInstruc=[
	//0: (portada) 
	"<h2 class=\"titulo\">MÁSTER UNIVERSITARIO EN INVESTIGACIÓN EN PSICOLOGÍA</h2><p>¡Muchas gracias por participar en este trabajo fin de máster!</p><br><br><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"img/uned.png\" width=\"200px\"><p>Sigue las instrucciones que encontrarás a continuación.</p>",
		
	// EXPERIMENTAL! Instrucciones modificadas para la tarea AERONÁUTICA
	//2: Instrucciones 1
	"<h3 class=\"titulo\">Instrucciones</h3><p align=\"left\">Imagina que eres un ingeniero que trabaja para una aerolínea. Eres especialista en sistemas de navegación y mandos de vuelo,  trabajas resolviendo problemas que hay que tratar muy rápido durante el día a día para poder operar con normalidad. <br><br>Los pilotos de un cierto modelo de avión de la aerolínea están informando de comportamientos erráticos de los sensores de ángulo de ataque, necesarios para calcular la posición y actitud (orientación) del avión.</p>",
	
	//3: Instrucciones 2.a
	"<h3 class=\"titulo\">Instrucciones</h3><p>A pesar de que los comportamientos no se reproducen en tierra ni producen registros de fallos, se sospecha que estos problemas pueden deberse a una calibración incorrecta del sensor que no es detectable. Por lo que se soluciona realizando una nueva calibración del sensor. La causa raíz de este problema está aún en fase de investigación, por lo que todavía no se ha comprobado claramente que sea efectiva.<br><br> Además, debes saber que esta re-calibración es una tarea larga y complicada con consecuencias que pueden ser graves, por lo que no siempre es posible realizarla.</p>",
	
	//4: Instrucciones 2.b
	"<h3 class=\"titulo\">Instrucciones</h3><p>Te vamos a presentar una serie de informes de pilotos de aeronaves en servicio que sufren este fallo. <br><br>El procedimiento será el siguiente: para cada nueva aeronave, debes decidir si quieres recalibrar el sensor o no, pulsando la imagen correspondiente de las dos siguientes.</p><br><br><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+Fase2.ImagenClave+"\" width=\"150px\"></td><td><img src=\""+Fase2.ImagenNOClave+"\" width=\"150px\"></td></tr><tr><td>Recalibrar el sensor</td><td>No recalibrar el sensor</td></tr></table><br><br>",
		
	//5: Instrucciones 2.c
	"<p><h3 class=\"titulo\">Instrucciones</h3>A continuación te informaremos de si el problema fue resuelto. Después de darte esa información, se te presentará la siguiente aeronave.</p><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+Fase2.ImagenSindrome+"\" width=\"150px\"></td><td><img src=\""+Fase2.ImagenSano+"\" width=\"150px\"></td></tr><tr><td>Problema no resuelto</td><td>Problema resuelto</td></tr></table><p>Intenta averiguar si el recalibrado es realmente efectivo. Cuando hayas revisado un buen número de aeronaves te haremos algunas preguntas.</p>"
	,
			
	//6: Instrucciones de la tarea de ALERGIAS
	"<p><h3 class=\"titulo\">Instrucciones</h3><p>Ya has terminado de estudiar el problema de comportamientos erráticos de los sensores de ángulo de ataque. Muchas gracias por tu colaboración.</p><p>Ahora imagina que eres un médico que trabaja en el laboratorio de investigación de una universidad. Eres especialista en una enfermedad muy rara y peligrosa llamada "+ Fase1.nombreSindrome+", que hay que tratar muy rápido en urgencias. </p>",

	//6: Instrucciones 1b Phase 2:
	"<p><h3 class=\"titulo\">Instrucciones</h3><p>Las crisis que provoca esta enfermedad podrían curarse inmediatamente con una medicina llamada "+ Fase1.nombreClave+", pero esta medicina aún está en fase experimental, por lo que todavía no se ha comprobado claramente su efectividad.<br><br>Te vamos a presentar una serie de fichas médicas de pacientes que están sufriendo una crisis del "+Fase1.nombreSindrome+". En cada ficha verás un paciente y se te dará la oportunidad de administrarle o no el "+Fase1.nombreClave+".</p><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+Fase1.ImagenClave+"\" width=\"150px\"></td><td><img src=\""+Fase1.ImagenNOClave+"\" width=\"150px\"></td></tr><tr><td>Administrar la medicina</td><td>No administrar la medicina</td></tr></table>",
			
	//7: Instrucciones 2 Phase 2
	"<h3 class=\"titulo\">Instrucciones</h3><p>A continuación te informaremos de si el paciente superó la crisis. Después de darte esa información, se te presentará la ficha del siguiente paciente. </p><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+Fase1.ImagenSindrome+"\" width=\"150px\"></td><td><img src=\""+Fase1.ImagenSano+"\" width=\"150px\"></td></tr><tr><td>Paciente enfermo</td><td>Paciente curado</td></tr></table><br><p>Intenta averiguar hasta qué punto es efectivo el "+Fase1.nombreClave+ ". Cuando hayas tratado a un buen número de pacientes te haremos algunas preguntas.</p>",
			
	// A guardar datos via Firebase!  
	//13: Save Data...
	"<h3 class=\"titulo\">Envío de datos</h3><p>A continuación podrás enviar los resultados para que se incluyan en nuestro estudio. Los datos que nos aportes se unirán a los del grupo y serán analizados estadísticamente.</p><p align=\"left\"> Para hacerlo, haz click en el botón \"Enviar\".</p>",
			
	//13:
	"<h3 class=\"titulo\">Ya has terminado. ¡Muchas gracias por tu colaboración!</h3><p><br>Pulsa F11 para salir del modo pantalla completa.<br>Autor: <br>Carlos Vera <br><br> Tutores del Trabajo Fin de Máster:<br> Pedro Montoro, Cris Orgaz y María José Contreras.</p>"		
]; 

function prepararInstrucciones(){

	if(group == "Experimental"){
        // GRUPO EXPERIMENTAL Normal: Tarea aeronáutica -> Tarea alergia
		//console.log("Estamos generando instrucciones para el grupo Experimental");    	// debug
		// No hay que modificar el arrayInstruc
	}
	else {
        // GRUPO EXPERIMENTAL Contrabalanceo: Tarea alergia -> Tarea aeronáutica
		//console.log("Estamos generando instrucciones para el grupo de Contrabalanceo")	// debug
		// Hay que modificar el arrayInstruc
		arrayInstruc=[
			//0: (portada) 
			"<h2 class=\"titulo\">MÁSTER UNIVERSITARIO EN INVESTIGACIÓN EN PSICOLOGÍA</h2><p>¡Muchas gracias por participar en este trabajo fin de máster!</p><br><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"img/uned.png\" width=\"200px\"><p>Sigue las instrucciones que encontrarás a continuación.</p>",	
			
			//2: Instrucciones 1
			"<h3 class=\"titulo\">Instrucciones</h3><p align=\"left\">Imagina que eres un médico que trabaja en el laboratorio de investigación de una universidad. Eres especialista en una enfermedad muy rara y peligrosa llamada "+ Fase1.nombreSindrome+", que hay que tratar muy rápido en urgencias. Las crisis que provoca esta enfermedad podrían curarse inmediatamente con una medicina llamada "+ Fase1.nombreClave+", pero esta medicina aún está en fase experimental, por lo que todavía no se ha comprobado claramente su efectividad.</p><br>",
			
			//3: Instrucciones 2.a
			"<h3 class=\"titulo\">Instrucciones</h3><p>Te vamos a presentar una serie de fichas médicas de pacientes que están sufriendo una crisis del "+Fase1.nombreSindrome +". En cada ficha verás un paciente y se te dará la oportunidad de administrarle o no el "+Fase1.nombreClave+ ".</p>",
			
			//4: Instrucciones 2.b
			"<h3 class=\"titulo\">Instrucciones</h3><p>El procedimiento será el siguiente: para cada nuevo paciente, debes decidir si quieres administrar el "+Fase1.nombreClave+ " o no, pulsando la imagen correspondiente de las dos siguientes.</p><br><br><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+Fase1.ImagenClave+"\" width=\"150px\"></td><td><img src=\""+Fase1.ImagenNOClave+"\" width=\"150px\"></td></tr><tr><td>Administrar la medicina</td><td>No administrar la medicina</td></tr></table><br><br>",
			
			//5: Instrucciones 2.c
			"<p><h3 class=\"titulo\">Instrucciones</h3>A continuación te informaremos de si el paciente superó la crisis. Después de darte esa información, se te presentará la ficha del siguiente paciente.</p><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+Fase1.ImagenSindrome+"\" width=\"150px\"></td><td><img src=\""+Fase1.ImagenSano+"\" width=\"150px\"></td></tr><tr><td>Paciente enfermo</td><td>Paciente curado</td></tr></table><p>Intenta averiguar hasta qué punto es efectivo el "+Fase1.nombreClave+ ". Cuando hayas tratado a un buen número de pacientes te haremos algunas preguntas.</p>"
			,
				
			// EXPERIMENTAL Contrabalanceo!!! Instrucciones para la tarea AERONÁUTICA 
			//6: Instrucciones 1a Phase 2:
			"<p><h3 class=\"titulo\">Instrucciones</h3>Ya has terminado de estudiar el "+Fase1.nombreSindrome +". Muchas gracias por tu colaboración.</p><p>Ahora imagina que eres un ingeniero que trabaja para una aerolínea. Eres especialista en sistemas de navegación y mandos de vuelo,  trabajas resolviendo problemas que hay que tratar muy rápido durante el día a día para poder operar con normalidad.<br><br> Los pilotos de un cierto modelo de avión de la aerolínea están informando de comportamientos erráticos de los sensores de ángulo de ataque, necesarios para calcular la posición y actitud (orientación) del avión.<br>A pesar de que los comportamientos no se reproducen en tierra ni producen registros de fallos, se sospecha que estos problemas pueden deberse a una calibración incorrecta del sensor que no es detectable. Por lo que se soluciona realizando una nueva calibración del sensor. La causa raíz de este problema está aún en fase de investigación, por lo que todavía no se ha comprobado claramente que sea efectiva.</p>",

			//6: Instrucciones 1b Phase 2:
			"<p><h3 class=\"titulo\">Instrucciones</h3><p>Además, debes saber que esta re-calibración es una tarea larga y complicada con consecuencias que pueden ser graves, por lo que no siempre es posible realizarla.<br><br>Te vamos a presentar una serie de informes de pilotos de aeronaves en servicio que sufren este fallo.<br><br>El procedimiento será el siguiente: para cada nueva aeronave, debes decidir si quieres recalibrar el sensor o no, pulsando la imagen correspondiente de las dos siguientes.</p><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+Fase2.ImagenClave+"\" width=\"150px\"></td><td><img src=\""+Fase2.ImagenNOClave+"\" width=\"150px\"></td></tr><tr><td>Recalibrar el sensor</td><td>No recalibrar el sensor</td></tr></table>",
			
			//7: Instrucciones 2 Phase 2
			"<h3 class=\"titulo\">Instrucciones</h3><p>A continuación, te informaremos de si el problema fue resuelto. Después de darte esa información, se te presentará la siguiente aeronave. </p><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+Fase2.ImagenSindrome+"\" width=\"150px\"></td><td><img src=\""+Fase2.ImagenSano+"\" width=\"150px\"></td></tr><tr><td>Problema no resuelto</td><td>Problema resuelto</td></tr></table><p>Intenta averiguar hasta qué punto el recalibrado es efectivo. Cuando hayas observado a un buen número de aeronaves te haremos algunas preguntas.</p>",
						
			// A guardar datos! 
			//13: Save Data...
			"<h3 class=\"titulo\">Envío de datos</h3><p>A continuación podrás enviar los resultados para que se incluyan en nuestro estudio. Los datos que nos aportes se unirán a los del grupo y serán analizados estadísticamente.</p><p align=\"left\"> Para hacerlo, haz click en el botón \"Enviar\".</p>",
			
			//13:
			"<h3 class=\"titulo\">Ya has terminado. ¡Muchas gracias por tu colaboración!</h3><p><br>Pulsa F11 para salir del modo pantalla completa.<br>Autor: <br>Carlos Vera <br><br> Tutores del Trabajo Fin de Máster:<br> Pedro Montoro, Cris Orgaz y María José Contreras.</p>"		
		]; 

	}	
}


var arrayBoton = [
    //0:
    "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='cuestionarioEdad()' value='Empezar'/>",
    
    //1:
    //"<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='cuestionarioEdad()' value='Continuar'/>",
    
    //2:
    "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='siguienteTexto()' value='Continuar'/>",
    //3:
    "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='previoTexto()' value='Atrás'/>   <input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='siguienteTexto()' value='Continuar'/>",

    //4:
    "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='previoTexto()' value='Atrás'/>   <input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='siguienteTexto()' value='Continuar'/>",
    
    //5:
	"<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='previoTexto()' value='Atrás'/>   <input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='showCue()' value='Comenzar'/>",
    
	
    //6a:
    "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='siguienteTexto()' value='Continuar'/>",

    //6b:
    "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='previoTexto()' value='Atrás'/>   <input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='siguienteTexto()' value='Continuar'/>",

    
    //7:
    "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='previoTexto()' value='Atrás'/>   <input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='showCue()' value='Comenzar'/>",
    
    // A guardar datos! 
    //13:
    "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='saveData()' value='Enviar'/>",
    
    //14:
    ""
    
];


//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++
//FUNCIONES DE CUESTTIONARIOS:
//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++

function cuestionarioEdad(){
	
	
    ocultar(divTextos);
    mostrar(divCuestionariosEdad);
	
	// Aquí mientras se rellenan los cuestionarios lanzamos la llamada a Firebase 
	// para calcular grupos y tal
	asignagrupo();
	prepararInstrucciones();
    document.querySelector('input[name="edad"]').value="";
    
    var HTMLboton = "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='validaEdad()' value='Continuar'/>";
    pintarHTML('divBoton', HTMLboton);

}

function validaEdad(){
    if(
        // Esta condición exige que se respondan las preguntas de experiencia y edad	
        //(document.querySelector('input[name="experiencia"]').value=="") || (document.querySelector('input[name="edad"]').value=="")
		(document.querySelector('input[name="edad"]').value=="")
      ) {
        alert("Contesta las preguntas, por favor");
    }
    
	else { //el género se puede dejar sin marcar.
        
        if (document.querySelector('input[name="gender"]:checked')==null) 
            Gender = "noescoge";
        else Gender = document.querySelector('input[name="gender"]:checked').value;	
		
        Age = document.querySelector('input[name="edad"]').value
		//Experience = document.querySelector('input[name="experiencia"]').value;
    	// Curso = document.querySelector('input[name="curso"]:checked').value;
        siguienteTexto();
	}
}


function validaPregunta(){
    if(document.querySelector('input[name="Pregunta'+stateQuest+'"]:checked')==null) alert("Contesta la pregunta, por favor");
    else {
        Cuestionario.push(document.querySelector('input[name="Pregunta'+stateQuest+'"]:checked').value);
        //console.log(Cuestionario);		// debug
        stateQuest++;
        siguienteTexto();
    } 
}


// Podría cambiarle el título, ya que ahora no es realmente esto sino una bienvenida. 
function pregInduccion(){
    ocultar(divTextos);
    mostrar(divPregInduccion);
    
    pintarHTML('divBoton', "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='validaInduccion()' value='Aceptar y continuar'/>");
	
}


function validaInduccion(){
  
    if(document.querySelector('input[name="induccion1"]:checked')==null)
        // (document.querySelector('input[name="induccion1"]:checked')==null) || (document.querySelector('input[name="induccion2"]:checked')==null)
      // ) {
        // alert("Contesta las preguntas, por favor");
		alert("Para continuar, lee la hoja de información y confirma que estás de acuerdo con las condiciones.");
    
    else{
        PregInduccion = document.querySelector('input[name="induccion1"]').value;
        ocultar(divPregInduccion);
        siguienteTexto();
    }
}

//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++
//FUNCIONES DE SALIDA DE DATOS:
//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++

function stringDate() {
  fecha = new(Date);
  return(String(fecha.getDate() + "/" + (fecha.getMonth()+1) + "/" + fecha.getFullYear() + "-" + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds()));
}


function saveData(){
    
    stringDate();
    
    var Fase1countCells = new Map([...new Set(Fase1.secuenciaCells)].map(
    x => [x, Fase1.secuenciaCells.filter(y => y === x).length]));
    var Fase2countCells = new Map([...new Set(Fase2.secuenciaCells)].map(
    x => [x, Fase2.secuenciaCells.filter(y => y === x).length]));
    
    var BalanceoContingencia = Fase1.Contingencia+"-"+Fase2.Contingencia;
     
   
    data = 
        "TFM-Control" + "," + 
        personId + "," +                	//ID aleatorio
		PartIP + "," +						// IP del participante
        fecha + "," + 
        group + "," +                   	//grupo: normal / contrabalanceo
        Age + "," +         		
        Gender + "," +		
		Experience + "," +
        BalPanel + "," +               		//balanceo de panel botones
        BalanceoContingencia + "," +   		//orden de las contingencias
        Fase1.Juicio + "," + 				//Juicio 
        Fase1.Confianza + "," + 			//Confianza 
        Fase1.Riesgo + "," + 				//Riesgo 
        Fase2.Juicio + "," + 				//Fase 2 - Juicio
        Fase2.Confianza + "," + 			//Fase 2 - Confianza 
        Fase2.Riesgo + "," + 				//Fase 2 - Riesgo 
		Fase1.TiemposRespuesta + "," + 		//Tiempos de respuesta 
		Fase2.TiemposRespuesta + "," +  	//Fase 2 - Tiempos de respuesta 
		Fase1.secuenciaResps + "," + 		//Secuencia de respuestas dada
		Fase1.posibleOutcomes + "," + 		//Secuencia de resultados de éxito presentada
		Fase1.secuenciaCells + "," + 		//Secuencia de combinaciones acción-éxito
		Fase2.secuenciaResps + "," + 		//Fase 2 - Secuencia de respuestas dada
		Fase2.posibleOutcomes + "," + 		//Fase 2 - Secuencia de resultados de éxito presentada
		Fase2.secuenciaCells 				//Fase 2 - Secuencia de combinaciones acción-éxito
    ;
    
	if(group == "Experimental"){
		actualizarGrupo= experimental+1;
		//firebase.database().ref('GrupoControlExp').set(actualizarGrupo);				// MODO DEMO SIN CONEXIÓN
		//console.log("Un participante al grupo normal")				// debug
	}
	else {
		actualizarGrupo= balanceo+1;
		// firebase.database().ref('GrupoControlContrabalanceo').set(actualizarGrupo); 	// MODO DEMO SIN CONEXIÓN
		//console.log("Un participante al grupo de contrabalanceo")		// debug
	}
    //console.log(data);      // Debug
    guardaFirebase();
    siguienteTexto();
}

function guardaFirebase(){

	var expdata={
		expName:"TFM-Carlos",
		datos:data
	}
    
	//firebase.database().ref('tallerFEcyt/').push(data);
    //firebase.database().ref('datoscontrol/').push(data); 								// MODO DEMO SIN CONEXIÓN
	console.log("Experimento realizado en modo DEMO. ¡Datos NO guardados!");
}

