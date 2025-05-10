import { NextResponse } from 'next/server';

/**
 * Mock data array for weather information
 * Contains sample weather data for major European cities including:
 * - Temperature, humidity, and feels-like temperature
 * - Wind speed and direction
 * - Weather description and icon code
 * - City name and country code
 */
const mockCities = [
  {
    name: 'Prague',
    country: 'CZ',
    temp: 15.5,
    humidity: 65,
    feels_like: 14.8,
    wind: 3.5,
    description: 'clear',
    icon: '01d',
  },
  {
    name: 'Berlin',
    country: 'DE',
    temp: 13.2,
    humidity: 70,
    feels_like: 12.5,
    wind: 4.1,
    description: 'cloudy',
    icon: '02d',
  },
  {
    name: 'London',
    country: 'GB',
    temp: 11.8,
    humidity: 80,
    feels_like: 10.9,
    wind: 5.0,
    description: 'rain',
    icon: '09d',
  },
  {
    name: 'Paris',
    country: 'FR',
    temp: 16.1,
    humidity: 60,
    feels_like: 15.0,
    wind: 3.2,
    description: 'partly cloudy',
    icon: '03d',
  },
  {
    name: 'Madrid',
    country: 'ES',
    temp: 20.3,
    humidity: 50,
    feels_like: 19.7,
    wind: 2.8,
    description: 'sunny',
    icon: '01d',
  },
];

/**
 * GET handler for /api/weather endpoint
 * Simulates weather API by:
 * 1. Adding a small delay to mimic real API call
 * 2. Generating slightly randomized weather data based on mock data
 * 3. Calculating sunrise/sunset times based on current timestamp
 * 
 * @returns {Promise<NextResponse>} JSON response with weather data for all cities
 * @throws {Error} Returns 500 status code if data fetching fails
 */
export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const now = Date.now();
    const weatherArray = mockCities.map(city => ({
      main: {
        temp: city.temp + (Math.random() * 2 - 1),
        humidity: city.humidity,
        feels_like: city.feels_like + (Math.random() * 2 - 1),
      },
      weather: [
        {
          id: 800,
          main: city.description,
          description: city.description,
          icon: city.icon,
        }
      ],
      wind: {
        speed: city.wind,
        deg: 280
      },
      name: city.name,
      sys: {
        country: city.country,
        sunrise: Math.floor(now / 1000) - 21600,
        sunset: Math.floor(now / 1000) + 21600
      }
    }));
    return NextResponse.json(weatherArray);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
} 