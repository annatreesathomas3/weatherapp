let place_name = "london"
const cities = document.querySelectorAll('#cities');

function loadData() {
    getData();
}

function debounce(func, timeout = 800) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}
const processChange = debounce(() => fetchData());

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        place_name = e.target.innerHTML;
        console.log(place_name);
        getData();
    })
});

function fetchData() {
    place_name = place.value
    console.log(place_name);
    getData();
}

function getData() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place_name}&appid=6fa99e1f96f024f79970c5a3532b2ac6&units=metric`).
        then(res => res.json()).
        then(data => displayValue(data))

}

function displayValue(data) {
    console.log(data);
    if (data.cod === 200) {
        let place_name = data.name
        let temperature = data.main.temp
        let humidity = data.main.humidity
        let wind_speed = data.wind.speed
        let weather_type = data.weather[0].description
        let weather_type_icon = data.weather[0].icon

        // console.log(weather_type_icon);
        let html_data = `
        <div class="card" style="width: 18rem;">
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Location Name : ${place_name}</li>
    <li class="list-group-item">Temperature : ${temperature}° c</li>
    <li class="list-group-item">Humidity : ${humidity}%</li>
    <li class="list-group-item">Wind Speed : ${wind_speed}km/hr</li>
    <li class="list-group-item">Weather Type : ${weather_type} </li>
  </ul>
</div>
        `
        document.querySelector("#result").innerHTML = html_data
        document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${place_name}')`;

    }
    else {
        let message = data.message
        let html_data = `
        <div class="card" style="width: 18rem;">
  <ul class="list-group list-group-flush">
    <li class="list-group-item">${message}</li>
  </ul>
</div>
        `
        document.querySelector("#result").innerHTML = html_data

    }
}