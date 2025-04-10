/*
	Elle vas permettre d'afficher les menu des discutions en flex de l'image et le dernier message
*/
class TitleMessage extends Morel_Dom{


	constructor(div,discution,att,titre,action){
		super();
		this.action=action;
		this.discution=discution;
		this.att=att || '_id';
		this.message=message;
		this.titre=titre;
		this.div=document.createElement('div');
		this.div.innerHTML=this.body();
		if(!div || div==''){
			this.div.classList.add('shadow','discution');
			this.div.style.overflowY='scroll';
			document.body.appendChild(this.div);
		}else{
			this.div.classList.add('w-100','h-100');
			div.appendChild(this.div);
		}
		this.fermer();
		this.divMessage=this.getChild(this.div,'divMessage')[0];
		this.pushDiscution(discution);
	}

	fermer(){

		this.getChild(this.div,'fa')[0].onclick=()=>{
			opacityRemove(this.div);
		   	TitleMessage.active=true;
		}
	}


	body(){
		const titre=this.element('div',{class:'flex w-100'},
			[
				this.element('div',{style:'width:20px;height:inherit',class:'flex-center'},this.element('i',{class:'fa fa-angle-left',style:'font-size:18px'})),
				,this.element('div',{style:'width:calc(100% - 20px)',class:'flex-center fw-bold suspention'},this.titre)
			]
		)

		return this.balise(
			this.element('',{},
				[titre,'<br/>',this.element('div',{id:'divMessage'})]
			)
		)
	}

	putDiscution(discution){
		let d=document.createElement('div');
		d.classList.add('flex','w-100','my-1','titreMessage');
		const profil=this.element('div',
			{
				style:`width:50px;height:50px;border-radius:50%;background-size:cover;background-image:url('${discution.profil || discution.image}')`
			}
		);

		const dernierMessage=this.element('div',
			{
				class:'border-box px-2',
				style:'width:calc(100% - 50px);hieght:50px;'
			},
			[
				this.element('div',{class:'text-left fw-bold'},discution.nom || discution.nomProduit || discution.value),
				this.element('div',{class:'w-100 suspention'},discution.message || 'Un nouveaux message')
			]
		);

		d.innerHTML=this.balise(this.element('',{},
			[
				profil,
				dernierMessage
			]
		));

		d.onclick=()=>{
			this.action(discution);
		}
		this.divMessage.appendChild(d);
	}

	pushDiscution(discution,i=0){
		if(Array.isArray(discution)){
			if(discution[i]){
				this.putDiscution(discution[i]);
				return this.pushDiscution(discution,++i);
			}
		}
		else{
			this.putDiscution(discution);
		}
	}
}