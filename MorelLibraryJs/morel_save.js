

class Morel_Save{


	constructor(database,config,version=1){
		this.database=database;
		this.base=indexedDB.open(this.database,version);
		this.conf=config;
		this.base.onupgradeneeded=(event)=>{
			let db=event.target.result;
			this.config(db,config);	
		}
	}




	config(db,config){
		config.forEach((co)=>{
			if(!db.objectStoreNames.contains(co.nom)){
				let object=db.createObjectStore(co.nom,{keyPath:"id",autoIncrement:co.autoIncrement || false});
				if(co.index!=undefined){
					if(!Array.isArray(co.index)) object.createIndex(co.index,co.index,{unique:co.unique || false});
					else{
						co.index.forEach((e,i)=>object.createIndex(e.nom,e.nom,{unique:e.unique || false}))
					}
				}
			}
		});
	}





	db(){
		return new Promise((success,error)=>{
			if(typeof(this.bas)=="undefined"){
				let db=this.base;
				db.onsuccess=(event)=>{
					this.bas=event.target.result
					success(this.bas);
				}
			}
			else success(this.bas);
		})
	}






	async addElement(element,table){
		console.log(element);
		try{
			let db=(await this.db()).transaction([table],"readwrite");
			let tab=db.objectStore(table);
			if(!Array.isArray(element)){
				element.id=element.id || Date.now();
				tab.add(element);
			}
			else{
				element.forEach((e)=>{
					e.id=e.id || Date.now();
					tab.add(e);
				});
			}
			return element;
		}catch(error){
			console.log(error);
			return false;
		}
	}





	getElement(el,table,champ){
		return new Promise(async (success)=>{
			try{
				let db=(await this.db()).transaction([table],"readonly");
				let tab=db.objectStore(table);
				let request;
				if(champ!=undefined && champ!="id" && champ!=""){
					let index=tab.index(champ);
					request=index.getAll(el);
				}
				else{
					if(el!="") request=tab.get(el);
					else request=tab.getAll();
				}
				request.onsuccess=(e)=>{
					success(e.target.result);
				}
				request.onerror=()=>{
					console.log("erreur de la bd");
					success(false)
				}
			}catch(error){
				success(false)
				console.log(error);
			}
		})
	}

	


	deleteElement(el,table,champ,con=true){
		return new Promise(async (success)=>{
			try{
				let db=(await this.db()).transaction([table],"readwrite");
				let tab=db.objectStore(table);
				if(champ!=undefined && champ!="id" && champ!=""){
					if(tab.indexNames.contains(champ)){
						let ta=await this.getElement(el,table,champ);
						let t=true;
						for(let i=0;i<ta.length;i++){
							let t=ta[i];
							t=await this.deleteElement(t.id,table,"id",false);
							if(t==false) break;
						}
						success(t);
					}
				}
				else{
					let request;
					if(el!=""){
						if(con){
							for(let i=0;i<this.conf.length;i++){
								let e=this.conf[i];
								if(!Array.isArray(e.index)){
									await this.deleteElement(el,e.nom,e.index,false);
								}
								else {
									for(let j=0;j<e.index.length;j++){
										await this.deleteElement(el,e.nom,e.index[j].index,false);
									}
								};
							}
						}
						request=tab.delete(el);
					}
					else{
						request=tab.clear();
					}
					request.onsuccess=(e)=>{
						success(true)
					}
					request.onerror=()=>{
						success(false)
						console.log("erreur de la bd");
					}
				}
			}catch(error){
				success(false)
				console.log(error);
			}
		})
	}

	


	updateElement(update,el,table,champ){
		return new Promise(async (success)=>{
			try{
				if(champ!=undefined && champ!="id" && champ!=""){
					let db=(await this.db()).transaction([table],"readwrite");
					let tab=db.objectStore(table);
					let t=true;
					if(tab.indexNames.contains(champ)){
						let ta=await this.getElement(el,table,champ);
						for(let i=0;i<ta.length;i++){
							let t=ta[i];
							t=await this.updateElement(update,t.id,table,"id",false);
							if(t==false) break;
						}
						success(t);
					}
				}
				else{
					let request;
					if(el!=""){
						let query=await this.getElement(el,table);
						for(let a in update){
							query[a]=update[a];
						}
						let db=(await this.db()).transaction([table],"readwrite");
						let tab=db.objectStore(table);
						request=tab.put(query);
						// success(query);
						request.onsuccess=(e)=>{
							success(query);
						}
						request.onerror=()=>{
							success(false);
							console.log("erreur de la bd");
						}
					}
					
				}
			}catch(error){
				console.log(table);
				success(false)
				console.log(error);
			}
		})	
	}
}