const apiKey = "6f2a4ff3b92dd5b36f7da87e2515bc6a"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?lang=fi&units=metric&q=";

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")
const weatherText = document.querySelector(".weathertext")

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 400){
        document.querySelector(".error400").style.display = "block"; 
        document.querySelector(".error").style.display = "none"; 
        document.querySelector(".weather").style.display = "none"; 
    }
    else if(response.status == 404){ 
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".error400").style.display = "none"; 
    }
    else{
        var data = await response.json();
        
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " m/s";

    if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png"
        weatherText.textContent = "Selkeää"
    }
    else if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png"
        weatherText.textContent = "Pilvistä"
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png"
        weatherText.textContent = "Sadetta"
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png"
        weatherText.textContent = "Tihkua"
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png"
        weatherText.textContent = "Sumua"
    }
    else if(data.weather[0].main == "Snow"){
        weatherIcon.src = "images/snow.png"
        weatherText.textContent = "Lumisadetta"
    }
    else if(data.weather[0].main == "Thunderstorm"){
        weatherIcon.src = "images/thunderstorm.png"
        weatherText.textContent = "Ukkonen"
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    document.querySelector(".error400").style.display = "none"; 
    }
    console.log(data);

}
searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        searchBtn.click();
    }
});