document.getElementById('getWeatherBtn').addEventListener('click', function() {
    const location = document.getElementById('locationInput').value;
    if (location) {
        getWeather(location);
    } else {
        alert('Please enter a location name');
    }
});

function getWeather(location) {
    const apiKey = '56b95ecd030f3bce82bd7493553aaeb3'; // Your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data: ' + error.message);
        });
}

function displayWeather(data) {
    const weatherReport = document.getElementById('weatherReport');
    let weatherIcon = '';

    switch(data.weather[0].main.toLowerCase()) {
        case 'clear':
            weatherIcon = '<i class="fas fa-sun weather-icon"></i>';
            break;
        case 'clouds':
            weatherIcon = '<i class="fas fa-cloud weather-icon"></i>';
            break;
        case 'rain':
            weatherIcon = '<i class="fas fa-cloud-showers-heavy weather-icon"></i>';
            break;
        case 'snow':
            weatherIcon = '<i class="fas fa-snowflake weather-icon"></i>';
            break;
        case 'thunderstorm':
            weatherIcon = '<i class="fas fa-bolt weather-icon"></i>';
            break;
        case 'drizzle':
            weatherIcon = '<i class="fas fa-cloud-rain weather-icon"></i>';
            break;
        default:
            weatherIcon = '<i class="fas fa-cloud weather-icon"></i>';
            break;
    }

    if (data.cod === 200) {
        weatherReport.innerHTML = `
            ${weatherIcon}
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    } else {
        weatherReport.innerHTML = `<p>${data.message}</p>`;
    }
}
