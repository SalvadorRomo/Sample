//https://www.npmjs.com/package/kafka-node#consumer
//Importamos el modulo de KAFKA
var kafka = require('kafka-node');
/*
		//client = new kafka.Client('localhost:2181'),
		//Establecemos un cliente que interactue con Zookeeper
		var client = new kafka.Client('lom.dynu.com:2181');

		//Creamos Una instanacia de un productor para mandar mensaje a KAFKA
		var Producer = kafka.Producer;
		var producer = new Producer(client);
		//Creamos los eventos de Error y Ready
		producer.on('error', function(err){sails.log("Se ha producido un errro en kafka-node: " + err);});
		//A considerar: Si ponemos el ready en la función PUTMESSAGE nunca se manda el mensaje
		producer.on('ready', function(){ sails.log("Se ha cargado kafka-node");} );


*/

	
//client = new kafka.Client('localhost:2181'),
//Establecemos un cliente que interactue con Zookeeper
//var client = new kafka.Client('lom.dynu.com:2181');
var client = new kafka.Client('streamingspark.dynu.net:2181');


//Creamos Una instanacia de un productor para mandar mensaje a KAFKA
var Producer = kafka.Producer;
var producer = new Producer(client);
//Creamos los eventos de Error y Ready
producer.on('error', function(err){
	sails.log("Se ha producido un errro en kafka-node: " + err);
});
//A considerar: Si ponemos el ready en la función PUTMESSAGE nunca se manda el mensaje
producer.on('ready', function(){ 
	sails.log("Se ha cargado kafka-node");
});


module.exports = { 

	//Definimos la función para mandar mensajes a Kafka
	putMessage: function (arg,done){

		/*
		//Establecemos un cliente que interactue con Zookeeper
		var client = new kafka.Client('streamingspark.dynu.net:2181');
		//Creamos Una instanacia de un productor para mandar mensaje a KAFKA
		var Producer = kafka.Producer;
		var producer = new Producer(client);
		//Creamos los eventos de Error y Ready
		producer.on('error', function(err){
			sails.log("Se ha producido un errro en kafka-node: " + err);
			done(err);
		});
		//A considerar: Si ponemos el ready en la función PUTMESSAGE nunca se manda el mensaje
		producer.on('ready', function(){ 
			sails.log("Se ha cargado kafka-node");

			var	payloads = [  { topic: arg.topic, messages: arg.message, partition: arg.partition }, 	];

			producer.send(payloads, 
	           	function(err, data){
	           		if(err){
	           			sails.log("Error al mandar mensaje a Kafka" + payloads);
	           			sails.log(err);
	           			return done(err);
	           		}else{
	           			sails.log("Mensaje enviado: ");
	           			sails.log(payloads);
	           			sails.log(data);
	           			return done(null,data);
	           		}	                 
	           	}
	        );


		});
		*/

		

		//El payload representa la configuración de Kafka
 		var	payloads = [  { topic: arg.topic, messages: arg.message, partition: arg.partition }, 	];

	    producer.send(payloads, 
	        function(err, data){
	            if(err){
	             	sails.log("Error al mandar mensaje a Kafka" + payloads);
	             	sails.log(err);
	             	return done(err);
	            }else{
	            	sails.log("Mensaje enviado: ");
	            	sails.log(payloads);
	            	sails.log(data);
	            	return done();
	            	}	                 
	            }
	   );
		 	//}
		//);//




	},

	//Consumidor -Consumer-
	getMessage:function(arg,done){
		//Es recomendable no reutilizar el objeto client

		//client = new kafka.Client('localhost:2181'),
		//Establecemos un cliente que interactue con Zookeeper
		//var client = new kafka.Client('lom.dynu.com:2181');
		var client_ = new kafka.Client('streamingspark.dynu.net:2181');
		var Consumer_ = kafka.Consumer;
		var consumer_ =new Consumer_(
			client_, //Kafka client reference
			[	//Topics to consume
				{topic:arg.topic, partition:arg.partition,offset: arg.offset}
			],
			{//Consumer config
				autoCommit: true,
    			fromOffset: true,
    			encoding: 'utf8',
			}
		);
		console.log(arg);
		console.log("Se ha terminado de cargar la funcion getMesasge()");
		consumer_.on('error',function(err){
			console.log("Se ha generado un error al intentar obtener el mensaje");
			console.log(err);
			return done(err);
		});

		consumer_.on('message',function(message){
			console.log("Se a obtenido un mensaje");
			console.log(message);
			consumer_.close(true,function(){
				console.log("Close consumer!");
				return done(null,message);
			});

			
		});
		
	},

	removeTopic:function(arg,done){
				//Es recomendable no reutilizar el objeto client
		var client = new kafka.Client('streamingspark.dynu.net:2181');
		var Consumer = kafka.Consumer;
		var consumer =new Consumer(
			client, //Kafka client reference
			[	//Topics to consume
				{topic:arg.topic, partition:arg.partition}
			],
			{//Consumer config
				autoCommit:true,
				fromOffset: false,
			}
		);

		consumer.removeTopics([arg.topic],function(err,removed){
			if(err){
				console.log("Se ha generado un error al intentar eliminar el topic");
				return done(err);
			}
			console.log("Se ha eliminado e topic con éxito" );
			console.log(removed);
			return done(null,removed);
		});
	},

	addTopic:function(arg,done){
		//Establecemos un cliente que interactue con Zookeeper
		var client = new kafka.Client('streamingspark.dynu.net:2181');
		//Creamos Una instanacia de un productor para mandar mensaje a KAFKA
		var Producer = kafka.Producer;
		var producer = new Producer(client);
		console.log("Ejecutando función addTopic");
		console.log(arg);
		// Create topics async 
		producer.on('ready', function(){ //Cuando el productor este listo agregamos el topic
			producer.createTopics(
				[arg.topic],
				true, 
				function (err, data) {
					if(err){
						console.log("Se ha generado un error al intentar agregar el topic");
						return done(err);
					}

					console.log("Se ha generado el topic con éxito");
					console.log(data);
					return done(err,data);
				}
			);
		});

	},

	getNextOffset:function(arg,done){
		var client_ = new kafka.Client('streamingspark.dynu.net:2181');
		offset = new kafka.Offset(client_);
		offset.fetchLatestOffsets([arg.topic], function (err, offsets) {
		    if (err)
		        return done(err);
		    console.log("fetchLatestOffsets: " + offsets);
		    console.log(offsets);
		    done(null,offsets);
		});
		 
	},




};