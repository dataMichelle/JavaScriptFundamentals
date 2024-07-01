function showWeatherDetails(event) {
    event.preventDefault();

    const city = document.getElementById('city').value.trim();
    const lat = document.getElementById('latitude').value.trim();
    const lon = document.getElementById('longitude').value.trim();
    const apiKey = 'c4f86ece00bc8aa272652ac9065af12d'; // Replace with your actual API key
    let apiUrl = '';

    if (city) {
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    } else if (lat && lon) {
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    } else {
        const weatherInfo = document.getElementById('weatherInfo');
        weatherInfo.innerHTML = '<p>Please enter either a city name or latitude and longitude.</p>';
        return;
    }

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = `<h2>Weather in ${data.name}</h2>
                                      <p>Temperature: ${data.main.temp} &#8451;</p>
                                      <p>Weather: ${data.weather[0].description}</p>`;
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = `<p>Failed to fetch weather. Please try again.</p>`;
        });
}

document.getElementById('weatherForm').addEventListener('submit', showWeatherDetails);
