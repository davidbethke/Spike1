//listener to click on form
//init to fill in select

//fill out the select in the page
	

window.addEventListener('load', eventWindowLoaded,false);

function eventWindowLoaded(){
	localStorage.clear();
	var daoManager= new DAOManager();
	initForm(daoManager);
	//document.getElementById('formWeapon').onmouseup=weaponController;
	document.getElementById('formWeapon').addEventListener('mouseup',function(){weaponController(daoManager)},false);

	//document.getElementById('formAmmo').onmouseup=ammoController;
	document.getElementById('formAmmo').addEventListener('mouseup',function(){ammoController(daoManager)},false);
	document.getElementById('formTarget').onmouseup=targetController;

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
	var list= new Array();weaponDAO
	list=weaponDAO.getList();
	
	var selected=document.getElementById('selectWeapon').selectedIndex;
	var options=document.getElementById('selectWeapon').options;
	var weapon=weaponDAO.getItem(options[selected].value);
	//var dbWeapon=JSON.parse(localStorage.getItem('weapon5'));
	var len=window.localStorage.length;
	var count=weaponDAO.getObjectCount();
	alert('You clicked:'+options[selected].text+':'+options[selected].value+':name:'+weapon.owner+'count:'+count+'db:'+list[options[selected].value].owner);
}

function ammoController(daoManager){
	var ammoDAO=daoManager.getAmmoDAO();
	var list=new Array();
	list=ammoDAO.readAllOF();
	var selected=document.getElementById('selectAmmo').selectedIndex;
	var options=document.getElementById('selectAmmo').options;
	alert('You clicked:'+options[selected].text+'len:'+list.length+'name:'+list[0]);
}

function targetController(){
	var selected=document.getElementById('selectTarget').selectedIndex;
	var options=document.getElementById('selectTarget').options;
	alert('You clicked:'+options[selected].text);
}

function DAOManager(){
	
	//init object files
	var weapons=[
		             new Weapon('rifle','0','john wayne'),
		             new Weapon('pistol','1','pepe'),
		             new Weapon('revolver','2','cowboy'),
		             new Weapon('glock','3','cop'),
					new Weapon('s&w','4','dave'),
					new Weapon('H&K','5','richguy'),
					new Weapon('ruger','6','herr gunny')];
	var ammo=[
	             new Ammo('9mm','Winchester'),
	             new Ammo('9mm','MagTech'),
	             new Ammo('38spl','Winchester'),
	             new Ammo('357mag','Hornady')];
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
};

DAOManager.prototype.getObjectFiles=function(){
	var objectFiles=new Array();
	var	nameSize=[
	   	          {name:'weapon',size:'16'},
	   	          {name:'ammo',size:'16'},
	   	          {name:'target',size:'16'}
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
	
}

function Weapon(name,number,owner){
	this.name=name;
	this.number=number;
	this.owner=owner;
}
function Ammo(name,vendor){
	this.name=name;
	this.vendor=vendor;
}
function Target(name,date){
	this.name=name;
	this.date=date;
}

