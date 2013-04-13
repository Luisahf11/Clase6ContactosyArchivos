$(document).ready(function(e) {
    document.addEventListener("deviceready",function(){
	//Contactos
		//Crear Contactos
		$('#cSend').tap(function(){
			var nom = $('#cNom').val();
			var tel = $('#cTel').val();
			var mov = $('#cMovil').val();
			var mail = $('#cMail').val();
			
			//Crear objeta de contacto
			var nueCont = navigator.contacts.create();
			nueCont.displayName = nom;
			nueCont.nickname = nom;
			//Crear Objeto de nombre de Contacto
			var nombre = new ContactName();
			nombre.giveName = nom;
			nueCont.name = nombre;
			//Crear El arreglo de Teléfonos
			var telefonos = [];
			telefonos[0] = new ContactField('home',tel,false);
			telefonos[1] = new ContactField('mobile',mov,true);
			nueCont.phoneNumbers = telefonos;
			//Crear el arreglo de Emails
			var correos = [];
			correos[0] = new ContactField('home',mail,true);
			nueCont.emails = correos;
			
			nueCont.save (function(){
			$('#cNom, #cTel, #cMovil, #cMail').val('');
			navigator.notification.alert('Creado Satisfactoriamente', function(){
				history.back();
			}, 'Contactos', 'Aceptar');
		}, function(err){
			navigator.notification.alert(err.code, null, 'Error al Crear Contacto','Aceptar');
		});
	});
	//Leer contactos
		function onSuccess(contacts) {
			var cantidad = contacts.length;
			for(i=0;i<cantidad;i++){
				$('#contactos ul.plastic').append('<li>'+contacts[i].name.formatted+'</li>');
			}
		};
		function onError(contactError) {
   		 alert('onError!');
		};
		// find all contacts with 'Bob' in any name field
		var options = new ContactFindOptions();
		options.multiple=true; 
		var fields = ["displayName", "name"];
		navigator.contacts.find(fields, onSuccess, onError, options);
		//archivos
			//Crear o Escribir Archivos
			$('#aCrear').tap(function(){
				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(localSystem){
					localSystem.root.getFile("readme.txt", {create: true, exclusive: false}, function(fileEntry){
					fileEntry.createWriter(function(escritor){
						escritor.onwrite = function(evt) {
                			navigator.notification.alert("Archivo Escrito Correctamente", null, "Archivos","Aceptar");
                    	};
                		escritor.write($('#aText').val());
				
					}, function(err){
						alert('Escritor: '+err.code);  	
					});
				}, function(err){
						alert('Entrada: '+err.code);
				});
			}, function(err){
				alert(err.code);
			});	
		});
			//Leer Archivo
			$('#aLeer').tap(function(){
			    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(localSystem){
					localSystem.root.getFile("readme.txt", null, function(fileEntry){
						fileEntry.file(function(file){
							 var reader = new FileReader();
        reader.onloadend = function(evt) {
            $('#aText').val(evt.target.result);
        };
        reader.readAsText(file);
						}, function(err){
							alert('Acceso: '+err.code);
						});
					}, function(err){
					alert('Entrada: '+err.code);
				});
				}, function(err){
					alert(err.code);
				});
			});
	}, false);
});