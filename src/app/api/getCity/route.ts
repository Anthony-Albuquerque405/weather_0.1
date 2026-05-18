import { error } from "console";

const URLBase = "https://api.openweathermap.org/data/2.5/weather?q=";

const apiKey = process.env.API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");

  if (!city) {
    return new Response(JSON.stringify({ error: "Erro ao buscar cidade" }), {
      status: 400,
    });
  }

  const res = await fetch(
    `${URLBase}${city}&units=metric&appid=${apiKey}&lang=pt_br`,
  );

  if (!res.ok) {
    return new Response(
      JSON.stringify({ error: "Erro ao buscar as informações da API" }),
      { status: res.status },
    );
  }

  const data: DataResponse = await res.json();

  return new Response(JSON.stringify(data), { status: 200 });
}

export interface DataResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
