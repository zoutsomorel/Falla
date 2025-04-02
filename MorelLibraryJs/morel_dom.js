class Morel_Dom{
	select(){
		if(arguments.length>1){
			let a=[];
			for(let i=0,k=0;i<arguments.length;i++){
				a[k]=this.select(arguments[i]);
				if(a[k]==""){
					a.length=k;
					continue;
				}
				k++;
			}
			return a;
		}
		else{
			let a=typeof(arguments[0])=="string"?document.querySelectorAll(arguments[0]):arguments[0];
			if(a.length==1) return a[0];
			else if(a.length==0) return "";
			else return a;
		}
	}

	display(el,valeur=""){
		el=this.select(el);
		if(Array.isArray(el) || el.toString().toLowerCase().indexOf("nodelist")!=-1){
			for(let i=0;i<el.length;i++){
				this.display(el[i],valeur)
			}
		}
		else{
			if(typeof(el)=="object"){
				el.style.display=valeur;
			}
		}
	}

	write(el,valeur=""){
		el=typeof(el)=="string"?this.select(el):el;
		if(Array.isArray(el)){
			el.forEach(e=>{this.write(e,valeur)});
		}
		else{
			if(typeof(el)=="object"){
				let val=el.toString().toLowerCase();
				if(val.indexOf("input")!=-1) el.value=valeur;
				else if(val.indexOf("select")!=-1) return;
				else if(val.indexOf("image")!=-1 || val.indexOf("video")!=-1 || val.indexOf("audio")!=-1) el.setAttribute("src",valeur);
				else if(val.indexOf("textarea")!=-1) el.value=valeur;
				else el.innerHTML=valeur;
			}
		}
	}

	// lire un element ou des elements

	read(el){
		el=(typeof(el)=="string")?this.select(el):el;
		if(Array.isArray(el)) return [...el].map(e=>this.read(e));
		else{
			let content="";
			let val=el.toString().toLowerCase();
			if(val.indexOf("input")!=-1 || val.indexOf("select")!=-1 || val.indexOf("textarea")!=-1) content=el.value;
			else if(val.indexOf("image")!=-1 || val.indexOf("video")!=-1 || val.indexOf("audio")!=-1) content=el.getAttribute("src");
			else content=el.innerHTML;
			return content;
		}
	}

	balise(el,g=true){
		let s="";
		let t=true;
		if(typeof(el)=="string" || typeof(el)=='number') return this.formate_text(el.toString());
		if(el.bal==undefined) el.bal="";
		if(typeof(el.bal)=="object"){
			s+=this.repete_element(el,"bal");
			t=false;
		}
		if(el.text!=undefined){
			if(typeof(el.text)=="object"){
				s+=this.repete_element(el,"text");
				t=false
			}
		}
		
		if(t){
			if(el.bal!="")
				s+=`<${el.bal}`;
			["style","colspan","selected","rowspan","align","value","placeholder","type","class","id","name","onclick","onchange","onkeyup","onkeyup","onmousemove","ontouchstart","ontouchend","onsubmit"].forEach(e=>s+=this.put_event(el,e));
			if(el.attribute!=undefined && el.attribute!="") s+=" "+el.attribute;
			s+=this.contenu_balise(el.bal,el.text,el.formater);
			if(el.child!=undefined){
				if(typeof(el.child)=="object" && el.child.length!=undefined) el.child.forEach(e=>s+=this.balise(e));
				else s+=this.balise(el.child);
			}
		}
		if(g) s=s+this.ferme_balise(el.bal);
		return s;
				
	}
	element(bal,att={},child=""){
		return {
			bal:bal,
			...att,
			child:child
		}
	}
	formate_text(text){
		let p="";
		let dp={b:0,i:0,c:0,im:0,u:0,l:0};
		for(let i=0;i<text.length;i++){
			let test=text[i];
			if(test=="	") {
				p+="&nbsp&nbsp&nbsp&nbsp";
				continue;
			}
			if(test=="*" || test=="~" || test=="/" ){
				if(text[i+1]){
					if(text[i+1]!="" && text[i+1]!="	"){
						test+=text[i+1];
						i++;
					}
				}
			}
			switch(test){
				case "**":
					if(dp.b%2==0) p+="<b>";
					else p+="</b>";
					dp.b++;
				break;
				
				case "~~":
					if(dp.i%2==0) p+="<i>";
					else p+="</i>";
					dp.i++;
				break;

				case "//":
					p+="</br>";
				break;

				case "*c":
					if(dp.c%2==0) p+="<i class='code'>";
					else p+="</i>";
					dp.c++;
				break;

				case "*u":
					if(dp.u%2==0) p+="<ul>";
					else p+="</ul>";
					dp.u++;
				break;

				case "*l":
					if(dp.l%2==0) p+="<ul>";
					else p+="</ul>";
					dp.l++;
				break;
				
				case "*i":
					if(dp.im%2==0) p+="<img class='morel_img'  src='";
					else p+="' />"; 
					dp.im++;
				break;
				default:
					p+=test; 
			}
		}
		return p;
	}

	repete_element(el,type){
		let s="";
		let c=0;
		if(type=="text" && typeof(el.bal)=="object"){
			c=el.bal.length
		}
		for(let i=0;i<el[type].length;i++){
			if(i>=c){
				let f={...el}
				f[type]=el[type][i];
				if(type=="text") f.bal=el.bal; 
				if(el.text!=undefined && type=="bal"){
					if(typeof(el.text)=="object"){
						f.text=el.text[i];
						if(f.text==undefined) f.text="";
					}
				}
				s+=this.balise(f);
			}
		}
		return s;
	}
	put_event(el,type){
		if(el[type]!=undefined && el[type]!="") return ` ${type}="${el[type]}" `;
		else return "";
	}
	contenu_balise(nom,content="",formater=false){
		if(content==undefined) content="";
		if(formater) content=this.formate_text(content);
		content=this.echap_caract(content)
		switch(nom){
			case "input":
				return ` value="${content}"/>`;
			case "img":
				return ` src="${content}"/>`;
			case "video":
				return ` controls src="${content}"></video>`;
			case "":
				return "";
			default:
				return `>${content}`;
		}
	}

	ferme_balise(nom){
		let f="";
		if(nom!="input" && nom!="img" && nom!="video" && nom!=""){
			f="</"+nom+">";
		}
		return f;
	}
	echap_caract(text){
		return text.toString().split("\"").join("\\\"");
	}
	html_form(input){
		let s="";
		if(typeof(input[0])=="object"){
			s+="<table>";
			input.forEach(e=>s+="<td>"+this.html_form(e)+"</td>");
			s+="</table>";
		}
		else{
			if(input[1]=="") input[1]="input";
			s+=this.balise({
				bal:"p",
				text:input[0]+"<br/>",
				child:{
					bal:input[1],
					name:input[2],
					id:"input",
					attribute:'required',
					placeholder:"...*"
				}
			})
		}
		return s;	
	}
	message(el,mess,type='error'){
		this.display(el,"");
		if(type=='error') el.style.background="#eaa";
		else el.style.background="#aea";
		el.innerHTML=mess;
		setTimeout(()=>{el.style.display="none"},10000);
	}

	el_position(fi){
		if(typeof(fi)=="string") fi=this.select(fi);
		if(!fi.innerHTML) {
			return {y:0,x:0}
		}
		let c=fi.getBoundingClientRect();
		return c;
	}




	// recuperer la value d'un element
	getValue(el){
		el=this.select(el);
		if(typeof(el.length)!="undefined"){
			let value=[];
			for(let i=0;i<el.length;i++){
				value[i]=this.getValue(el[i])[0];
			}
			return value;
		}
		else{			
			let value;
			let tab=["value","src","innerHTML"];
			for(let i=0;i<tab.length;i++){
				let e=tab[i];
				if(typeof(el[e])!="undefined" || i==tab.length-1){
					value=el[e] || "";
					break;
				}
			}
			return [value];
		}
	}




	// retrouver les valeurs des champ qui ont name




	getChild(el,id){
		el=this.select(el);
		let result=[];
		if(Array.isArray(id)){
			for(let i=0;i<id.length;i++){
				result.push(...this.getChild(el,id[i]));
			}
			return result;
		}
		else{
			const verif=(e)=>{
				return e.id==id || Array(...(e.classList || [] ) ).indexOf(id)!=-1 || (e.nodeName || "").toLowerCase()==id.toLowerCase()
			}
			let t=verif(el);
			if( t || ((el.nodeName=='OPTION' && !t)?verif(el.parentElement):false)){
				result.push((el.nodeName=='OPTION' && !t)?el.parentElement:el);
			}
			if(el.nodeName=='SELECT' && t) return result;
			let tab=el.children || [];
			for(let i=0;i<tab.length;i++){
				result.push(...this.getChild(el.children[i],id));
			}
			return result;
		}
	}


	// avoir tout les parent d'un element

	getParent(el,id){
		el=this.select(el);
		let result=[];
		if(Array.isArray(id)){
			for(let i=0;i<id.length;i++){
				result.push(...this.getChild(el,id[i]));
			}
			return result;
		}
		else{
			let p=el;
			while((p=p.parentElement)){
				if(p.nodeName.toLowerCase()=="body") break;
				if(p.id==id || Array(...(p.classList || [])).indexOf(id)!=-1 || (p.nodeName || "").toLowerCase()==id.toLowerCase()) result.push(p);
			}
			return result;
		}
	}

	// verifier qu'un element es vide et applique une classe de style
	verifierElementVide(el,classe="",vide=true){
		let t=true;
		el=this.select(el);
		if(typeof(el.length)!="undefined"){
			for(let i=0;i<el.length;i++){
				let e=el[i];
				t=this.verifierElementVide(e,classe,t);
			}
			return t;
		}


		else{
			let value=this.getValue(el);
			if(Array.isArray(value)) value=value[0]; 
			if(value==""){
				el.classList.add(classe || "dom");
				t=false;
			} 
			else el.classList.remove(classe || "dom");
			return t && vide;
		}
		
	}



	// creation des options facile de  select param(val:object({value,text})) el:

	option_select(val,i=-1){
		let s="";
		if(Array.isArray(val)){
			val.forEach((e,index)=>{
				if(e.id==i) e.selected=true;
				else if(!e.id && index==i) e.selected=true;
				s+=this.option_select(e)
			});
			return s;
		};
		if(typeof(val)=="object") s+=this.balise(this.element("option",{value:val.value,selected:val.selected},val.text))
		else s+=this.balise(this.element("option",{value:val},val))
		return s;
	}

	// col

	// ordoner les tableau d'object enfonction d'un attribute

	classTabObject(tab,att){
		let i=0;
		while(i<tab.length-1){
			let a1={...tab[i]};
			let a2={...tab[i+1]};
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

	//
}





let dom=new Morel_Dom();
// console.log(b) donne [l'element b];
