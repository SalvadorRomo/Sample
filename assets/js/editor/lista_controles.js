
var Lista = function(){
	this.container = [];
}


/******************************************************************************/
Lista.prototype.push = function(control){
	this.container.push(control);
};

Lista.prototype.getList = function(){
	return this.container;
};

Lista.prototype.getItem = function(id){
	return this.container[id];
};

Lista.prototype.size = function(){
	return this.container.length;
};

Lista.prototype.getLength = function(){
	return this.container.length;
};

Lista.prototype.print = function(){
	this.container.forEach(function(i){
		console.log(i.getEnable())
	});
};

Lista.prototype.disable = function(id){
	this.container[id].setParentEnable(false);	
};

Lista.prototype.changename = function(id,name){
	this.container[id].setTitle(name);
};

Lista.prototype.update = function(id){
	this.container[id].paint();
};

Lista.prototype.pop = function(id,callbac){
	//Dado que no podemos eliminar el elemento como tal ya que los IDs dejan de corresponder
	//Solo procedemos a desactivarlos
	this.disable(id);
	callbac( this.container[id] ) ;
};

/**********************************************************************************/

Lista.prototype.getFullArray = function(){
	var array  = [];
	for(var i = 0; i < this.container.length; i ++)
	{
		if(this.container[i].getParentEnable() == true){
			//Si el control esta activo hay que guardarlo
			this.container[i].Actualizar();//Para guardar cambio 
			array.push(this.container[i].getConfig());
		}
	}
	return array;
}

Lista.prototype.getJSON = function(){
	return JSON.stringify( this.getFullArray() ); 
};

Lista.prototype.getArrayFromJSON = function(json){
	return JSON.parse(json);
};

/**********************************************************************************/

