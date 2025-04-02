class Map{
		constructor(div,centre,pos,zoom){
			this.zoom=zoom || 12;
			this.pos=pos;
			this.centre=centre;
			this.div=div;
			this.div.style.minHeight="400px";
			this.carte();
		}

		carte(){
			var map = L.map(this.div).setView(this.centre,this.zoom); // Coordonnées de Paris, zoom 12

        // Ajouter le fond de carte (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Ajouter un marqueur sur la carte
       	if(!Array.isArray(this.pos[0])){
       		let a=L.marker(this.pos).addTo(map)
            .bindPopup("")
            .openPopup();
        }else{
        	for(let i=0;i<this.pos.length;i++){
        		L.marker(this.pos[i]).addTo(map)
            .bindPopup("")
            .openPopup();
        	}
        }
		}
	}