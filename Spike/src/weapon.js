//listener to click on form
//init to fill in select

//fill out the select in the page
	

window.addEventListener('load', eventWindowLoaded,false);

function eventWindowLoaded(){
	localStorage.clear();
	var daoManager= new DAOManager();
	initForm(daoManager);
	//document.getElementById('formWeapon').onmouseup=weaponController;
	//document.getElementById('formWeapon').addEventListener('mouseup',function(){weaponController(daoManager)},false);

	//document.getElementById('formAmmo').onmouseup=ammoController;
	
	//document.getElementById('formAmmo').addEventListener('mouseup',function(){ammoController(daoManager)},false);
	//document.getElementById('formTarget').onmouseup=targetController;
	//generic controller support
	document.getElementById('formWeapon').addEventListener('mouseup',function(){genericController(daoManager,0)},false);
	document.getElementById('formAmmo').addEventListener('mouseup',function(){genericController(daoManager,1)},false);
	document.getElementById('formTarget').addEventListener('mouseup',function(){genericController(daoManager,2)},false);

}


function initForm(daoManager){
	//var weapons=['rifles','pistol','revolver'];
	
	
	localStorage.setItem('name','dave');
	//init dao Manager, get weaponDAO, ammoDAO
	//var daoManager= new DAOManager();daoManager
	
	var weaponDAO=daoManager.getWeaponDAO();
	//var weapons=weaponDAO.getWeaponList();
	var weapons=weaponDAO.getList();
	//experiment
	var something=weaponDAO.getItem('2');
	//experiment

	
	var ammoDAO=daoManager.getAmmoDAO();
	//var ammo=ammoDAO.getAmmoList();
	var ammo=ammoDAO.getList();

	
	var targetDAO=daoManager.getTargetDAO();
	//var targets=targetDAO.getTargetList();
	var targets=targetDAO.getList();

	localStorage.setItem('name1','elsa');

	var selectWeapon=document.getElementById('selectWeapon');
	var selectAmmo=document.getElementById('selectAmmo');
	var selectTarget=document.getElementById('selectTarget');

	//reset options length(remove 'Selected' text
	selectWeapon.options.length=0;
	selectAmmo.options.length=0;
	selectTarget.options.length=0;
	
	//get values to fill ininitForm
	for (var i=0; i< weapons.length; i++){
		//document.write('Updating:'+weapons[i]);
		selectWeapon.options[i]=new Option(weapons[i].name,i);
		//selectWeapon.options[i].Text=weapons[i];
	}
	for (var i=0; i< targets.length; i++){
		//document.write('Updating:'+weapons[i]);
		selectTarget.options[i]=new Option(targets[i].name,i);
		//selectWeapon.options[i].Text=weapons[i];
	}
	for(var i=0; i< ammo.length;i++){
		selectAmmo.options[i]=new Option(ammo[i].name,i);
	}
	
}

function weaponController(daoManager){
	var weaponDAO= daoManager.getWeaponDAO();
	var list= new Array();
	list=weaponDAO.getList();
	
	var selected=document.getElementById('selectWeapon').selectedIndex;
	var options=document.getElementById('selectWeapon').options;
	var weapon=weaponDAO.getItem(options[selected].value);
	//var dbWeapon=JSON.parse(localStorage.getItem('weapon5'));
	var len=window.localStorage.length;
	var count=weaponDAO.getObjectCount();
	alert('You clicked:'+options[selected].text+':owner:'+weapon.owner+'manu:'+weapon.manu);
}

function ammoController(daoManager){
	var ammoDAO=daoManager.getAmmoDAO();
	//var list=new Array();
	//list=ammoDAO.readAllOF();
	var selected=document.getElementById('selectAmmo').selectedIndex;
	var options=document.getElementById('selectAmmo').options;
	var ammo=ammoDAO.getItem(options[selected].value);
	var propString= getProps(ammo);

	alert('You clicked:'+options[selected].text+ propString);
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
	var result='';
	for(var prop in item){
		result += prop +':'+item[prop]+' ';
	}
	return result;
}

function targetController(){
	var selected=document.getElementById('selectTarget').selectedIndex;
	var options=document.getElementById('selectTarget').options;
	alert('You clicked:'+options[selected].text);
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
	//daoManager.getOF(objectFiles);
	//daoManager.initOF(objectFiles,initObjs);
	
	//create DAOs
	
	var daoList=new Array();
	for(var i=0;i< objectFiles.length;i++){
		daoList[i]= new GenericDAO(objectFiles[i]);
	}
	//experiment
	//alert('force it:'+daoList[0].getItem(2).name);
	//experiment
	//return DAOs
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
	//experiment
	for(var i=0; i<list.length;i++){
		var indiv=oFile.readOF(i);
	}
	//experiment
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

