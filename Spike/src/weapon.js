//listener to click on form
//init to fill in select

//fill out the select in the page
window.addEventListener('load', eventWindowLoaded,false);

function eventWindowLoaded(){
	initForm();
	document.getElementById('formWeapon').onmouseup=weaponController;
	document.getElementById('formAmmo').onmouseup=ammoController;

}

function initForm(){
	//var weapons=['rifles','pistol','revolver'];
	
	localStorage.clear();
	//init dao Manager, get weaponDAO, ammoDAO
	daoManager= new DAOManager();
	var weaponDAO=daoManager.getWeaponDAO();
	var weapons=weaponDAO.getWeaponList();
	
	var ammoDAO=daoManager.getAmmoDAO();
	var ammo=ammoDAO.getAmmoList();
	
	var selectWeapon=document.getElementById('selectWeapon');
	var selectAmmo=document.getElementById('selectAmmo');
	//reset options length(remove 'Selected' text
	selectWeapon.options.length=0;
	selectAmmo.options.length=0;
	
	//get values to fill in
	for (var i=0; i< weapons.length; i++){
		//document.write('Updating:'+weapons[i]);
		selectWeapon.options[i]=new Option(weapons[i].name,i);
		//selectWeapon.options[i].Text=weapons[i];
	}
	for(var i=0; i< ammo.length;i++){
		selectAmmo.options[i]=new Option(ammo[i].name,i);
	}
	
}

function weaponController(){
	var selected=document.getElementById('selectWeapon').selectedIndex;
	var options=document.getElementById('selectWeapon').options;
	alert('You clicked:'+options[selected].text);
}
function ammoController(){
	var selected=document.getElementById('selectAmmo').selectedIndex;
	var options=document.getElementById('selectAmmo').options;
	alert('You clicked:'+options[selected].text);
}

function DAOManager(){
	var weaponDAO=new WeaponDAO();
	var ammoDAO= new AmmoDAO();
	this.getWeaponDAO=function(){return weaponDAO;};
	this.getAmmoDAO=function(){return ammoDAO;};
}
function WeaponDAO(){
	var weaponList=new Array();
	//var weaponOF= new WeaponOF();
	//weaponList= weaponOF.readAll();
	//init weapon object file
	var OFweapon= new ObjectFile.Datastore();
	OFweapon.setType('weapon');
	OFweapon.setSize(16);
	//init w/ some vals
	initWeaponOF(OFweapon);
	//get list of results
	weaponList=OFweapon.readAllOF();
	
	this.getWeaponList=function(){ return weaponList;};
}
function AmmoDAO(){
	var ammoList=new Array();
	//var ammoOF= new AmmoOF();
	var OFammo= new ObjectFile.Datastore();
	OFammo.setType('ammo');
	OFammo.setSize(16);
	initAmmoOF(OFammo);

	ammoList=OFammo.readAllOF();
	this.getAmmoList=function(){return ammoList;};
}
function WeaponOF(){
	
	var weaponList=['rifle','pistol','revolver'];
	this.readAll=function(){
		return weaponList;
	};
}
function AmmoOF(){
	var ammoList=['9mm','38spl','357mag'];
	this.readAll=function(){
		return ammoList;
	};
}
function initWeaponOF(objectFile){
	//objectFile.flush();
	//var weapons=['rifle','pistol','revolver','glock'];
	var weapons=[
	             new Weapon('rifle','0'),
	             new Weapon('pistol','1'),
	             new Weapon('revolver','2'),
	             new Weapon('glock','3')];
	for(var i=0; i< weapons.length; i++){
		objectFile.writeOF(i,weapons[i]);
	}
	var count=objectFile.getObjectCount();
	var empty;

}

function initAmmoOF(objectFile){
	//objectFile.flush();
	//var weapons=['rifle','pistol','revolver','glock'];
	var weapons=[
	             new Ammo('9mm','Winchester'),
	             new Ammo('9mm','MagTech'),
	             new Ammo('38spl','Winchester'),
	             new Ammo('357mag','Hornady')];
	for(var i=0; i< weapons.length; i++){
		objectFile.writeOF(i,weapons[i]);
	}
	var count=objectFile.getObjectCount();
	var empty;
}

function Weapon(name,number){
	this.name=name;
	this.number=number;
}
function Ammo(name,vendor){
	this.name=name;
	this.vendor=vendor;
}

