class Message extends Morel_Dom{


	constructor(div,message,titre,url,urlSocket){

		super();
		this.message=[
			{
				idUtilisateur:1,
				nomUtilisateur:'Morel',
				message:'Bonjour',
				audio:'cool',
				img:'../img/1.jpg',
				reponse:{
					nomUtilisateur:'Franbel',
					message:'cool'
				}
			},
			{
				idUtilisateur:2,
				nomUtilisateur:'Gedons',
				message:'Franbel es la je suis sur qu\'il dors encore je ne sais vraiment pas ce que je fais',
				// img:'../img/1.jpg',
				
			}
		];
		this.img='cool';
		this.url=url;
		this.titre=titre;
		this.urlSocket=urlSocket;
		this.a=new Audio();
		this.isDiv=true;
		this.div=document.createElement('div');
		this.div.innerHTML=this.body();
		this.div.classList.add('popo');
		if(!div || div==''){
			this.div.classList.add('shadow','discution');
			document.body.appendChild(this.div);
		}else{
			this.isDiv=false;
			div.classList('w-100','h-100');
			div.style.overflowY='scroll';
			div.appendChild(this.div);
		}
		this.fermer();

		// instancier le formulaire d'envoie et le soumettre les donnee qui y sont ajouter
		this.formMessage=new FormMessage(this.getChild(this.div,'formMessage')[0],'','');
		this.submitMessage();


		this.divMessage=this.getChild(this.div,'divMessage')[0];

		// afficher les messages
		this.message.forEach(e=>this.affMessage(e));
	}


	// soummettre les donnees
	submitMessage(){
		this.formMessage.submitMessage().then((data)=>{
			console.log(data);
			this.submitMessage();
		});
	}

	fermer(){
		let p;
		if(p=this.getChild(this.div,'fa')[0]){
			p.onclick=()=>{
				opacityRemove(this.div);
				Message.active=true;
			}
		}
	}

	body(){

		const titre=this.element('div',{class:'flex w-100 bg-white',style:'position:sticky;top:0px'},
			[
				this.element('div',{style:'width:20px;height:inherit',class:'flex-center'},this.element('i',{class:'fa fa-angle-left',style:'font-size:18px'})),
				,this.element('div',{style:'width:calc(100% - 20px)',class:'flex-center fw-bold suspention'},this.titre)
			]
		)

		return this.balise(
			this.element('',{},
				[
					this.isDiv?titre:'','<br/>',
					this.element('div',{id:'formMessage',class:'divFormMessage w-100'}),
					this.element('div',{id:'divMessage',style:'padding:0px 0px 100px 0px;margin-top:-70px'})
				]
			)
		)
	}

	affMessage(message,before=false){
		let d=document.createElement('div');
		d.classList.add('w-100');
		new AffMessage(d,message,{_id:1},false,this.modifier,this.repondre);
		if(!before) this.divMessage.appendChild(d);
		else this.divMessage.insertBefore(d,this.divMessage.children[0]);
	}
	

