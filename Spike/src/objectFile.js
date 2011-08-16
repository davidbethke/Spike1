//namespace definition
var ObjectFile = ObjectFile || {};

ObjectFile.Datastore = function(){
	//private static
	var nextId=1;
	
	return function(){
		//private instance
		var cacheId=nextId++;
		var cacheSize='unassigned';
		var cacheType='unassigned';
		//public (this instance only)
		this.getId= function(){ return cacheId;};
		this.getSize= function(){ return cacheSize;};
		this.getType= function(){return cacheType;};
		this.setSize= function(size){cacheSize=size;};
		this.setType= function(type){cacheType=type;};	
	};
	
}();
 
ObjectFile.Datastore.prototype.read= function(key){
	return localStorage[key];
	//return "Read";
};
ObjectFile.Datastore.prototype.readAllOF= function(){
	var results= new Array();
	for(var i=0; i< localStorage.length;i++){
		results[i]=JSON.parse(localStorage[i]);
		
	}
	return results;
	//return "Read";
};
ObjectFile.Datastore.prototype.write= function(key,value){
	
	if( window.localStorage == 'undefined'){
		return 'no localstorage defined';
	}
	else{
	
	localStorage[key]=value;
	return localStorage[key];
	}
};
ObjectFile.Datastore.prototype.writeOF= function(key,value){
	
	if( window.localStorage == 'undefined'){
		return 'no localstorage defined';
	}
	else{
	
	localStorage[key]=JSON.stringify(value);
	//return localStorage[key];
	}
};
ObjectFile.Datastore.prototype.remove = function(){
	return "Remove";		
};
ObjectFile.Datastore.prototype.flush = function(){
	localStorage.clear();
	return "Flush";
};
ObjectFile.Datastore.prototype.update = function(){
	return "Update";
};
ObjectFile.Datastore.prototype.length = function(){
	return localStorage.length;
};/**
 * 
 */