let loc = $('.place');
let date = $('.date');
let icon = $('.icon');
let desc = $('.description');
let temp = $('.temp');
let min_max_temp = $('.max_min_temp');
let error1 = $('.error');
const KELVIN = 273;
const key = "82005d27a116c2880c8f0fcb866998a0"; //API key

//hide the error innitially
error1.hide();

//set the date
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
let today = new Date;
date.text(`${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`);

//make the object to store the value return by api
let weather = {};
weather.tempreture = {
    unit: "celsius",
};

// get city by pressing enter key from user
let city = document.querySelector('#search');
city.addEventListener('keydown', function (event) {
    if (event.keyCode == 13) {
        getResultByCity(city.value);
    }
});

//get city by click on search button by user
let search_but=$('#search_now');
search_but.click(function (event) {
        getResultByCity(city.value);
});

// get weather according to city input
function getResultByCity(city) {
    let api_city = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    fetch(api_city)
        .then(function (response) {
            //take the response given by api
            let data = response.json();
            console.log(data);
            return data;
        })
        .then(function assignValObject(data) {
            weather.tempreture.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.icon = data.weather[0].icon;
            weather.location = data.name;
            weather.country = data.sys.country;
            weather.tempreture.min_ = Math.floor(data.main.temp - KELVIN);
            weather.tempreture.max_ = Math.floor(data.main.temp - KELVIN);
            display_weather();
        });
    function display_weather() {
        loc.text(weather.location);
        icon.html(`<img src="image/${weather.icon}.png">`);
        desc.text(weather.description);
        temp.text(`${weather.tempreture.value}°C`);
        min_max_temp.text(`${weather.tempreture.min_}°C / ${weather.tempreture.max_}°C`);
    }
}

//get the location of user
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}
else {
    error.show();
    error.text('Your Browser Does Not Support Geolocation.');
}

//get co-ordinates of user location
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}

function showError(error) {
    console.log("hello");
    error1.show();
    error1.text(`${error.message}`);
}
//from longitude and latitude get weather
function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    //ask api for weather
    fetch(api)
        .then(function (response) {
            //take the response given by api
            let data = response.json();
            console.log(data);
            return data;
        })
        .then(function assignValObject(data) {
            weather.tempreture.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.icon = data.weather[0].icon;
            weather.location = data.name;
            weather.country = data.sys.country;
            weather.tempreture.min_ = Math.floor(data.main.temp - KELVIN);
            weather.tempreture.max_ = Math.floor(data.main.temp - KELVIN);
            display_weather();
        });
    function display_weather() {
        loc.text(weather.location);
        icon.html(`<img src="image/${weather.icon}.png">`);
        desc.text(weather.description);
        temp.text(`${weather.tempreture.value}°C`);
        min_max_temp.text(`${weather.tempreture.min_}°C / ${weather.tempreture.max_}°C`);
    }
}

//to get tempreture in ferenhit
$('.temp').click(conversion);
function conversion() {
    if (weather.tempreture.value === undefined)
        return;
    if (weather.tempreture.unit === "celsius") {
        let tempInF = Math.floor(((9 / 5) * weather.tempreture.value) + 32);
        let min = Math.floor(((9 / 5) * weather.tempreture.min_) + 32);
        let max = Math.floor(((9 / 5) * weather.tempreture.max_) + 32);
        temp.text(`${tempInF}°F`);
        weather.tempreture.value = tempInF;
        weather.tempreture.min_ = min;
        weather.tempreture.max_ = max;
        // console.log(weather.tempreture.min_);
        min_max_temp.text(`${weather.tempreture.min_}°F / ${weather.tempreture.max_ = max}°F`);
        weather.tempreture.unit = "ferenheat";
    }
    else {
        let tempInC = Math.floor((5 / 9) * (weather.tempreture.value - 32));
        let min = Math.floor((5 / 9) * (weather.tempreture.min_ - 32));
        let max = Math.floor((5 / 9) * (weather.tempreture.max_ - 32));
        temp.text(`${tempInC}°C`);
        weather.tempreture.value = tempInC;
        weather.tempreture.min_ = min;
        weather.tempreture.max_ = max;
        min_max_temp.text(`${min}°C / ${max}°C`);
        weather.tempreture.unit = "celsius";
    }
}