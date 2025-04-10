
class ListeProduit extends Morel_Dom{
	constructor(div,produit,titre,plusProduit,met){
		super();
		this.div=div;
		this.produit=produit;
		this.titre=titre;
		this.met=met;
		this.div.innerHTML=this.body();
		this.variable();
		new AffProd(this.aff,produit,plusProduit,met);
		if(!met) this.putBtnPlus();
	}

	variable(){
		this.aff=this.getChild(this.div,'aff')[0];
	}

	body(){
		const tit=this.element('div',
			{
				style:'padding:10px 0px 0px 0px;background:white;z-index:10;margin-left:5px;width:calc(100% - 10px)'
			},
			[
				this.element('div',
					{
						class:'flex',
					},
					[ 
						this.element('h4',{class:'text-left flex-center justify-content-left',style:'width:calc(100% - 20px)'},this.titre),
						!this.met?this.element('div',{style:'width:20px',class:'justify-content-right'},
							this.element('i',{class:'fa fa-angle-right fw-bold fs-5 pointer'})
						):''
					]
				),this.element('hr',{class:'my-1',style:'margin-left:0px'})
			]
		)
		return this.balise(this.element('',{},
			[
				!this.met?this.element('div',{id:'titreProd',style:'position:absolute;margin-top:-30px;visibility:hidden'},this.titre):'',
				this.element('div',{style:`position:sticky;top:${!this.met?'75px':'0px'};z-index:10`,class:'bg-white'},
					[
						tit
					]
				),
				this.element('div',{class:'aff'})
			]
		));
	}

	putBtnPlus(){
		let div=document.createElement('div');
		div.classList.add('text-center','w-100','my-2');
		div.innerHTML=this.balise(
			this.element('button',{style:'padding:10px 20px',class:'btn border bg-primary fw-bold text-white'},
			[this.element('i',{class:'fa fa-angle-down'}),' Plus'])
		);
		const f=()=>{
			let d=popup('',false,true,'container-1000');
			let info=this.getChild(d,'info')[0];
			const newDiv=document.createElement('div');
			info.appendChild(newDiv);
			new ListeProduit(newDiv,this.produit,this.titre,this.plusProduit,true);
		}
		this.getChild(div,'button')[0].onclick=()=>{
			f();
		}
		this.getChild(this.div,'fa-angle-right')[0].onclick=()=>{
			f();
		}
		this.aff.appendChild(div);
	}

}


/*
	mettre les produit dans une div et l'ajuster pour un meilleur affichage
*/

class AffProd extends Morel_Dom{
	constructor(div,produit,plusProduit,met){
		super();
		this.div=div;
		this.produit=produit;
		this.plusProduit=plusProduit;
		this.met=met;
		this.div.innerHTML=this.body();
		this.variable();
		this.d;
		produit.forEach(e=>this.putProduit(e));
		if(met){
			setTimeout(()=>{this.observer(this.d)},100);
		}
		setTimeout(()=>this.ajusteDiv(),100);
		window.addEventListener('resize',()=>{this.ajusteDiv()});

	}

	variable(){
		this.affProd=this.getChild(this.div,'affProd')[0];
	}

	body(){
		return this.balise(this.element('div',{class:'affProd'}))
	}

	putProduit(produit){
		if(!produit) return;
		let d=document.createElement('div');
		this.affProd.appendChild(d);
		new AfficheProduit(d,produit);
		this.d=d;
	}

	// faire apparatre certain produits quand on observe le dernier element
	observer(d){
		if(!this.ob){
			this.ob= new IntersectionObserver((entries) => {
			    entries.forEach(async (entry) => {
			        if (entry.isIntersecting) {
			        	if(!this.plusProduit) return false;
			          	let prod=await this.plusProduit(this.produit[this.produit.length-1]._id);
			          	if(prod.length>0){
			          		prod.forEach(e=>this.putProduit(e));
							setTimeout(()=>this.ajusteDiv(),100);
							this.ob.observe(this.d);
			          	}
			        }
			    });
			},{ threshold: 0.8 })
		}
		this.ob.observe(d);
	}

	// ajuster la position des produits pour reduire les espaces entre elle
	ajusteDiv(){
		let div=dom.getChild(this.affProd,'divProduit').map(e=>e.parentElement);

		const pos=(e)=>{
			return {
		        top:e.offsetTop,
		        left:e.offsetLeft,
		        width:e.offsetWidth,
		        height:e.offsetHeight 
		    }
		}

		div.forEach(e=>e.style.marginTop='0px');

		for(let i=1;i<div.length;i++){
			let d=div[i];
			let posD=pos(d);

			for(let j=i-1;j>=0;j--){
				let a=div[j];
				let posA=pos(a);

				if(posA.left==posD.left){
					let posP=pos(dom.getChild(a,'divProduit')[0]);
					let dif=posD.top-(posA.top+posP.height+20);
					if(dif>0){
						d.style.marginTop='-'+dif+'px';
					}
					break;
				}
			}
		}
	}
}