	modifier(t='modifier',titre){
		return new Promise(
			(success)=>{
				let parent=this.getParent(this.div,'popo')[0];
				if(parent.scrollTop<100) parent.scrollTo(0,100);
				let back=document.createElement('div');
				back.style=`position:sticky;top:50px;height:calc(100% - 50px);width:100%;background:rgba(255,255,255,0.9)`;
				back.align='center';
				if(t=='supprimer') back.classList.add('flex-center');
				console.log(this.htmlMessage());

				// afficher le html
				back.innerHTML=this.balise(this.element('',{},[
					this.element('div',{class:'flex-center w-100'},[
						this.element('div',{class:'text-dark text-left px-2 fw-bold suspention',style:'width:calc(100% - 20px)'},titre || 'Modifier le message'),
						this.element('div',{class:'text-center h-100 flex-center',style:'width:20px'},this.element('i',{class:'fa fa-times text-danger fs-4 fw-bold'}))
					]),
					t=='repondre'?this.element('div',{style:'position:sticky;top:0px'},this.htmlMessage(true)):'',
					t!='supprimer'?this.element('div',{class:'divFormMessage'}):'',

					// supprimer un message
					t=='supprimer'?this.element('div',{class:'w-100 rounded bg-white'},
						[
							this.element('div',{class:'fw-bold'},'Voulez supprimer'),
							this.element('div',{class:'flex-center'},
								[['Oui','bg-danger'],['Non','bg-primary']].map(e=>{
									return this.element('div',{class:'px-2'},
										this.element('button',{class:e[1]+' btn '},e[0])
									)
								})
							)
						]
					):''
				]));

				parent.insertBefore(back,parent.children[3]);
				this.getChild(back,'fa-times')[0].onclick=()=>{
					opacityRemove(back);
				}

				// instacier le formulaire
				let formMessage;
				let d=this.getChild(back,'divFormMessage')[0];
				if(t=='modifier'){
					formMessage=new FormMessage(d,this.message.img,this.message.audio || '',this.message.message);
					formMessage.submitMessage().then(data=>{
						success(data);
						opacityRemove(back);
					});
					formMessage.image.func(this.message.img || '');
					if(this.message.audio!=''){
						formMessage.submitSong(true);
						new StreamAudio(this.getChild(formMessage.divAudio,'song')[0],this.message.audio.url,1000);
					}
				}else if(t=='repondre'){
					formMessage=new FormMessage(d,'','','');
					back.style.overflowY='scroll';
					success({formMessage:formMessage,back:back});
				}else if(t=='supprimer'){
					success(true);
				}
			}
		)
	}

	async repondre(){
		return new Promise(
			async (success)=>{
				let a=await this.modifier('repondre','Repondre au message')
				a.formMessage.submitMessage().then((data)=>{
					success(data);
					opacityRemove(a.back);
				})
			}
		)
	}
}

/*
	class qui vas affiche le formulaire pour l'envoi des messages
*/

class FormMessage extends Morel_Dom{

	constructor(div,img,audio,text){
		super();
		this.img=img || '';
		this.audio=audio || '';
		this.mess=text || '';
		this.div=div;
		this.div.classList.add('ko');
		this.div.marginTop='';
		this.div.style.top='';
		this.div.innerHTML=this.body();
	}

	body(){
		const btn=(icon)=>{
			return this.element(icon=='fa-arrow-right'?'button':'div',
				{
					class:'flex-center px-1 bg-white border-none',
				},this.element('i',{class:'pointer fa '+icon})
			)
		}

		const form=this.element('div',
			{
				class:'px-2 border-box',
				style:'width:calc(100% - 70px)'
			},
			this.element('textArea',{style:'font-size:14px',class:'p-2 w-100 border-box border-none',attribute:"placeholder='ecrit ton message...'"})
		)

		return this.balise(this.element('form',
			{
				id:'formulaire',
				class:'shadow flex rounded bg-white',
				style:'width:100%',
				attribute:"align='center'"
			},
			[
				form,
				this.element('div',{class:'flex-center justify-content-right',style:"width:70px"},
					['fa-images','fa-microphone','fa-arrow-right'].map(e=>btn(e))
				)
			]
		))
	}

	submitMessage(){
		return new Promise(
		(success)=>{

			if(!this.form) this.form=this.getChild(this.div,'form')[0];

			if(!this.song) {
				this.song=this.getChild(this.form,'fa-microphone')[0];
				console.log(this.song);
				this.song.onclick=()=>{
					this.audio='';
					this.submitSong();
				}
			}

			this.image=new SelectImage(this.getChild(this.form,'fa-images')[0].parentElement,this.image,this.submitImage);

			if(!this.text) {
				this.text=this.getChild(this.form,'textArea')[0];
				this.text.value=this.mess;
			}

			const wait=(t=100)=>{
				return new Promise((success)=>setTimeout(()=>{success(true)},t))
			}

			this.form.onsubmit=async (e)=>{
				e.preventDefault();
				let d=this.getChild(this.div,'divImage')[0];
				if(this.divAudio){
					let a=this.getChild(this.divAudio,'fa-stop')[0];
					if(a){
						a.click();
						await wait(100);
					}
				}

				success({
					message:this.text.value,
					audio:this.audio,
					img:this.image.image
				});

				if(d) opacityRemove(d);
				if(this.divAudio) opacityRemove(this.divAudio);
				this.div.style.top='';
				this.div.style.height='';
			}
		})
	}

