

class Morel_Blob{



	changeBlob(blob,type="url"){
		this.reader=new FileReader();
		return new Promise((success)=>{
			this.reader.onload=(event)=>{
				success(event.target.result);
			}
			switch(type){
				case "text" : this.reader.readAsText(blob);break;
				case "buffer": this.reader.readAsArrayBuffer(blob);break;
				default: this.reader.readAsDataURL(blob);break;
			}
		});
	}





	exel(blob){
		if(typeof(this.reader)=="undefined"){
			this.reader=new FileReader();
		}
		return new Promise((success)=>{
			this.reader=new FileReader();
			this.reader.onload=async (e)=>{
				try{
					const data = new Uint8Array(e.target.result);
	                const workbook = XLSX.read(data, { type: 'array' });
	                 // Accéder à la première feuille du fichier
	                const sheetName = workbook.SheetNames[0];
	                const worksheet = workbook.Sheets[sheetName];

	                // Convertir la feuille en tableau JSON
	                const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
	               	success(json);
	            }catch(error){
	            	console.error(error);
	            }
			}
			this.reader.readAsArrayBuffer(blob);
		})
	}





	downloadExel(data,nom="exel"){

		// creer un classeur
		let book=XLSX.utils.book_new();
		// convertion en feuille de calcul
		let sheet=XLSX.utils.aoa_to_sheet(data);
		// ajouter dans la feuille de calcul
		XLSX.utils.book_append_sheet(book,sheet,"Feuille1");
		// generer le fichier excel
		const excelFile=XLSX.write(book,{bookType:"xlsx",type:"binary"});
		const buf=new ArrayBuffer(excelFile.length);
		const bin=new Uint8Array(buf);
		// corriger les carracteres;
		for (let i = 0; i < excelFile.length; i++) bin[i] = excelFile.charCodeAt(i) & 0xFF;
		// creer un fichier blob
		let blob=new Blob([buf],{type:"application/octet-stream"});
		// creation d'un lien
		let a=document.createElement("a");
		a.href=URL.createObjectURL(blob);
		a.download=nom+".xlsx";
		document.body.appendChild(a);
		a.click();
		a.remove();
	}


	
	getHtml(canvas,nbp=1){
		return new Promise((success)=>{
			setTimeout(()=>{
				success({
					nbp:nbp,
					html:`<div style='position:relative;top:30px;background:rgba(230,230,230,0.3);left:5px;border-radius:50%;padding:5px;font-size:12px;max-width:100px;width:auto'>
			        	${nbp}
			        </div> <img style='width:100%;' class='img' style='margin-top:25px' src='${canvas.toDataURL()}'/>`
			   	});
			},30*1000);
		});
	}




	pdfToHtml(e,el,idParent='popup'){
		return new Promise((success)=>{
			pdfjsLib.getDocument(e).promise.then(async (pd)=>{
				// console.log(pd)
				let parent=dom.getParent(el,idParent)[0];
				let i=1;
				let html="";
				let tab=[];
				let divs=[];
				let p;
				let div;
				p=await pd.getPage(i);
				while(p){
					i++;
					if(parent){
						if(!parent.parentElement){
							success(undefined);
							break;
						}
					}
					const viewport=p.getViewport({scale:5});
					let c=document.createElement("canvas");
					c.width=viewport.width;
					c.height=viewport.height;
					p.render({canvasContext:c.getContext('2d'),viewport:viewport});
					tab.push(1);
					// let img=await this.getHtml(c,i);
					if(el){
						el.style.background="#f2f2f2";
						div=document.createElement("div");
						div.innerHTML=`
							<div style='position:relative;top:30px;background:rgba(230,230,230,0.3);left:5px;border-radius:50%;padding:5px;font-size:12px;max-width:100px;width:auto'>
				        		${i-1}
				        	</div>
				        `;
				        c.classList.add("img");
						c.style.width="100%";
				        div.appendChild(c);
						divs.push(div);
						el.appendChild(div);
					}

					/*this.getHtml(c,i-1).then(e=>{
						let img=e.html;
						let j=e.nbp;
						html+=img;
						if(el){
							if(parent){
								if(!parent.parentElement){
									success(undefined);
									return;
								}
							}
							console.log(j-1);
							if(divs[j-1]) divs[j-1].innerHTML=img;
						}
						if(j>=tab.length) success("<div style='background:#f2f2f2'>"+html+"</div>");
					})*/

					try{
						p=await pd.getPage(i);
					}catch(error){break}
				}
			})
		});
	}
}