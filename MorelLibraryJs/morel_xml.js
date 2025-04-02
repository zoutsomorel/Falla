// creer une classe qui vas effectuer des requete asynchrone dans le server


class Morel_xml{
	constructor(base=""){
		this.base=(base[base.length-1]=="/" || base=="")?base:base+"/";
		this.xml=new XMLHttpRequest();
	}

	call_server(server,post="",type="post"){
		server=this.base+server;
		return new Promise((success,echec)=>{
			this.xml.onreadystatechange=()=>{
				if(this.xml.readyState==XMLHttpRequest.DONE){
					if(this.xml.status==200){
						success(this.xml.response)
					}
					else echec("probleme de connection");
				}
			}
			if(type=="get"){
				this.xml.open("get",server,true);
			}
			else{
				this.xml.open("post",server,true);
			}
			post=this.bodyParser(post);
			if(post.toString().indexOf("object FormData")==-1) this.xml.setRequestHeader("content-type","application/x-www-form-urlencoded");
			this.xml.send(post)
		})
	}





	postParser(post){
		let t=typeof(post);
		if(t=='object' && post.toString().indexOf("object HTMLFormElement")!=-1) post=new FormData(post);
		else if(t=='object' && post.length!=undefined){
			post="";
			for(let i=0,k=0;i<t.length;i++){
				let cle=t[i][0];
				let valeur=t[i][1];
				if(cle==undefined) cle="";
				if(valeur==undefined) valeur="";
				if(cle=="") continue;
				post=cle+"="+valeur;
				if(i>t.length-1) post+="&";
			}
		}
		return post;
	}





// fonction qui vas recuperer les input dans un formulaire
	getInputForm(form){
		form=(typeof(form)=="string")?document.querySelector(form):form;
		let result={};
		if(form.name!=undefined){
			if(form.name!="") result[form.name]=form.value;
		}
		
		if(form.children.length==0){
			// console.log(form)
			if(form.name!=undefined) {
				// console.log(form.name+"="+form.value);
				if(form.name!="") result[form.name]=form.value;
				// console.log(result)
			}
			return result;
		}
		else{
			for(let i=0;i<form.children.length;i++){
				result={...result,...this.getInputForm(form.children[i])}
			}
			return result;
		}
	}




// on parse les donnes envoyer par l'utisateur
	bodyParser(post,type="form"){
		post=(typeof(post)=="string")?document.querySelector(post):post;
		// console.log(post);
		let result="";
		switch(type){
			case "json":
				result="{";

				// convertir l'orque c'est un tableau
				if(Array.isArray(post)){
					post.forEach((item,index)=>result+=`"${item[0]}":"${item[1]}",`);
					result+="}";
				}

				// convertir l'orsque c'est un element form
				else if(post.toString().indexOf("object HTMLFormElement")!=-1){
					result=JSON.stringify(this.getInputForm(post));
					// console.log(this.getInputForm(post));
				}

				// 
				else result=JSON.stringify(post);
				// console.log(result);
			return result;

			case "form":
				result="";

				// convertir l'orque c'est un tableau
				if(Array.isArray(post)){
					result=new FormData();
					post.forEach((item,index)=>result.append(item[0],item[1]));
				}

				// convertir l'orque c'est un element form
				else if(post.toString().indexOf("object HTMLFormElement")!=-1){
					result=new FormData(post);
				}

				else if(post.toString().indexOf("object FormData")!=-1){
					result=post;
				}

				// convertir quand c'est un object
				else if(typeof(post)=="object"){
					result=new FormData();
					for(let i in post) result.append(i,typeof(post[i])=='object'?JSON.stringify(post[i]):post[i]);
				}
				return result;

			default :
				// convertir l'orque c'est un tableau
				if(Array.isArray(post)){
					post.forEach((item,index)=>result+=item[0]+"="+item[1]+"&");
				}

				// convertir l'orque c'est un element form
				else if(post.toString().indexOf("object HTMLFormElement")!=-1){
					for(let i=0;i<post.children.length;i++){
						let child=post.children[i];
						if(child.name!=undefined) result+=`${child.name}=${child.value}&`
					};
				}

				else if(post.toString().indexOf("object FormData")!=-1){
					result="";
				}

				// convertir quand c'est un object
				else if(typeof(post)=="object"){
					for(let i in post) result+=`${i}=${post[i]}&`;
				}
				return result;
		}
	}





	async fetch_server(server,post,type="get"){
		post=this.postParser(post);
		if(type=="get"){
			return fetch(server+"?"+post);
		}
		else{
			let header={};
			if(post.toString().indexOf("object FormData")==-1){
				header={
					headers:{
						'content-Type':'application/x-www-form-urlencoded; charset-utf-8'
					}
				}
			}
			return fetch(server,{
				method:"POST",
				body:post,
				...header
				,
			});
		}	
	}





	async get(server,pos){
		let post=this.bodyParser(pos,"");
		server=this.base+server;

		// configuration du fecth
		if(typeof axios=="undefined"){
			return fetch(server+(post==""?post:"?"+post),(data)=>{return data.response.text()});
		}
		else{
			return axios.get(server+(post==""?post:"?"+post),(data)=>{return data.data});
		}
	}

	async post(server,pos,type="json"){
		let post=this.bodyParser(pos,type);
		// console.log(post);
		server=this.base+server;

		// configuration du fecth

		if(typeof axios=="undefined"){
			return await fetch(server,{
				method:"post",
				body:post,
				headers:((type=="form")?{}:{
					'content-Type':'application/json; charset-utf-8'
				})
			})
		}
		else{
			if(typeof(post)=="string") post=JSON.parse(post);
			return axios.post(server,post,(data)=>{return data});
		}
	}






	async put(server,pos,type="json"){
		let post=this.bodyParser(pos,type);
		// console.log(post);
		server=this.base+server;

		// configuration du fecth

		if(typeof axios=="undefined"){
			return await fetch(server,{
				method:"PUT",
				body:post,
				headers:((type=="form")?{}:{
					'content-Type':'application/json; charset-utf-8'
				})
			})
		}
		else{
			if(typeof(post)=="string") post=JSON.parse(post);
			return axios.put(server,post,(data)=>{return data});
		}
	}





	async delete(server,pos,type="json"){
		let post=this.bodyParser(pos,type);
		// console.log(post);
		server=this.base+server;

		// configuration du fecth

		if(typeof axios=="undefined"){
			return await fetch(server,{
				method:"DELETE",
				body:post,
				headers:((type=="form")?{}:{
					'content-Type':'application/json; charset-utf-8'
				})
			})
		}
		else{
			if(typeof(post)=="string") post=JSON.parse(post);
			return axios.delete(server,post,(data)=>{return data});
		}
	}
}