	// soumettre l'audio
	htmlSong(){
		this.temps=0;
		let div=document.createElement('div');
		div.classList.add('flex','bg-white','border-box','divSong');

		// construire le html du song
		const song=this.element('div',{class:'flex bg-dark p-2 border-box rounded-20 w-100'},
			[
				this.element('div',{style:'width:20px'},this.element('i',{class:'pointer px-1 fa fa-stop text-white text-center'})),
				this.element('div',{style:'width:calc(100% - 100px)'}),
				this.element('div',{style:'width:80px',class:'text-right text-white count'},"00:00")
			]
		);

		// construire le send
		const send=this.element('div',{style:'width:30px',class:'flex-center justify-content-right'},
			this.element('i',{class:'fa fa-trash px-2 pointer',style:'text-shadow:0px 0px 2px white'}),
		);

		// injecter dans la div
		div.innerHTML=this.balise(this.element('',{},
			[
				this.element('div',{style:"width:calc(100% - 30px)",id:'song'},song),
				send
			]
		));
		this.div.insertBefore(div,this.form);
		if(this.divAudio){
			this.divAudio.remove();
			delete this.divAudio;
		}
		this.divAudio=div;
		return div;
	}

	async submitSong(modif=false){
		let div=this.htmlSong();

		// effacer l'audio
		this.getChild(div,'fa-trash')[0].onclick=()=>{
			delete this.divAudio;
			opacityRemove(div);
			btnStop.click();
			this.audio='';
			if(!this.getChild(this.div,'divImage')[0]){
				setTop('');
			}else setTop('290px');
		}

		// conter le temps de l'enregistrement audio
		let divCount=this.getChild(div,'count')[0];
		let isCount=true;

		// demarer l'audio
		let btnStop=this.getChild(div,'fa-stop')[0];

		const changeClass=(d,removeClass,addClass)=>{
			d.classList.add(addClass);
			d.classList.remove(removeClass);
		}

		// ajuster la taille de la divparent pour une bonne affichage
		const setTop=(t='')=>{
			this.div.style.top=`calc(100% - ${t})`;
			this.div.style.height=t;	
			if(t=='') this.div.style.top="";
		}

		if(this.getChild(this.div,'divImage')[0]){
			setTop('325px');	
		}
		else{
			setTop('105px');
		} 

		let divSong=this.getChild(div,'song')[0];

		this.setVoice(btnStop,divCount,modif).then(audio=>{
			if(audio || this.audio!=''){
				this.audio={url:audio,time:this.temps}
				// mettre en place le streamin audio
				new StreamAudio(divSong,audio,this.temps);
			}else{
				if(!modif) this.getChild(div,'fa-trash')[0].click();
			}
		});
	}

	// soumettre l'image
	submitImage(img){

		let taille=parseInt(img.length*3/(1024*4*1024)*100)/100;
		if(img.length==0) return;
		if(taille<2){
			this.image=img;
			if(this.divImage){
				this.divImage.remove();
				delete this.divImage;
			}

			// creer la div parent de l'image
			let div=document.createElement('div');
			div.classList.add('bg-white','flex','divImage');
			div.style=`height:225px;`;
			div.align='center';
			div.style.width="width:calc(100% - 5px)";

			// afficher l'image
			const image=this.element('div',{style:'width:calc(100% - 30px);height:100%'},this.element('img',{class:'h-100 w-100',text:img,style:'max-height:100%'}));
			const send=this.element('div',{style:'width:30px',class:'flex-center justify-content-right'},
				this.element('i',{class:'fa fa-trash px-2 pointer',style:'text-shadow:0px 0px 2px white'}),
			);
			const setTop=(t='')=>{
				d.style.top=`calc(100% - ${t})`;
				if(t=='') d.style.top='';
				d.style.height=t;	
			}

			div.innerHTML=this.balise(this.element('',{},[image,'<br/>',send]));
			let d=this.getParent(this.div,'ko')[0];
			d.insertBefore(div,d.children[0]);
			if(this.getChild(d,'divSong')[0]){
				setTop('325px');	
			}
			else{
				setTop('290px');
			}

			this.divImage=div;
			// effacer l'image
			this.getChild(div,'fa-trash')[0].onclick=()=>{
				delete this.divImage;
				opacityRemove(div);
				this.image='';
				if(!this.getChild(d,'divSong')[0]){
					setTop('');
				}else{
					setTop('105px');
				}
			}
		}else{
			popup("<h4 class='text-danger'>L'image doit être inferieur à 2Mo</h4>");
		}
	}

