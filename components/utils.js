

function deleteElement(el,attribute,test,limite=1){
	let tab=[];
	let compte=0;
	for(let i in el){
		if(el[i]!=undefined){
			if(el[i][attribute]==test || (Array.isArray(el)?el[i]==test:false)){
				delete el[i];compte++
			}
			if(compte>=limite) break;
		}
	}
	return (Array.isArray(el)?el.filter(e=>{if(e!=undefined) return e}):el);
}



function unit(number,pow=2){
	if(isNaN(number)) return number;
	else{
		let i=0;
		let num=number;
		while(num>=Math.pow(10,pow)){
			i++;
			num=parseInt(num/1000);
		}
		let unit=['','k','m','g','t'];
		return Math.floor((number/Math.pow(1000,i))*100)/100+unit[i];
	}
}


function getElement(el,attribute,test,att="",limit=1){
	let result=[];
	if(limit=="") limit=el.length;
	for(let i in el){
		if(el[i]!=undefined){
			if(el[i][attribute]==test || (Array.isArray(el)?el[i]==test:false)){
				let at={};
				if(Array.isArray(att)) att.forEach(e=>at[e]=el[i][e]);
				else if(typeof(att)=="string" && att!="") at[att]=el[i][att];
				else at=el[i];
				result.push(at);
				if(result.length>=limit) break;
			}
		}
	}
	return result;
}





function filtre(nom,nomDiv,div){
	nomDiv=typeof(nomDiv)=="string"?document.querySelectorAll(nomDiv):nomDiv;
	div=typeof(div)=="string"?document.querySelectorAll(div):div;
	for(let i=0;i<nomDiv.length;i++){
		if(
			recherchePousser(nomDiv[i].innerHTML,nom)
		){
			div[i].style.display="";
		}
		else{
			div[i].style.display="none";
		}
	}
}


function classTabObject(tab,att){
	let i=0;
	while(i<tab.length-1){
		let a1={...tab[i]};
		let a2={...tab[i+1]};
		if(!a1[att]) a1[att]=0;
		if(!a2[att]) a2[att]=0;
		if(!isNaN(a1[att])&&!isNaN(a2[att])){a1[att]=parseFloat(a1[att]);a2[att]=parseFloat(a2[att])}
		if(a1[att]>a2[att]){
			let d={...tab[i]};
			tab[i]={...tab[i+1]};
			tab[i+1]={...d}
			i--;
			continue;
		}
		i++
	}
	return tab;
}


function getIndexTabObject(table,champ,val){
	let pos=0;
	let t=false;
	for(;pos<table.length;pos++){
		if(table[pos][champ]==val){
			t=true;
			break;
		}
	}
	if(!t) pos=-1;
	return pos;
}



function recherchePousser(el,rech){
		let t=false;
		el=(el || el).toLowerCase();
		rech=(rech || "").toLowerCase();
		const removeSpace=(text)=>{
			let a=[];
			let b=false;
			let pos=0;
			for(let i=0;i<text.length;i++){
				if(text[i]!=" " && !b) b=true;
				if(b){
					a.push(text[i]);
					if(text[i]==" ") b=false;
				}
			}
			if(a[a.length-1]==" ") a.pop();
			return a.join("");
		}
		el=removeSpace(el);
		rech=removeSpace(rech);
		if(el.split(" ").join("").indexOf(rech.split(" ").join(""))!=-1 || rech.split(" ").join("").indexOf(el.split(" ").join(""))!=-1){
			t=true;
		}
		// if(rech=="" || el=="") t=true;

		else if(rech.split(" ").length==1 && el.split(" ").length==1){
			let f=0;
			let max=(el.length>rech.length)?el.length:rech.length;
			let pos={};
			let tabEl=[];
			let tabRech=[];
			for(let i=0;i<max;i++){
				if(rech[i]==el[i]) f++;
				else{
					if(el[i]) tabEl.push(el[i]);
					if(rech[i]) tabRech.push(rech[i]);
				}
			}


			// calcul de l'erreur
			for(let i=0;i<tabRech.length;i++){
				let index=tabEl.indexOf(tabRech[i]);
				if(index!=-1){
					f+=0.5;
					delete tabEl[index];
				}
			}

			f=Math.floor((f/max)*100)/100;
			// console.log(rech+" et "+el+":"+f+" max:"+max);
			if(f>=0.5) t=true;
		}
		else{
			let f=0;

			// recherche mot par mot
			let tabEl=el.split(" ");
			let tabRech=rech.split(" ");
			// console.log(rech+" \n"+el);

			for(let i=0;i<tabEl.length;i++){
				for(let j=0;j<tabRech.length;j++){
					if(this.recherchePousser(tabEl[i],tabRech[j])) f++;
					else f+=0.2;
				}
			}
			f=Math.floor((f/((tabEl.length)*(tabRech.length)))*100)/100;
			if(f>=0.4) t=true;
		}
		return t;
	}


	function getHeure(dat=-1){
		if(typeof(dat)=="number"){
			if(dat==-1){
				let d=new Date();
				return zero(d.getHours())+"h"+zero(d.getMinutes())+"min";
			}else{
				return zero(Math.floor(dat/(60*60)))+"h"+zero(Math.floor((dat%(60*60))/60))+"min";
			}
		}else{
			dat=dat.toString().toLowerCase();
			let d=dat.split("h");
			if(d.length==1) d=dat.split(":");
			let h=parseInt(d[0]);
			let m=parseInt(d[1].split("m")[0]);
			return h*60*60+m*60;
		}
	}


	function getDate(t=Date.now()){
		let d=new Date(t);
		return d.getFullYear()+"-"+zero(d.getMonth()+1)+"-"+zero(d.getDate());
	}

	function zero(c){
		return ((c<10 && c>-10)?"0":"")+c;
	}

	function hassardTab(tab){
		let t=[];
		let c=Math.floor(Math.random()*tab.length);
		while(t.length<tab.length){
			if(t.indexOf(c)==-1) t.push(c);
			c=Math.floor(Math.random()*tab.length);
		}
		for(let i=0;i<tab.length;i++){
			let a=tab[t[i]];
			tab[t[i]]=tab[i];
			tab[i]=a;
		}
		return tab;
	}