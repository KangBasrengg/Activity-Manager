import { useState, useEffect } from 'react';

const WEATHER_CODES = {
  0: { label: 'Cerah', icon: '☀️' },
  1: { label: 'Cerah Berawan', icon: '🌤️' },
  2: { label: 'Berawan Sebagian', icon: '⛅' },
  3: { label: 'Mendung', icon: '☁️' },
  45: { label: 'Berkabut', icon: '🌫️' },
  48: { label: 'Kabut Tebal', icon: '🌫️' },
  51: { label: 'Gerimis Ringan', icon: '🌦️' },
  53: { label: 'Gerimis', icon: '🌦️' },
  55: { label: 'Gerimis Lebat', icon: '🌧️' },
  56: { label: 'Gerimis Beku', icon: '🌧️' },
  57: { label: 'Gerimis Beku Lebat', icon: '🌧️' },
  61: { label: 'Hujan Ringan', icon: '🌧️' },
  63: { label: 'Hujan', icon: '🌧️' },
  65: { label: 'Hujan Lebat', icon: '🌧️' },
  66: { label: 'Hujan Beku', icon: '🌧️' },
  67: { label: 'Hujan Beku Lebat', icon: '🌧️' },
  71: { label: 'Salju Ringan', icon: '🌨️' },
  73: { label: 'Salju', icon: '🌨️' },
  75: { label: 'Salju Lebat', icon: '🌨️' },
  77: { label: 'Butiran Salju', icon: '🌨️' },
  80: { label: 'Hujan Singkat', icon: '🌦️' },
  81: { label: 'Hujan Singkat', icon: '🌧️' },
  82: { label: 'Hujan Deras', icon: '⛈️' },
  85: { label: 'Hujan Salju', icon: '🌨️' },
  86: { label: 'Hujan Salju Lebat', icon: '🌨️' },
  95: { label: 'Badai Petir', icon: '⛈️' },
  96: { label: 'Badai & Hujan Es', icon: '⛈️' },
  99: { label: 'Badai & Hujan Es Lebat', icon: '⛈️' },
};

const getWeatherInfo = (code) => {
  return WEATHER_CODES[code] || { label: 'Tidak Diketahui', icon: '❓' };
};

const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({ name: 'Jakarta', lat: -6.2088, lon: 106.8456 });

  useEffect(() => {
    // Try to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(prev => ({
            ...prev,
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          }));
        },
        () => {
          // Use default Jakarta if geolocation fails
        }
      );
    }
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        // Get city name via reverse geocoding
        const geoRes = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lon}&zoom=10&accept-language=id`
        );
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          const city = geoData.address?.city || geoData.address?.town || geoData.address?.county || 'Lokasi Anda';
          setLocation(prev => ({ ...prev, name: city }));
        }

        // Fetch weather data from Open-Meteo
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,uv_index&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,uv_index_max&timezone=auto&forecast_days=7`
        );

        if (!res.ok) throw new Error('Gagal mengambil data cuaca');

        const data = await res.json();

        // Process current weather
        const current = {
          temp: Math.round(data.current.temperature_2m),
          feelsLike: Math.round(data.current.apparent_temperature),
          humidity: data.current.relative_humidity_2m,
          windSpeed: Math.round(data.current.wind_speed_10m),
          uvIndex: data.current.uv_index,
          ...getWeatherInfo(data.current.weather_code),
        };

        // Process hourly forecast (next 12 hours)
        const now = new Date();
        const currentHour = now.getHours();
        const hourly = [];
        for (let i = currentHour; i < Math.min(currentHour + 12, data.hourly.time.length); i++) {
          const time = new Date(data.hourly.time[i]);
          hourly.push({
            time: time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            temp: Math.round(data.hourly.temperature_2m[i]),
            precipProb: data.hourly.precipitation_probability[i],
            ...getWeatherInfo(data.hourly.weather_code[i]),
          });
        }

        // Process daily forecast
        const daily = data.daily.time.map((date, i) => {
          const d = new Date(date);
          return {
            date: d.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' }),
            dayName: d.toLocaleDateString('id-ID', { weekday: 'short' }),
            isToday: i === 0,
            tempMax: Math.round(data.daily.temperature_2m_max[i]),
            tempMin: Math.round(data.daily.temperature_2m_min[i]),
            precipProb: data.daily.precipitation_probability_max[i],
            uvIndex: data.daily.uv_index_max[i],
            sunrise: new Date(data.daily.sunrise[i]).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            sunset: new Date(data.daily.sunset[i]).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            ...getWeatherInfo(data.daily.weather_code[i]),
          };
        });

        setWeather({ current, hourly, daily });
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    // Refresh every 15 minutes
    const interval = setInterval(fetchWeather, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [location.lat, location.lon]);

  return { weather, loading, error, location };
};

export default useWeather;
