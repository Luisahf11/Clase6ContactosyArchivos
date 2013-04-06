$(document).ready(function(e) {
    document.addEventListener("deviceready",function(){
	//Contactos
		//Crear Contactos
		$('#cSend').tap(function(){
			var nom = $('#cNom').val();
			var tel = $('#cTel').val();
			var mov = $('#cMov').val();
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
			$('#cNom, #cTel, #cMov, #cMail').val('');
			navigator.notification.alert('Creado Satisfactoriamente', function(){
				history.back();
			}, 'Contactos', 'Aceptar');
		}, function(err){
			navigator.notification.alert(err.code, null, 'Error al Crear Contacto','Aceptar');
		});
	});
	},false);
});