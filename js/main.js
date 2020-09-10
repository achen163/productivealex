window.addEventListener('load', ()=> {
    let long;
    let lat;

    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureDescription = document.querySelector(".temperature-description");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
           long = position.coords.longitude;
           lat = position.coords.latitude;
           //GeoLocationPosition.coords.longitude
           
            const proxy = "https://cors-anywhere.herokuapp.com/";

           const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
            
           fetch(api)
           .then(response =>{
                   return response.json();
           })
           .then(data => {
               console.log(data);
               const {temperature, summary} = data.currently;
                temperatureDegree.textContent = temperature;
                locationTimezone.textContent = data.timezone;
                temperatureDescription.textContent = summary;
                
           });
                  
        });
    }
    //else?
});







function realtimeClock() {
    var timeClock = new Date();
    
    var hours = timeClock.getHours();
    var minutes = timeClock.getMinutes();
    var seconds = timeClock.getSeconds();

    var ampm = (hours < 12) ? "AM" : "PM";
    //making sure 12 hour format
    hours = (hours > 12) ? hours - 12 : hours;

    //adding leading 0's when needed

    hours = ("0" + hours).slice(-2);
    
    minutes = ("0" + minutes).slice(-2);
    
    seconds = ("0" + seconds).slice(-2);

    document.getElementById('time').innerHTML =
        hours + ":" + minutes + ":" + seconds + " " + ampm;
    
        var time = setTimeout(realtimeClock, 500);
}
