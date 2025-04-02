class Morel_Time{
	constructor(){
		this.mois=["","janvier","fevrier","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","decembre"];
	}
	get_time(){
		let a=new Date();
		return{
			heure: a.getHours(),
			minute:a.getMinutes(),
			second:a.getSeconds(),
			heures: this.zero(a.getHours())+"h"+this.zero(a.getMinutes())+"min",
			date: this.zero(a.getDate())+"/"+this.zero(a.getMonth()+1)+"/"+a.getFullYear(),
			date_string: this.zero(a.getDate())+" "+this.mois[a.getMonth()+1]+" "+a.getFullYear(),
			date_normal: a.getFullYear()+"-"+this.zero(a.getMonth()+1)+"-"+this.zero(a.getDate())
		}
	}

	zero(a){
		if(!isNaN(a)){
			a=parseFloat(a);
			if(a<10 && a>=0) a="0"+a;
		}
		return a;
	}
	compare_heure(hd,hf,signe="="){
		let a=this.operation_heure(hd,hf,"-",true);
		switch(signe){
			case "=":
				if(a==0) return true;
				else return false
			break;
			case ">":
				if(a<0) return true;
				else return false;
			break;
			case "<":
				if(a>0) return true;
				else return false;
			break;
			case ">=":
				if(a<=0) return true;
				else return false;
			break;
			case "<=":
				if(a>=0) return true;
				else return false;
			break;
			default: return false;
		} 
	}
	parse_heure(hd){
		let hd_h=parseFloat(hd.toLowerCase().split("h")[0]);
		let hd_m=parseFloat(hd.toLowerCase().split("h")[1].split("m")[0]);
		while(hd_m<0){
			hd_m+=60;
			hd_h--;
		} 
		while(hd_m>=60){
			hd_m-=60;
			hd_h++;
		}

		while(hd_h<0){
			hd_h+=24;
		}
		return this.zero(hd_h)+"h"+this.zero(hd_m)+"min";
	}
	operation_heure(hd,hf,type='+',com=false){
		let s="";
		let hd_h,hf_h,hd_m,hf_m;
		if(type=="+" || type=="-"){
			hd_h=parseFloat(hd.toLowerCase().split("h")[0]);
			hd_m=parseFloat(hd.toLowerCase().split("h")[1].split("m")[0]);
			hf_h=parseFloat(hf.toLowerCase().split("h")[0]);
			hf_m=parseFloat(hf.toLowerCase().split("h")[1].split("m")[0]);
			s=this.zero(eval(hf_h+type+hd_h))+"h"+this.zero(eval(hf_m+type+hd_m))+"min";
		}
		if(type=="*" || type=='/'){
			hd_h=parseFloat(hd.toLowerCase().split("h")[0]);
			hd_m=parseFloat(hd.toLowerCase().split("h")[1].split("m")[0]);
			if(isNaN(hf)) s="00h00min";
			else s=this.zero(eval(hd_h+type+hf))+"h"+this.zero(eval(hd_m+type+hf))+"min";
		}
		if(com){
			if(!isNaN(hf)) return 0;
			else if(hf_m==undefined || hf_h==undefined) return 0;
			else{
				let hd=this.zero(hd_h).toString()+""+this.zero(hd_m).toString();
				let hf=this.zero(hf_h).toString()+""+this.zero(hf_m).toString();
				return hf-hd; 
			}
		}
		else{
			return this.parse_heure(s);
		}
	}

	isheure(h){
		if(h.toLowerCase().split("h").length!=2) return false;
		else if(h.toLowerCase().split("h")[0]>=24 || h.toLowerCase().split("h")[0]<0 || isNaN(h.toLowerCase().split("h")[0]) || isNaN(h.toLowerCase().split("h")[1].split("m")[0]) || h.toLowerCase().split("h")[1].split("m")[0]<0 || h.toLowerCase().split("h")[1].split("m")[0]>=60){
			return false
		}
		else return true;
	}

	parse_date(dat){
		let p=dat;
		if(typeof(p-2)=="number"){
			let tab=p.toString().split("");
			let jour=tab.map((e,index)=>{if(index>5) return e}).join("");
			let m=parseInt(tab[4].concat(tab[5]));
			let mois=this.mois[m];
			let annee=tab.map((e,index)=>{if(index<4) return e}).join("");
			p={
				date:jour+" "+mois+" "+annee,
				dat:annee+"-"+this.zero(m)+"-"+this.zero(jour),
				jour:jour,
				mois:mois,
				annee:annee,
				m_a:mois+" "+annee
			}
			return p;
		}
		else console.error("un nombre est attendu parse_date(number)");
	}
}