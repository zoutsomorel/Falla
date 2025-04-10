if(typeof(blob)=='undefined') blob=new Morel_Blob();
class SelectImage extends Morel_Dom{
		constructor(div,image,func){
			super();
			this.func=func;
			this.div=this.select(div);
			this.image=image || '';
			if(this.div.innerHTML==''){
				this.div.innerHTML=this.body();
			}
			this.evenement();
		}

		body(){
			return this.balise(
				this.element(
					'div',
					{},
					[
						this.element('div',{id:'titre'},this.image!=''?'Changer l\'image':'Selectionner une image'),
						this.element('div',{id:'divImag',class:'my-2'},
							this.image!=''?this.element('img',{style:"height:200px",text:this.image}):''
						)
					]
				)
			)
		}

		async selectImage(){
			return new Promise((success)=>{
				let input=document.createElement('input');
				input.setAttribute('type','file');
				input.style.display='none';
				document.body.appendChild(input);
				input.onchange=()=>{
					success(input.files[0]);
					input.remove();
				}
				input.click();
			})
		}

		selectDiv(){
			this.divImage=this.getChild(this.div,'divImag')[0];
		}

		evenement(){
			this.selectDiv()
			this.div.onclick=async ()=>{
				let b=await this.selectImage();
				this.image=await blob.changeBlob(b);
				if(this.div.innerHTML==''){
					this.div.innerHTML=this.body();
				}
				if(this.func) this.func(this.image)
			}
		}
	}