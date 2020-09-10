window.addEventListener('load', ()=> {
    let long;
    let lat;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
        })
    }
    else {
        h1.textContent = "Not working because have to enable geolocation!"
    }

})






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
