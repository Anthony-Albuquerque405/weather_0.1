"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { DataResponse } from "./api/getCity/route";

export default function Home() {
  // pegando valores
  const [city, setCity] = useState("");
  const [wethear, setWethear] = useState<DataResponse | null>(null);
  const [loading, setLoading] = useState(false);

  // eventos e funções

  const searchLoading = () => {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="flex">
          <img
            src="https://media1.tenor.com/m/On7kvXhzml4AAAAC/loading-gif.gif"
            alt="carregando..."
          />
        </div>
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const res = await fetch(`/api/getCity?city=${city}`);
    const data: DataResponse = await res.json();
    setWethear(data);

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-linear-to-b from-blue-200 to-blue-500 p-4">
      <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
        <Input
          className="flex-1 p-2 rounded-md shadow-sm"
          type="text"
          placeholder="Qual a cidade?"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button
          type="submit"
          className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition"
        >
          Enviar
        </Button>
      </form>

      {/* Resultado */}

      {!loading && wethear && (
        <div className="mt-10 w-full max-w-md md:max-w-2xl lg:max-w-4xl bg-linear-to-tr from-blue-200 via-blue-300 to-blue-400 rounded-3xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-900 tracking-wide text-center sm:text-left">
              {wethear.name}
            </h1>
            <img
              className="w-12 h-8 rounded-md shadow-md border border-blue-200"
              src={`https://flagcdn.com/w320/${wethear.sys.country.toLowerCase()}.png`}
              alt={`Bandeira de ${wethear.sys.country}`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
            <div className="flex flex-col items-center bg-white/70 rounded-xl p-4 shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-200">
              <p className="text-lg sm:text-xl font-semibold">
                🌡️ {wethear.main.temp.toFixed(1)}°C
              </p>
              <span className="text-xs sm:text-sm text-gray-600">
                Temperatura
              </span>
            </div>
            <div className="flex flex-col items-center bg-white/70 rounded-xl p-4 shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-200">
              <p className="text-lg sm:text-xl font-semibold">
                🤗 {wethear.main.feels_like.toFixed(1)}°C
              </p>
              <span className="text-xs sm:text-sm text-gray-600">
                Sensação térmica
              </span>
            </div>
            <div className="flex flex-col items-center bg-white/70 rounded-xl p-4 shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-200">
              <p className="text-lg sm:text-xl font-semibold flex flex-col items-center">
                <img
                  className="w-10 h-10 sm:w-12 sm:h-12"
                  src={`https://openweathermap.org/img/wn/${wethear.weather[0].icon}@2x.png`}
                  alt=""
                />
                {wethear.weather[0]?.description}
              </p>
              <span className="text-xs sm:text-sm text-gray-600">Condição</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center bg-white/70 rounded-xl p-4 shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-200">
              <p className="text-lg sm:text-xl font-semibold">
                💧 {wethear.main.humidity}%
              </p>
              <span className="text-xs sm:text-sm text-gray-600">Umidade</span>
            </div>
            <div className="col-span-1 sm:col-span-2 flex flex-col items-center bg-white/70 rounded-xl p-4 shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-200">
              <p className="text-lg sm:text-xl font-semibold">
                🌬️ {wethear.wind.speed} m/s
              </p>
              <span className="text-xs sm:text-sm text-gray-600">Vento</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
