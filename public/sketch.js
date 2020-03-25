let video;
let width = 160;
let height = 120;
function setup() {
    var myCanvas = createCanvas(width, height);
    myCanvas.parent("p5");
    video = createCapture(VIDEO);
    video.size(width,height);
    scale(-1.0,1.0); 
    video.hide();
        document.getElementById('submit').addEventListener('click', event => {
        if ("geolocation" in navigator) {
        console.log('geolocation is available');
        
   navigator.geolocation.getCurrentPosition(async position => {
       const lat = position.coords.latitude;
       const lon = position.coords.longitude;
       const caption = document.getElementById('caption').value;
       const qday = document.getElementById('qday').value;
       const qgather = document.getElementById('qgather').value;
       const qnumpeople = document.getElementById('qnumpeople').value;
       const qpasstime = document.getElementById('qpasstime').value;
       const qlearn = document.getElementById('qlearn').value;
       const qtips = document.getElementById('qtips').value;
       video.loadPixels();
       const image64 = video.canvas.toDataURL();
       const data = { lat, lon, caption, qday, qgather, qnumpeople, qpasstime, qlearn, qtips, image64 };
       const options = {
           method: "POST",
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(data)
       };
      const response = await fetch('/api', options);
      var json = await response.json();
      console.log(json);
      console.log(data);
   });

   } else {
   console.log('geolocation IS NOT available');
   }
});

}
   function draw() {      
     image(video, 0, 0, width, height);
     translate(width,0);
     scale(-1.0,1.0); 
     image(video, 0, 0, width, height);
   }