	count(divCount){
		let temps=0;
		this.temps=temps;
		const zero=(n)=>{
			if(n<10) return '0'+n;
			else return n;
		}

		let t=setInterval(()=>{
			if(!this.isCount){
				clearInterval(t);
				return;
			}
			if(!this.isPause){
				temps++;
				this.temps=temps;
				divCount.innerHTML=zero(parseInt(temps/60))+":"+zero(temps%60);
			}
		},1000);
	}

	// commencer le voice
	setVoice(btnStop,divCount,modif){
		return new Promise(
			async (success)=>{
				try{
				if(modif){
					success(false);
					return;
				}
				this.stream=await navigator.mediaDevices.getUserMedia({audio:true,video:false});
				this.isCount=true;
				this.count(divCount);
				const mediaRecord=new MediaRecorder(this.stream,{ mimeType: 'audio/webm;codecs=opus' });
				let chuck=[];

				mediaRecord.ondataavailable=(event)=>{
					if(event.data.size>0) chuck.push(event.data);
				}

				mediaRecord.onstop=async ()=>{
					const audioBlob=new Blob(chuck,{type:'audio/webm'});
					success(await blob.changeBlob(audioBlob));
				}

				mediaRecord.start();

				btnStop.onclick=()=>{
					mediaRecord.stop();
					this.isCount=false;
					if(this.stream) this.stream.getTracks().forEach((track) => track.stop());
				}}catch(e){success(false)}

			}
		)
	}
}

/*
	class qui vas afficher un message
*/

class AffMessage extends Morel_Dom{

	constructor(div,message,user,supprimer,modifier,repondre){
		super();
		this.div=div;
		this.user=user;
		this.message=message;
		this.suprimer=supprimer;
		this.modifier=modifier;
		this.repondre=repondre;
		if(div){
			this.div.style.padding='5px 0px';
			this.init();
		}
	}


	init(){
		this.div.innerHTML=this.body();
		this.putAudio();
		this.plusAction();
	}

	body(){

		let isUser=this.message.idUtilisateur==this.user._id;
		this.div.align=isUser?'right':'left';
		const user=this.element('div',{style:'width:30px;display:table-cell;vertical-align:bottom',class:'px-2 border-box'},this.element('i',{class:'fa fa-user'}));

		
		const btnPlus=this.element('div',{class:'flex-center border-box px-1',width:'20px'},this.element('i',{class:'pointer text-dark fa fa-ellipsis-vertical'}))
		const repondre=this.element('div',{class:'flex-center border-box px-1',width:'20px'},this.element('i',{class:'pointer text-dark fa fa-share'}))
		
		return this.balise(this.element('div',
			{
				class:`${isUser?'text-white justify-content-right':'text-black'} flex `,
				style:`max-width:80%;`,
			},
			[
				isUser?btnPlus:user,
				isUser?repondre:'',
				this.htmlMessage(),
				isUser?'':repondre
			]
		))
	}

