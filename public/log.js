const mymap = L.map('mapid').setView([0,0], 1);
const attribution = 
'&copy; <a href = https://www.openstreetmap.org/copyright> OpenStreetMap</a< contributors';
const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; 
const tiles = L.tileLayer( tileURL, {attribution})
tiles.addTo(mymap);
mymap.options.maxZoom = 12;
getData();


async function getData() {
    const response = await fetch('/api');
    const data = await response.json();
     for (item of data){
    const root = document.createElement('p');
    const marker = L.marker([item.lat, item.lon]).addTo(mymap);
          let dateString = new Date(item.timestamp).toLocaleString();
          var image = document.createElement('img');
          image.src = item.image64;
          image.alt = "Quarantine pics" 
    let txt = `${dateString},<br> Days in quarantine: ${item.qday}, <br>
    Days since social gathering: ${item.qgather}, <br>
    # people quarantined with: ${item.qnumpeople}, <br>
    Passtime: ${item.qpasstime}, <br>
    Learned: ${item.qlearn}, <br>
    Tips: ${item.qtips},<br>
    ${item.caption},<br>
    <img src='${item.image64}'/><br>
    `
    marker.bindPopup(txt);
    }
    console.log(data);
}
setInterval(getData, 1000);