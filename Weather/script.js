function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const apiKey = "509fdd65bb8111cb403f57a0957beec6"; // <<== Replace this with your key

    if (!city) {
        document.getElementById("weatherData").innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherData = document.getElementById("weatherData");

            if (data.cod === 200) {
                const weatherHTML = `
                    <h3>${data.name}, ${data.sys.country}</h3>
                    <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
                    <p><strong>Weather:</strong> ${data.weather[0].main}</p>
                    <p><strong>Description:</strong> ${data.weather[0].description}</p>
                    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
                `;
                weatherData.innerHTML = weatherHTML;
            } else {
                weatherData.innerHTML = `<p>City not found. Please try again.</p>`;
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById("weatherData").innerHTML = `<p>Error fetching data. Check console for details.</p>`;
        });
}