	htmlMessage(modif=false){
		let isUser=this.message.idUtilisateur==this.user._id;
		const sus=(p,n=30)=>{
			let a='';
			if(p.length<=n) a=p;
			else{
				for(let i=0;i<n;i++) a+=p[i];
				a+='...';
			}
			return a;
		}
		const reponse=(reponse,r=true)=>{
			const img=this.element('div',
				{
					style:`${r?'width:100px;height:100px;margin-left:calc(50% - 50px)':''}`
				},
				(modif && !r)?this.element('div',
					{class:'flex-center justify-content-left'},
					[this.element('i',{class:'fa fa-images',style:'padding:0px 2px 0px 0px'}),this.element('i',{},'image')]):this.element('img',{text:reponse.img,style:'max-width:100%;'})
			);

			const audio=this.element('div',
				{...((r || modif)?{class:'flex-center justify-content-left'}:{id:'song'})},
				(r || modif)?[this.element('i',{class:'fa fa-microphone ',style:'padding:0px 2px 0px 0px'}),this.element('i',{},'00:00')]:''
			)

			return this.element('div',{class:'p-1 border-box rounded w-100',style:`${r?'background:#ccc;font-size:13px;color:black':''}`},
				[
					// nom Utilisateur
					r?this.element('div',{class:'fw-bold suspention'},reponse.idUtilisateur==this.user._id?'Vous':reponse.nomUtilisateur):'',

					// image
					reponse.img?img:'',

					// song
					reponse.audio?audio:'',

					// message
					(reponse.message!='' && reponse.message)?r?sus(reponse.message):reponse.message:''
				]
			)
		}

		const getDate=(d)=>{
			const zero=(a)=>{
				if(a<10) return '0'+a;
				else return a;
			}
			d=new Date(d || Date.now());
			return zero(d.getDate())+'/'+zero(d.getMonth()+1)+"/"+d.getFullYear()+' '+zero(d.getHours())+':'+zero(d.getMinutes())
		}

		return this.element('div',
			{
				class:`rounded text-left shadow p-1 border-box messa ${isUser?'text-white':'text-dark'}`,
				style:`min-width:100px;background:${isUser?'blueviolet':'white'};max-width:calc(100% - ${isUser?'40px':'50px'})`
			},
			[
				// nom
				this.element('div',{class:'fw-bold'},isUser?'Vous':this.message.nomUtilisateur),

				// reponse
				(this.message.reponse && !modif)?reponse(this.message.reponse,true):'',

				// message
				reponse(this.message,false),

				// date,
				this.element('div',{class:'text-right',style:'font-size:10px'},this.element('i',{},getDate(this.message.date)))

			]
		);
	}

	putAudio(){
		if(this.message.audio){
			let p;
			if(p=this.getChild(this.div,'song')[0]){
				p.style.fontSize='10px';
				this.getChild(this.div,'messa')[0].style.minWidth='200px';
				new StreamAudio(p,this.message.audio,false,1000);
			}
		}
	}

	plusAction(){
		let btnPlus;
		if(btnPlus=this.getChild(this.div,'fa-ellipsis-vertical')[0]){
			let d=this.balise(this.element('div',{class:'bg-white text-dark'},
				[['fa fa-edit','Modifier'],['fa fa-trash','Supprimer']].map((e,i)=>this.element('div',{id:e[1],class:'my-1 flex-center w-100 justify-content-left px-2 pointer',style:`${i<2?'border:1px solid #ccc':''}`},
					[this.element('i',{class:e[0]}),this.element('span',{class:'mx-1 suspention'},e[1])]
				))
			));

			btnPlus.onclick=()=>{
				let div=infoDiv(btnPlus,d,'rounded shadow px-1',150,80);

				// modifier un message;
				this.getChild(div,'Modifier')[0].onclick=()=>{
					opacityRemove(div);
					this.modifier().then(e=>{
						this.message={...this.message,...e};
						this.init();
					})
				}
			}
		}

		let repondre;
		if(repondre=this.getChild(this.div,'fa-share')[0]){
			repondre.onclick=()=>{
				this.repondre().then(e=>{
					let message={
						idUtilisateur:this.user._id,
						nomUtilisateur:'Morel',
						...e,
						_id:Date.now(),
						reponse:this.message
					}
					let d=document.createElement('div');
					this.div.parentElement.appendChild(d);
					new AffMessage(d,message,this.user,this.supprimer,this.modifier,this.repondre);
				});	
			}
		}
	}


}


