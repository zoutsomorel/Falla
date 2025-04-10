
	class NavigationTitre extends Morel_Dom{
		static div={}
		constructor(div,id,titre){
			super();
			this.div=div;
			this.id=id;
			this.titre=titre;
			this.div.style.textAlign='right';
			this.divTitre=this.getChild(div,id);
			if(NavigationTitre.div[titre]) NavigationTitre.div[titre].remove(); 
			this.putBtn();
			this.event();
			NavigationTitre.div[titre]=this.divBtn;
		}

		body(){
			const f=(clas='up',t=true)=>this.element('div',
				{
					id:clas,
					class:'rounded-50 text-white suspention pointer',
					style:'display:inline-block;background:rgba(30,20,120,0.8);margin-top:2px;padding:5px;width:50px;border-radius:50%'
				},
				t?this.element('i',{class:'fa fa-long-arrow-'+clas}):clas
			);

			return this.balise(this.element('',{},
				[f(this.titre,false),'<br/>',f(),'<br/>',f('down')]
			));
		}

		putBtn(){
			this.divBtn=document.createElement('div');
			this.divBtn.classList.add('suiv');
			this.divBtn.innerHTML=this.body();
			// console.log(this.divBtn);
			this.div.insertBefore(this.divBtn,this.div.children[0]);
		}

		observeElement(el){
			return new Promise(
				(sucess)=>{
					let t=false;
					(new IntersectionObserver((entries) => {
					    entries.forEach(async (entry) => {
					        if (entry.isIntersecting) {
					        	t=true;
							 }
						});
					},{ threshold: 1 })).observe(el);

					setTimeout(()=>{
						sucess(t);
					},10)
				}
			)
		}

		event(){
			const suiv=async (p=1)=>{
				// detecter le titre visible
				const height=window.innerHeight - 50;
				let posDiv=window.scrollY;
				let d=0;
				for(let i=0;i<this.divTitre.length;i++){
					let posTitre=this.divTitre[i].offsetTop;
					if((posTitre + height)>posDiv){
						d=i;
						break;
					}
				}
				console.log(d);
				d+=p;
				if(d<0) d=0;
				if(d>this.divTitre.length-1) d=this.divTitre.length-1;
				console.log(this.divTitre[d].offsetTop);
				let posY=this.divTitre[d].offsetTop  - (50);
				window.scrollTo(0,posY)
			}

			this.getChild(this.divBtn,'down')[0].onclick=()=>{suiv(1)}
			this.getChild(this.divBtn,'up')[0].onclick=()=>{suiv(-1)}

			this.getChild(this.divBtn,'Categorie')[0].onclick=()=>{
				this.selectCategorie();
			}
		}

		selectCategorie(){
			let div=popup(this.balise(this.element('',{},
				[
					(new AfficheProduit()).htmlTitre('Liste des categories',false),'<br/>',
					this.element('div',{id:'divCat',class:'grid-150 justify-content-center'})]
			)),false,true,'container-1000');
			let divCat=this.getChild(div,'divCat')[0];
			divCat.innerHTML=this.balise(
				this.element('',{},
					this.divTitre.map(e=>{
						return this.element('div',{id:'d',class:'shadow p-2 rounded flex-center pointer',style:'height:70px'},e.innerHTML)
					})
				)
			);

			let d=this.getChild(divCat,'d');
			d.forEach((e,i)=>{
				e.onclick=()=>{
					div.remove();
					window.scrollTo(0,this.divTitre[i].offsetTop - 50);
				}
			});

			this.getChild(div,'search')[0].onkeyup=(e)=>{
				let val=e.target.value.toLowerCase();
				d.forEach(e=>{
					if(e.innerHTML.toLowerCase().indexOf(val)!=-1) this.display(e,'');
					else this.display(e,'none');
				})
			}
		}

	}