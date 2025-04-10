// genere un popup d'information
function popup(html="",cour=false,del=true,classe="container-500"){
    let div=document.createElement("div");
    div.id="popup";
    div.classList.add("popup","move");
    div.style.opacity=0;

    // creer le contenus du popup
    div.innerHTML=`
        <div id="info" class="p-10 border-box shadow info rounded bg-white ${classe} m-0">
            <div id="divSorti" class='bg-white' style='z-index:20;width:50px;margin-left:calc(100% - 50px);position:sticky;top:-10px;${!del?"display:none":""}'><b id="sortir" style="position:relative;color:red" class="pointer fa fa-times fs-3"></b></div>
            ${html}
        </div>
    `;
    document.body.appendChild(div);
    opacity(div);

    const sortir=(e)=>{
        let h=location.href.split("#")[1]
        if(cour && h){
            if(h.indexOf("&")!=-1){
                if(history.length>1){
                    history.back();
                    href=location.href.split("#")[1];
                    opacityRemove(div);
                }else location.href="";
            }else opacityRemove(div);
        }
        else{
            opacityRemove(div);   
        }
        clearInterval(inter);
    }

    // sortir du pop au click du vide
    let info=dom.getChild(div,"info")[0];
    if(del){
        div.addEventListener("click",(e)=>{
            if(!info.contains(e.target)){
                sortir();
            }
        },{capture:true});
    }

    // sortir le pop au click du button
    let sor= dom.getChild(div,"sortir")[0];
   sor.onclick=()=>{
        sortir();
    }

    // definir une taille l'orque c'est le cour qui est ouvert
    if(cour){
        info.classList.add("affCours");
    }

    // appliquer un style lors que c'est une liste qui est creer;
    const resize=(height=0,cou=false,)=>{
         let heightEl=info.getBoundingClientRect().height;
        if((heightEl>window.innerHeight-50 || cou) && heightEl>height){
            // let divSortir=dom.getChild(div,"divSorti")[0];
            info.style.overflowY="scroll";
            info.style.overflowX="hidden";
            //info.style.marginTop="10px";
            info.style.height="calc(100vh - 25px)";
            // divSortir.style.position="sticky";
        }
        if(info.scrollHeight==heightEl){
            info.style.height="";
            info.style.overflowY="";
        }
        return  heightEl;
    }

    let height=resize(0,cour);
    let inter=setInterval(()=>{
        height=resize(height);
    },300);
    // returner le pop creer
    return div;
}





function infoDiv(e,message="",classe="shadow",width=50,height=50){
    let a=e.getBoundingClientRect();
    let posE={
        top:e.offsetTop,
        left:e.offsetLeft,
        width:e.offsetWidth,
        height:e.offsetHeight 
    }
    let left=posE.left;
    let wid=window.innerWidth;
    let pos=width<=100?(Math.floor((left/window.innerWidth)*100)):(left);
    let w=width;
    let div=document.createElement("div");
    width+=width>100?"px":"vw";
    height+=height>100?"px":"vh";
    div.style.width=width;
    div.style.maxHeight=height;
    div.style.position="absolute";
    div.id="infodiv";
    div.style.top=Math.floor(posE.height + posE.top + 3)+"px";
    div.setAttribute("class",classe);
    div.classList.add("border-box","rounded");
    div.style.zIndex=55;
    // div.style.padding="5px";
    div.innerHTML="<b class='pointer fa fa-times fs-5' style='position:sticky;top:0px;left:calc("+width+" - 20px);color:red' onclick=\"opacityRemove(dom.getParent(this,'infodiv')[0]);\"></b>"+message;
    let wR=parseInt(width)<100?(100 - pos):Math.floor(wid - pos);
    if(wR<parseInt(width)){
         if(pos<parseInt(width)){
            div.style.left="0px";
            div.style.width="100vw";
        }
       else div.style.left=`calc(${pos}${parseInt(width)>100?"px":"vw"} - ${width} + 10px)`;
    }
    else {
        if(wR<parseInt(width)){
            div.style.left="0px";
            div.style.width="100vw";
        }
        else{
            if(pos<parseInt(width)){
                div.style.left=`calc(${pos}${parseInt(width)>100?"px":"vw"} + ${posE.width}px - 5px)`;
            }
            else div.style.left=`calc(${pos}${parseInt(width)>100?"px":"vw"} - ${width} + 10px)`;
        }
    }
    // if(ParseInt(height)==100) div.style.top=posE.top+"px";
    div.style.background="white";
    div.style.overflowY="scroll";
    // let parent=dom.getParent(e,"page")[0] || dom.getParent(e,"info")[0] || document.body;
    e.parentElement.appendChild(div);
    document.body.addEventListener("click",(e)=>{
        let pop=document.querySelectorAll("#popup");
        let p=dom.getParent(div,"popup")[0];
        if(!div.contains(e.target) && p==pop[pop.length-1]){
            opacityRemove(div);
        }
    },{capture:true});
    return div;
}