class StreamAudio extends Morel_Dom{
	constructor(div,audio,duration){
		super();
		this.div=div;
		this.duration=duration || 0;
		this.div.innerHTML=this.body();
		this.audio=audio || '';
		this.a=new Audio();
		this.variable();
		this.controls();
	}

	variable(){
		this.divCount=this.getChild(this.div,'count')[0];
		this.divStream=this.getChild(this.div,'stream')[0];
		this.divDefile=this.getChild(this.div,'defile')[0];
		this.play=this.getChild(this.div,'fa-play')[0];
	}

	body(){
		const song=this.element('div',{class:'flex bg-dark p-2 border-box rounded-20 w-100'},
			[
				this.element('div',{style:'width:20px'},this.element('i',{class:'pointer px-1 fa fa-play text-white text-center'})),
				this.element('div',{style:'width:calc(100% - 70px)',class:'flex-center'},
					this.element('div',{class:'w-100 pointer stream',style:'height:1px;border:1px #f2f2f2 dashed'},
						this.element('div',{class:'defile',style:'width:2%;height:1px;border:1px white solid;margin-top:-1px'})
					)
				),
				this.element('div',{style:'width:50px',class:'text-right text-white count'},this.zero(parseInt(this.duration/60))+":"+this.zero(this.duration%60))
			]
		);
		return this.balise(song);
	}

	changeClass(d,removeClass,addClass){
		d.classList.add(addClass);
		d.classList.remove(removeClass);
	}

	zero(n){
		if(n<10) return '0'+n;
		else return n;
	}

	count(divCount){
		if(!this.temps) this.temps=0;

		let t=setInterval(()=>{
			if(!this.isCount || this.temps>this.duration){
				this.temps=0;
				clearInterval(t);
				return;
			}
			if(!this.isPause){
				this.temps++;
				this.defile(0,true);
			}
		},1000);
	}

	setDuration(temps){
		this.divCount.innerHTML=this.zero(parseInt(temps/60))+":"+this.zero(temps%60);
	}

	defile(posX,temps=false){
		let p;
		console.log(this.temps);
		if(!temps){
			let pos=this.el_position(this.divStream);
			p=parseInt(((posX-pos.x)/pos.width)*100);
			this.temps=parseInt(this.duration*p/100);
		}
		else{
			p=parseInt(parseInt(this.temps/this.duration*100));
		}
		this.divDefile.style.width=p+"%";
		let current=parseInt(this.duration*p/100);
		this.setDuration(current);
		if(typeof(this.a.src)!="undefined") this.a.currentTime=current || 0;
		else this.currentTime=current || 0;
	}

	controls(){

		this.divStream.onmousedown=(e)=>{
			this.defile(e.clientX);
		}

		this.divStream.ontouchend=(e)=>{
			this.defile(e.changedTouches[0].clientX);
		}

		// lecture de la video
		this.play.onclick=()=>{
			if([...this.play.classList].indexOf('fa-pause')!=-1){
				this.isPause=true;
				this.changeClass(this.play,'fa-pause','fa-play');
				this.pause();
				return;
			}

			if(this.isPause){
				this.changeClass(this.play,'fa-play','fa-pause');
				this.a.play();
				this.isPause=false;
				return;
			}

			this.a.addEventListener('ended',()=>{
				this.isCount=false;
				this.a.currentTime=0;
				this.isPause=false;
				this.changeClass(this.play,'fa-pause','fa-play');
			});

			this.changeClass(this.play,'fa-play','fa-pause');
			if(this.a.src=='') this.a.src=this.audio;
			if(this.currentTime){
				this.a.currentTime=this.currentTime;
				delete this.currentTime;
			}
			this.isCount=true;
			this.isPause=false;
			this.count();
			this.a.play();
		}
	}
}