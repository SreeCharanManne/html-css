var arr = [] ; 
var row1 = document.querySelector("#row1");
var row2 = document.querySelector("#row2");
var row3 = document.querySelector("#row3");


for (var i = 0; i< 3 ; i++){
	arr[i]   = row1.cells[i];
	arr[i+3] = row2.cells[i];
	arr[i+6] = row3.cells[i];
}



var clickable = [];
for( var i = 0; i< 9 ; i++)
	clickable[i] = 0;

function isEmpty(){
	for(var i = 0;i < 9 ;i++)
		if(clickable[i] === 0)
			return false;
	return true;
}

function gameOver(){
	for(var i = 0; i <3; i++){
		var total = 0;
		for(var j = 0; j <3 ; j++)
			total+=clickable[3*i+j];
		if(total === 3 || total === -3)
			return true;
		total = 0;
		for(var j = 0; j <3 ; j++)
			total+=clickable[3*j+i];
		if(total === 3 || total === -3)
			return true;
	}
	var total2 = 0, total1=0;
	for(var i = 0; i <3;i++){
		total1+=clickable[4*i];
		total2+=clickable[6-2*i];
	}
	if(total1 === 3 || total1 === -3)
		return true;
	if(total2 === 3 || total2 === -3)
		return true;
	return false;
}

function returnRandom() {
	var cpu = Math.floor(Math.random()*9);
	if(clickable[cpu] === 0)
		return cpu;		 	
	return returnRandom();	 
}


function returnOptimal(){
	for(var i = 0; i <3; i++){
		var total = 0;
		for(var j = 0; j <3 ; j++)
			total+=clickable[3*i+j];
		if(total === 2 || total === -2)
			for(var j = 0; j <3 ; j++)
				if(clickable[3*i+j] ===0 )
					return 3*i+j;
		total = 0;
		for(var j = 0; j <3 ; j++)
			total+=clickable[3*j+i];
		if(total === 2 || total === -2)
			for(var j = 0; j <3 ; j++)
				if(clickable[3*j+i] === 0)
					return 3*j+i;
	}
	var total2 = 0, total1=0;
	for(var i = 0; i <3;i++){
		total1+=clickable[4*i];
		total2+=clickable[6-2*i];
	}
	if(total1 === 2 || total1 === -2)
		for(var i = 0; i <3;i++)
			if(clickable[4*i] === 0)
				return 4*i;
	if(total2 === 2 || total2 === -2)
		for(var i = 0; i <3;i++)
			if(clickable[6-2*i] === 0)
				return 6-2*i;
	return returnRandom();
}


function isClicked(cell,rowindex){
	 if(clickable[3*rowindex + cell.cellIndex] === 0){
	  	cell.style.backgroundColor = "#27ae60";
	 	clickable[3*rowindex + cell.cellIndex] = -1;
	 }
	 else
	 	return;
	 if(gameOver()){
	  	alert("You Won!!");
		location.reload(); 	
	 }
	 else{
		 if(!isEmpty()){
			 var cpu = returnOptimal();
			 if(clickable[cpu] === 0){
			  	clickable[cpu] = 1;
			  	arr[cpu].style.backgroundColor = "#c0392b";	
			 }	
		}
		if(gameOver()){
			alert("CPU wins");
			location.reload();
		}
	}
}


for(var i = 0;i < 3; i++){
	row1.cells[i].addEventListener("click", function(){
									isClicked(this,0);
									});
	row2.cells[i].addEventListener("click", function(){
									isClicked(this,1);
									}); 
	row3.cells[i].addEventListener("click", function(){
									isClicked(this,2);
									});
}