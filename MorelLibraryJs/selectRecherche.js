class SelectRecherche extends Morel_Dom{
		constructor(div,option,att,selected){
			super();
			this.div=this.select(div);
			this.option=option;
			this.att=att || 'value';
			this.selected=selected || option[0] || {};
			this.div.innerHTML=this.body();
			this.selectedDiv();
			this.evenement();
		}

		body(){
			return this.balise(
				this.element('div',{},[
					this.element('div',{id:'divSelected'},this.selected[this.att] || this.selected)
					,
					this.element(
						'div',
						{
							style:"max-height:400px;overflow-y:scroll;display:none",
							class:'w-100 my-2',
							id:'divOption'
						},
						[this.htmlRecherche(),this.htmlOption()]
					)
				])
			);
		}

		renit(){
			this.divSelected.innerHTML=this.selected[this.att] || this.selected
		}

		// remplire les options
		htmlOption(){
			const option=(op)=>{
				return this.element(
					'div',
					{
						class:'option pointer p-2 text-left rounded my-2',
						style:"background:#f5f5f5;width:95%",
						id:'option'
					},
					op.value || op
				)
			}
			return this.element(
				'div',{},
				this.option.map(e=>option(e))
			)
		}


		htmlRecherche(){
			const icon=this.element(
				'div',
				{
					class:'flex-center',
					style:"width:30px;border:1px solid #f2f2f2;border-right:none;border-radius:6px 0px 0px 6px"
				},
				this.element('i',{class:'fa fa-search'})
			);

			const input=this.element(
				'div',
				{
					class:'border-box ',
					style:"border-left:none;width:calc(100% - 60px);border:1px solid #f2f2f2;border-left:none;border-radius:0px 6px 6px 0px;",
				},
				this.element('input',{id:'inputRecherche',class:'border-0 p-2 border-box w-100',attribute:"placeholder='Recherche'"})
			);

			const sorti=this.element(
				'div',
				{
					style:'width:30px',
					class:'px-2 flex-center'
				},
				this.element('i',{class:'fa fa-times text-danger'})
			)

			return this.element(
				'div',
				{
					style:"position:sticky;top:0px",
					class:'flex w-100 bg-white'
				},
				[icon,input,sorti]
			)
		}

		selectDiv(value){
			return this.getChild(this.div,value)[0]
		}

		selectedDiv(){
			this.divOption=this.selectDiv('divOption');
			this.options=this.getChild(this.div,'option');
			this.divSelected=this.selectDiv('divSelected');
		}

		displayOption(type=''){
			this.display(this.divOption,type);
		}

		actionDisplay(){
			this.selectDiv('fa-times').onclick=()=>{this.displayOption('none')}
			this.divSelected.onclick=()=>{this.displayOption()}
		}


		// rechercher les options
		rechercheEvenement(){
			this.selectDiv('inputRecherche').onkeyup=(e)=>{
				let value=e.target.value.toLowerCase();
				this.options.forEach(e=>{
					let v=e.innerText.toLowerCase();
					if(v.indexOf(value)==-1) this.display(e,'none');
					else this.display(e,'');
				})
			}
		}

		// choisir l'option
		choisirOption(){
			this.options.forEach((e,i)=>{
				e.onclick=()=>{
					this.selected=this.option[i];
					this.divSelected.innerHTML=this.selected[att] || this.selected;
					this.displayOption('none');
				}
			});
		}

		evenement(){
			this.choisirOption();
			this.actionDisplay();
			this.rechercheEvenement();
		}
	}
