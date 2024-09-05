document.getElementById('weather-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const location = document.getElementById('location').value.trim();
  if (!location) {
      alert('Please enter a city name');
      return;
  }

  // Use your actual OpenWeatherMap API key
  const apiKey = 'd147ad927a140bd47458f67460c7fbfb';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;

  fetch(url)
      .then(response => {
          if (!response.ok) {
              return response.json().then(err => {
                  throw new Error(err.message || 'An error occurred');
              });
          }
          return response.json();
      })
      .then(data => {
          if (data.cod !== 200) {
              throw new Error(data.message || 'An error occurred');
          }
          const weatherResult = document.getElementById('weather-result');
          weatherResult.innerHTML = `
              <h2>Weather in ${data.name}, ${data.sys.country}</h2>
              <p>Temperature: ${data.main.temp}°C</p>
              <p>Weather: ${data.weather[0].description}</p>
              <p>Humidity: ${data.main.humidity}%</p>
              <p>Wind Speed: ${data.wind.speed} m/s</p>
          `;
      })
      .catch(error => {
          const weatherResult = document.getElementById('weather-result');
          weatherResult.innerHTML = `<p style="color: red;">${error.message}</p>`;
      });
});
