// api.ts
export interface PageData {
  lists: { id: number; components: number[] }[];
  components: { id: number; type: string; options: Record<string, any> }[];
  variables?: { name: string; type: string; initialValue: any }[];
}

export interface WeatherData {
  lon: string; 
  lat: string; 
  condition: string; 
  conditionName: string; 
  temperature: number; 
  unit: string; 
  location: string; 
  upcomming: { day: string; condition: string; conditionName: string }[]; 
}


export const fetchPage = async (pageId: string): Promise<PageData> => {
  try {
    const response = await fetch(`http://localhost:3030/page/${pageId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch page data');
    }
    const data: { data: PageData } = await response.json();
    return data.data;
  } catch (error) {
    throw new Error('Error fetching page data:');
  }
};

export const fetchWeather = async (
  lat: number,
  lon: number
): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `http://localhost:3030/integration/weather?lat=${lat}&lon=${lon}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data: { data: WeatherData } = await response.json();
    return data.data;
  } catch (error) {
    throw new Error('Error fetching weather data:');
  }
};
