import axios from "axios";

export const getWeather = async (location: string): Promise<Weather> => {
  const API_KEY = process.env.API_KEY;
  try {
    const locationName = locations.find((loc) => loc.code === location)?.name;

    if (!locationName) {
      throw new Error("Location not found");
    }

    if (Math.random() < 0.2) {
      throw new Error("The api request failed");
    }

    const response = await axios.get(
      `https://api.tomorrow.io/v4/weather/realtime?location=${locationName}&apikey=${API_KEY}`,
    );
    const data: Weather = {
      ...response.data.data.values,
      time: response.data.data.time,
      location: response.data.location,
    };
    return data;
  } catch (error) {
    if ((error as Error).message === "The api request failed") {
      console.log("retrying api call on error");
      return await getWeather(location);
    }
    throw error;
  }
};

const locations = [
  { name: "Santiago de chile", code: "santiago" },
  { name: "London", code: "london" },
  { name: "Zurich", code: "zurich" },
  { name: "Auckland new zeland", code: "auckland" },
  { name: "Sidney australia", code: "sidney" },
  { name: "Georgia usa", code: "georgia" },
];

export interface Weather {
  time: string;
  cloudBase: number;
  cloudCeiling: number;
  cloudCover: number;
  dewPoint: number;
  freezingRainIntensity: number;
  humidity: number;
  precipitationProbability: number;
  pressureSurfaceLevel: number;
  rainIntensity: number;
  sleetIntensity: number;
  snowIntensity: number;
  temperature: number;
  temperatureApparent: number;
  uvHealthConcern: number;
  uvIndex: number;
  visibility: number;
  weatherCode: number;
  windDirection: number;
  windGust: number;
  windSpeed: number;
  location: {
    lat: number;
    lon: number;
    name: string;
    type: string;
  };
}
