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
		var objectCount=0;
		
		//public (this instance only)
		this.getId= function(){ return cacheId;};
		this.getSize= function(){ return cacheSize;};
		this.getType= function(){return cacheType;};
		this.getObjectCount=function(){return objectCount;};
		this.incrementCount=function(){objectCount++;};
		this.resetCount=function(){objectCount=0;};
		this.setSize= function(size){cacheSize=size;};
		this.setType= function(type){cacheType=type;};	
	};
	
}();
 
ObjectFile.Datastore.prototype.readOF= function(key){
	var type=this.getType();
	var oKey=type+key;
	var otherVal=localStorage.getItem(oKey);
	var value= JSON.parse(window.localStorage.getItem(oKey));
	var empty;
	//return new Weapon('dave','gun');
	return value;
	//return "Read";
};
ObjectFile.Datastore.prototype.readAllOF= function(){
	//read out an object must have a new object
	var results= new Array();
	var cacheType=this.getType();
	//for(var i=0; i< localStorage.length;i++){
	for(var i=0; i< this.getObjectCount();i++){

		//var currentWeapon=new Weapon('name','number');
		//var currentWeapon;
		var OFkey=cacheType+i;
		
		results[i]=JSON.parse(localStorage.getItem(OFkey));
		//results[i]=currentWeapon;
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
	var OFkey=this.getType()+key;
	if( window.localStorage == 'undefined'){
		return 'no localstorage defined';
	}
	else{
	this.incrementCount();
	var tot=this.getObjectCount();
	localStorage[OFkey]=JSON.stringify(value);
	//check
	//window.localStorage.setItem('dave'+OFkey,'dave'+key);
	var immRead=this.readOF(key);
	var empty;
	//localStorage.setItem(OFkey,JSON.stringify(value));
	//return localStorage[key];
	}
};
ObjectFile.Datastore.prototype.remove = function(){
	return "Remove";		
};
ObjectFile.Datastore.prototype.flush = function(){
	//Just remove of the keytype
	var cacheType=this.getType();
	for(var i=0; i< localStorage.length;i++){
		//if(localStorage.getItem(cacheType+i)){
			localStorage.removeItem(cacheType+i);
		//}
	}
	this.resetCount();
	//localStorage.clear();
	return "Flush";
};
ObjectFile.Datastore.prototype.update = function(){
	return "Update";
};
ObjectFile.Datastore.prototype.length = function(){
	return localStorage.length;
};
ObjectFile.Datastore.prototype.initOF=function(objects){
	 
		for(var i=0;i<objects.length;i++){
			this.writeOF(i, objects[i]);
		}
};