

function opacity(el){
	return new Promise((success)=>{
		el.style.opacity=0;
		el.classList.add("move");
		setTimeout(()=>{
			el.style.opacity=1;
			el.classList.remove("move");
			success(true);
		},200)
	})
}

function opacityRemove(el){
	return new Promise((success)=>{
		el.style.opacity=0;
		el.classList.add("move");
		setTimeout(()=>{
			el.remove();
			success(true);
		},500)
	})
}


function hassardColor(){
	let color;
	while((color=Math.floor(Math.random()*1000))<100);
	return "#"+color;
}