class Move_page {
      constructor(el,fille,btn){
             	this.pos;
             	this.active=false;
             	this.pos_page=0;
             	this.btn=(typeof(btn)=="string")?document.querySelectorAll(btn):btn;
             	this.btn.forEach((e,index)=>{
             		e.onclick=()=>{
                        this.position_page(index);
                        this.move_element(index);
             		}
             	});
             	this.mere=(typeof(el)=="string")?document.querySelector(el):el;
                console.log(this.mere);
             	this.mere.style.position="absolute";
             	this.mere.style.width="100%";
             	this.mere.style.left="0px";
             	this.mere.style.overflowX="hidden";
             	this.mere.style.minHeight="97vh";
             	this.fille=(typeof(fille)=="string")?document.querySelectorAll(el+" "+fille):fille;
             	this.fille.forEach((e,index)=>{
                    e.style.position="absolute";
             		e.style.left="0px";
             		e.style.width="100%";
                    e.style.minHeight="500px";
             		// e.style.background="#"+Math.floor(Math.random()*1000);
             		// this.event(e,index);

             	});
             	this.position_page(0);
      }





       position_page(j=0,dis=0){
            this.fille.forEach(e=>e.style.display="");
            setTimeout(()=>{
             	if(dis==0) this.fille.forEach(e=>e.classList.add("move"));
             	else this.fille.forEach(e=>e.classList.remove("move"));
             	if(j>=this.fille.length-1 && dis<0) dis=0;
             	if(j<=0 && dis>0) dis=0;
             	dis=parseInt(dis);
             	let pos=j*(-1);
                if(dis==0 || Math.abs(dis)>50){
                 	for(let i=0;i<this.fille.length;i++){
                        this.fille[i].style.left="calc("+(100*pos)+"% + "+dis+"px)";
                        pos++;
                 	}
                 }
              if(dis==0) this.move_element(j);
          },200);
       }





    move_element(index){
        this.btn.forEach(e=>{e.style.color="";e.style.borderBottom=""});
        // this.btn[index].style.color="white";
        this.btn[index].style.borderBottom="2px solid #4a3";
        // this.btn[index].style.background="hsla(120, 70%, 50%, 0.7)";
        this.fille[index].scrollTo(0,0);
        setTimeout(()=>{
            for(let i=0;i<this.fille.length;i++){
                if(i==index) this.fille[i].style.display="";
                else this.fille[i].style.display="none";
            }
        },500);       
    }
            event(el,i){
            	el.onmousedown=(e)=>{
            		this.pos=e.clientX;
            		this.active=true;
            		this.pos_page=i;
            	}

            	el.onmouseup=(e)=>{
            		this.active=false;
            		let pos=e.clientX - this.pos;
            		this.move_page(pos);
            	}

            	el.onmousemove=(e)=>{
            		if(this.active){
	            		let pos=e.clientX - this.pos;
	            		this.position_page(this.pos_page,pos);	
            		}
            	}

            	el.ontouchstart=(ev)=>{
            		this.pos=ev.changedTouches[0].clientX
            		this.active=true;
            		this.pos_page=i;
            	}

            	el.ontouchend=(ev)=>{
            		this.active=false;
            		let pos=ev.changedTouches[0].clientX - this.pos;
            		this.move_page(pos);
            	}

            	el.ontouchmove=(ev)=>{
            		if(this.active){
	            		let pos=ev.changedTouches[0].clientX - this.pos;
	            		this.position_page(this.pos_page,pos);	
            		}
            	}
            }

            move_page(pos){
            	if(pos>100) this.pos_page--;
            	if(pos<-100) this.pos_page++;
            	if(this.pos_page>=this.fille.length) this.pos_page=this.fille.length-1;
            	if(this.pos_page<0) this.pos_page=0;
            	this.position_page(this.pos_page);
            }
    	}
