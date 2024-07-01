document.getElementById('weatherForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const city = document.getElementById('city').value.trim();
    const latitude = document.getElementById('latitude').value.trim();
    const longitude = document.getElementById('longitude').value.trim();
    const weatherResult = document.getElementById('weatherResult');

    let apiUrl = 'c4f86ece00bc8aa272652ac9065af12d';

    if (city) {
        apiUrl = `https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${city}`;
    } else if (latitude && longitude) {
        apiUrl = `https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${latitude},${longitude}`;
    } else {
        weatherResult.textContent = 'Please enter either a city or both latitude and longitude.';
        return;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                weatherResult.textContent = 'Error: ' + data.error.message;
            } else {
                weatherResult.innerHTML = `
                    <h2>Weather in ${data.location.name}</h2>
                    <p>Temperature: ${data.current.temp_c}°C</p>
                    <p>Condition: ${data.current.condition.text}</p>
                `;
            }
        })
        .catch(error => {
            weatherResult.textContent = 'Error fetching weather data.';
            console.error('Error:', error);
        });
});
