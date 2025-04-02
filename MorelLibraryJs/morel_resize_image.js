

class Morel_resize_image{
	constructor(el,width,height){
		this.el=el;
		this.width=width;
		this.height=height;
		this.ac=this.det_el(el.toString());
		return this.main();
	}

	det_el(el){
		if(el=="[object HTMLInputElement]") return true;
		else return false;
	}
	async main(){
		let url;
		if(this.ac){
			url=(await this.resize_image());
		}
		else url=this.el;
		let n_url=await this.resize_canvas(url);
		return{
			data:n_url,
			file:this.get_file(n_url)
		}
	}

	resize_image(){
		return new Promise((s,r)=>{
			if(this.el.files.length){
				let file=new FileReader();
				file.readAsDataURL(this.el.files[0]);
				file.onload=()=>{
					let result=file.result;
					s(result);
				}
			}
			else r("erreur de l'image");
		});	
	}

	resize_canvas(url){
		return new Promise((s,e)=>{
			let canvas=document.createElement("canvas");
			canvas.width=this.width;
			canvas.height=this.height;
			let b=canvas.getContext("2d");
			let img=new Image();
			img.src=url;
			img.onload=()=>{
				b.drawImage(img,0,0,canvas.width,canvas.height);
				s(canvas.toDataURL());
			}
		});
	}
	get_file(data){
		data=data.split(",");
		let nom=data[0].split("/")[data[0].split("/").length-1];
		let a=atob(data[1]);
		let n=a.length;
		let unit=new Uint8Array(n);
		while(n--) unit[n]=a.charCodeAt(n);
		let file=new File([unit],"image_compresser",{type:"image/jpg"});
		return file;
	}
}