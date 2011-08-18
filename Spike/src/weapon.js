//listener to click on form
//init to fill in select

//fill out the select in the page
	

window.addEventListener('load', eventWindowLoaded,false);

function eventWindowLoaded(){
	localStorage.clear();
	var daoManager= new DAOManager();
	initForm(daoManager);
	//generic controller support
	document.getElementById('formWeapon').addEventListener('mouseup',function(){genericController(daoManager,0)},false);
	document.getElementById('formAmmo').addEventListener('mouseup',function(){genericController(daoManager,1)},false);
	document.getElementById('formTarget').addEventListener('mouseup',function(){genericController(daoManager,2)},false);
}


function initForm(daoManager){
	//fill out selection options in form
	var weaponDAO=daoManager.getWeaponDAO();
	var weapons=weaponDAO.getList();
	
	var ammoDAO=daoManager.getAmmoDAO();
	var ammo=ammoDAO.getList();

	var targetDAO=daoManager.getTargetDAO();
	var targets=targetDAO.getList();

	var selectWeapon=document.getElementById('selectWeapon');
	var selectAmmo=document.getElementById('selectAmmo');
	var selectTarget=document.getElementById('selectTarget');

	//reset options length(remove 'Selected' text
	selectWeapon.options.length=0;
	selectAmmo.options.length=0;
	selectTarget.options.length=0;
	//generic fill
	var select=[selectWeapon,selectAmmo,selectTarget];
	var fill=[weapons,ammo,targets];
	fillSelect(select,fill);
	
	
}

//generic to fix above duplicate code maybe, still needs work
function fillSelect(select,fill){
	//fill for each element in array
	for(k=0; k<select.length;k++){
		for(var i=0; i< fill[k].length;i++){
			select[k].options[i]=new Option(fill[k][i].name,i);
		}
	}
}

function genericController(daoManager,number){
	var genericDAO=daoManager.getDAOList(number);
	var type=genericDAO.getType();
	type='select'+type;
	var selected=document.getElementById(type).selectedIndex;
	var options=document.getElementById(type).options;
	var generic= genericDAO.getItem(options[selected].value);
	var propString=getProps(generic);
	alert ('You Clicked:'+options[selected].text+propString);
}

function getProps(item){
	var result=' ';
	for(var prop in item){
		result += prop +':'+item[prop]+' ';
	}
	return result;
}

function DAOManager(){
	
	//init object files
	var weapons=[
		             new Weapon('rifle','0','john wayne','winchester'),
		             new Weapon('pistol','1','pepe','colt'),
		             new Weapon('revolver','2','cowboy','browning'),
		             new Weapon('glock','3','cop','glock'),
					new Weapon('s&w','4','dave','smith and Wesson'),
					new Weapon('H&K','5','richguy','die Deutsches'),
					new Weapon('ruger','6','herr gunny','Munich Guns Inc')];
	var ammo=[
	             new Ammo('9mm','Winchester','round nose'),
	             new Ammo('9mm','MagTech','jhp'),
	             new Ammo('38spl','Winchester','wadcutter'),
	             new Ammo('357mag','Hornady','effUup')];
	var targets=[
	             new Target('target1','today'),
	             new Target('target2','today'),
	             new Target('target3','today'),
	             new Target('target4','yesterday')];
	
	var initObjs=[weapons,ammo,targets];
	var objectFiles=new Array();
	objectFiles=this.getObjectFiles();
	
	this.getOF(objectFiles);
	this.initOF(objectFiles,initObjs);
	
	//create DAOs
	
	var daoList=new Array();
	for(var i=0;i< objectFiles.length;i++){
		daoList[i]= new GenericDAO(objectFiles[i]);
	}
	
	this.getWeaponDAO=function(){return daoList[0];};
	this.getAmmoDAO=function(){return daoList[1];};
	this.getTargetDAO=function(){return daoList[2];};
	//to support generic controller
	this.getDAOList=function(number){return daoList[number];};
};

DAOManager.prototype.getObjectFiles=function(){
	var objectFiles=new Array();
	var	nameSize=[
	   	          {name:'Weapon',size:'16'},
	   	          {name:'Ammo',size:'16'},
	   	          {name:'Target',size:'16'}
	   	          ];
	for(var i=0; i< nameSize.length;i++){
		objectFiles[i]= new ObjectFile.Datastore();
		objectFiles[i].setType(nameSize[i].name);
		objectFiles[i].setSize(parseInt(nameSize[i].size));
		
	}
	return objectFiles;
};

DAOManager.prototype.initOF=function(OF,initObjs){
	for(k=0;k<OF.length;k++){
		OF[k].initOF(initObjs[k]);
	}
};

DAOManager.prototype.getOF=function(OF){
	for(var i=0; i<OF.length;i++){
		var name=OF[i].getType();
		var size=OF[i].getSize();
	}
	
};

function GenericDAO(OF){
	var oFile=OF;
	var list= new Array();
	list=oFile.readAllOF();
	this.getList=function(){return list;};
	this.getItem=function(key){return oFile.readOF(key);};
	this.getObjectCount=function(){return oFile.getObjectCount();};
	this.readAllOF=function(){return oFile.readAllOF();};
	this.getType=function(){return oFile.getType();}; // for generic Controller to retrieve Type and plug into DOM element search
	
}

function Weapon(name,number,owner,manu){
	this.name=name;
	this.number=number;
	this.owner=owner;
	this.manu=manu;
}
function Ammo(name,vendor,bullet){
	this.name=name;
	this.vendor=vendor;
	this.bullet=bullet;
}
function Target(name,date){
	this.name=name;
	this.date=date;
}

