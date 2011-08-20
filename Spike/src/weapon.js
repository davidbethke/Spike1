//model view controller for Object File access
window.addEventListener('load', eventWindowLoaded,false);
var type={Weapon:'0',Ammo:'1',Target:'2',Drills:'3'};
function eventWindowLoaded(){
	localStorage.clear();
	var daoManager= new DAOManager();
	initForm(daoManager);
	//generic controller support
	document.getElementById('formWeapon').addEventListener('mouseup',function(){genericController(daoManager,0)},false);
	document.getElementById('formAmmo').addEventListener('mouseup',function(){genericController(daoManager,1)},false);
	document.getElementById('formTarget').addEventListener('mouseup',function(){genericController(daoManager,2)},false);
	document.getElementById('divDrills').addEventListener('mouseup',function(evt){genericControllerDiv(evt,daoManager,3)},false);
	document.getElementById('pDrills').addEventListener('mouseup',function(){showHide('divDrills')},false);

}
function showHide(divId){
	var elem=document.getElementById(divId);
	/*
	if(document.getElementById(divId).style.display == "none"){
		document.getElementById(divId).style.display = "block"; }
	else { 
		document.getElementById(divId).style.display = "none"; 
		}
		*/
	elem.className=(elem.className =='hidden')?'unhidden':'hidden';
	
}

function initForm(daoManager){
	//fill out selection options in form
	//generic might be something like this
	//var daoList= new Array();
	//var genericFill=new Array();
	//
	//for(var i=0; i<numberOfObjects;i++){
	//	daoList[i]=daoManager.getDAOList[i];
	//  var genericFill[i]= daoList[i].getList();
	//  }
	// later replace fill with genericFill
	
	var weaponDAO=daoManager.getWeaponDAO();
	var weapons=weaponDAO.getList();
	
	var ammoDAO=daoManager.getAmmoDAO();
	var ammo=ammoDAO.getList();

	var targetDAO=daoManager.getTargetDAO();
	var targets=targetDAO.getList();
	
	// hack for div
	var drillsDAO=daoManager.getDrillsDAO();
	var drills=drillsDAO.getList();

	var selectWeapon=document.getElementById('selectWeapon');
	var selectAmmo=document.getElementById('selectAmmo');
	var selectTarget=document.getElementById('selectTarget');
	
	//hack for div
	var selectDrills=document.getElementById('divDrills');

	//reset options length(remove 'Selected' text
	selectWeapon.options.length=0;
	selectAmmo.options.length=0;
	selectTarget.options.length=0;
	//generic fill
	var select=[selectWeapon,selectAmmo,selectTarget];
	var fill=[weapons,ammo,targets];
	fillSelect(select,fill);
	
	//hack for div, call fillDiv
	var drillSelect=[selectDrills];
	var drillFill=[drills];
	//var newObj= new NewObj();
	var newFill=[new NewObj()
				];
	var newFill2=[newFill];
	var newLen= newFill.length;
	fillDiv(drillSelect,newFill2);
	fillDiv(drillSelect,drillFill);
	
	
}

//generic to fix above duplicate code maybe, still needs work
function fillSelect(select,fill){
	//fill for each element in array
	for(var k=0; k<select.length;k++){
		for(var i=0; i< fill[k].length;i++){
			select[k].options[i]=new Option(fill[k][i].name,i);
		}
	}
}

// for div show/hide functionality instead of select list
function fillDiv(select,fill){
for(var k=0; k<select.length;k++){
	for(var i=0; i<fill[k].length;i++){
		drawP(select[k],fill[k][i],i);
	}
 }
}

// function to create a node like <p id='drills0' value='0' class='drills' checked='false'>fill.name</p>
function drawP(select,fill,value){
	//var divSelect = 'div'+select;
	//var selectElement=document.getElementById(divSelect); // get handle of div element to append to
	var newElement=document.createElement('p');
	var newText=document.createTextNode(fill.name);
	//newElement.setAttribute('id',select.id+value);
	newElement.setAttribute('id',fill.name);

	newElement.setAttribute('value',value);
	newElement.setAttribute('class',select.id);
	newElement.setAttribute('checked','false');
	newElement.appendChild(newText);
	//selectElement.appendChild(newElement);
	select.appendChild(newElement);
	//document.getElementById(select.id+value).innerHtml=fill.name;
	}

//genericController assumes select statement, not a DIV (requires genericControllerDiv
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

function genericControllerDiv(evt,daoManager,number){
	var genericDAO=daoManager.getDAOList(number);
	var type= genericDAO.getType();
	type='div'+type;
	var selectedP=evt.target;
	var itemNumber=selectedP.getAttribute('value');
	var genericObj=genericDAO.getItem(itemNumber);
	var results= getProps(genericObj);
	
	// works
	alert('You clicked:'+results);
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
	var drills=[
	            	new Drills('drill1','standing triangle','two hand','low ready','1-1-1'),
	            	new Drills('drill2','standing triangle','two hand','low ready','1-2-3'),
	            	new Drills('drill3','standing off shoulder','two hand','low ready','1-1-1'),
	            	new Drills('drill4','standing off shoulder','two hand','low ready','1-2-3')];
	
	var initObjs=[weapons,ammo,targets,drills];
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
	this.getDrillsDAO=function(){return daoList[3];};
	//to support generic controller
	this.getDAOList=function(number){return daoList[number];};
};

DAOManager.prototype.getObjectFiles=function(){
	var objectFiles=new Array();
	var	nameSize=[
	   	          {name:'Weapon',size:'16'},
	   	          {name:'Ammo',size:'16'},
	   	          {name:'Target',size:'16'},
	   	          {name:'Drills',size:'16'}
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
//try for shooting drills, call it drills
function Drills(name,stance,grip, draw,firePattern){
	this.name=name;
	this.stance=stance;
	this.grip=grip;
	this.draw=draw;
	this.firePattern=firePattern;
}
function NewObj(name){
	 this.name='new';
	
}