function chargement(el,callback){
    return new Promise((success)=>{
        let top=el.offsetTop;
        let left=el.offsetLeft;
        // parent.style.position="absolute";
        let div=document.createElement("div");
        div.classList.add("border-box",'flex-center');
        div.style.height=el.offsetHeight+"px";
        div.style.width=el.offsetWidth+"px";
        div.style.position="absolute";
        div.id="chargement";
        div.style.zIndex=55;
        div.style.top=Math.floor(top)+"px";
        div.style.left=Math.floor(left)+"px";
        div.style.background="rgba(200,200,200,0.7)";
        // ;
        div.innerHTML=`
            <i class='fa fa-spinner fa-pulse fa-3x fa-fw'></i>
        `;
        el.parentElement.appendChild(div);
        opacity(div);
        callback.then((e)=>{
           setTimeout(()=>{
                opacityRemove(div);
                success(e);
            },100);
        });
    })
}





// div qui va nous permettre de verifier les codes de verification

function divVerificationCode(nb=5,server="cool",pageRedirect){
    let code="";
    let w=Math.floor(100/nb);
    for(let i=0;i<nb;i++) code+=`<div class='verifCode' style='width:${w}%,border:1px solid #ccc'><input class='w-100 text-center' style='border:1px solid #ccc;border-left:none;padding:5px;font-size:15px;outline:none'/></div>`;
    let div=popup(`
        <h4 class='text-center'>Entrer le code de verification envoye par mail</h4>
        <center><div class='flex-center px-2' style='width:250px'>
            ${code}
        </div></center>
    `,false,false);
    dom.getChild(div,'sortir')[0].remove();
    div.removeEventListener('click',(e)=>{
        e.preventDefault();
    });
    let input=dom.getChild(div,"input");
    let error;
    let info=dom.getChild(div,"info")[0];
    input.forEach((e,i)=>{
        e.onkeyup=(a)=>{
            e.value=e.value[e.value.length-1];
            // verifier que les nom entrer son des nombres
            if(isNaN(e.value)) e.value="";
            else{
                // passer a un autre element qui n'a pas de valeur;
                let j=0;
                while(j<nb){
                    if(input[j].value==""){
                        input[j].focus();
                        break;
                    }


                    // soummettre un fois les nb champs remplit
                    if(j==nb-1){
                        if(server[server.length-1]!="/") server+="/";
                        chargement(div,fetch(server+input.map(d=>d.value).join(''))).then((r)=>{
                           r.text().then((k)=>{
                                if(k=="good"){
                                    let a=JSON.parse(localStorage.getItem("infoUser") || "{}");
                                    if(a.delai) delete a.delai;
                                    localStorage.setItem("infoUser",JSON.stringify(a));
                                    if(!pageRedirect) location.reload();
                                    else location.href=pageRedirect;
                                }
                                else{
                                    if(error) error.remove();
                                    error=document.createElement("div");
                                    error.classList.add("text-white","bg-danger","text-center","rounded","my-2",'p-2');
                                    if(k=='bad') error.innerHTML="Code incorrect";
                                    else{
                                        error.innerHTML="Delais expirer, reconnecter vous a nouveau";
                                        setTimeout(()=>{
                                            location.reload();
                                        },2000)
                                    }
                                    info.appendChild(error);
                                    opacity(error);
                                }
                                
                           })
                        });
                    }
                    j++;
                }
            }
        }


        // mettre en valeur l'element a remplir
        e.onfocus=()=>{
            input.forEach((a,s)=>{
                if(s==i){
                    a.style.border="1px solid #2b2";
                    return;
                }
                a.style.border="1px solid #ccc";
               if(s<nb-1) a.style.borderRight="none";
            })
        }
    });
    input[0].focus();
}


let divMessage;

function message(div,mess="",type=false,temp=2){
    return new Promise((success)=>{
        if(divMessage){
            divMessage.remove();
            divMessage=undefined;
        }
        divMessage=document.createElement("div");
        divMessage.classList.add(type?"bg-success":"bg-danger","rounded","text-white","p-10","my-2");
        divMessage.innerHTML=mess;
        div.appendChild(divMessage);
        opacity(divMessage);
        setTimeout(()=>{
            opacityRemove(divMessage);
            success(type);
        },temp*1000);
    })
}

function shared(location){
    return `
        <div class='flex-center'>
           ${[
                ["facebook.png",`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location)}`],
                ["whatsapp.png",`https://api.whatsapp.com/send?text=${encodeURIComponent(location)}`]
            ].map(e=>`<div class='px-1 py-2'><a style='text-decoration:none' href="${e[1]}" target="_blank" rel="noopener noreferrer">
                <img src="${e[0]}" width="25px" height="25px"/>
            </a></div>`).join("")}
        </div>
    `
}





 