"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { DataResponse } from "./api/getCity/route";
import {
  Droplets,
  Moon,
  Sun,
  Thermometer,
  ThermometerSun,
  Wind,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  // pegando os dados
  const [city, setCity] = useState("");
  const [wethear, setWethear] = useState<DataResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [dark, setDarkTheme] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  // funções e eventos

  function ErrorGet() {
    return (
      <Card
        size="sm"
        className={`mx-auto w-full max-w-sm mt-10 ${
          dark
            ? "bg-linear-to-b from-gray-900 to-gray-800 text-white"
            : "bg-linear-to-b from-blue-200 to-blue-500 text-black"
        }`}
      >
        <CardHeader>
          <CardTitle>Erro, error</CardTitle>
          <CardDescription>
            <p>Erro ao buscar Cidade</p>
            <br />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Cidade informada não existe</p>
          <p>La ciudad mencionada no existe.</p>
          <p>The city mentioned does not exist.</p>
        </CardContent>
      </Card>
    );
  }

  function Toggle() {
    setDarkTheme(!dark);
  }

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

    if (!res.ok) {
      setLoading(false);
      setWethear(null);
      setErro("erro"); // ta com string só para inicializar o ErroGet
      return;
    }

    const data: DataResponse = await res.json();
    setWethear(data);
    setErro(null);
    setLoading(false);
  };

  return (
    <div
      className={`flex flex-col items-center min-h-screen p-4 transition-colors duration-300 ${
        dark
          ? "bg-linear-to-b from-gray-900 to-gray-800 text-white"
          : "bg-linear-to-b from-blue-200 to-blue-500 text-black"
      }`}
    >
      <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
        <Input
          className={`flex-1 p-2 rounded-md shadow-sm ${
            dark ? "bg-gray-700 text-white placeholder-gray-400" : ""
          }`}
          type="text"
          placeholder="Qual a cidade?"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button
          type="submit"
          className={`px-4 py-2 rounded-md transition ${
            dark
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-700 text-white hover:bg-blue-800"
          }`}
        >
          Enviar
        </Button>

        <Button
          onClick={Toggle}
          className={`ml-2 rounded-md transition ${
            dark
              ? "bg-yellow-500 text-black hover:bg-yellow-600"
              : "bg-gray-800 text-white hover:bg-gray-900"
          }`}
        >
          {dark ? <Sun /> : <Moon />}
        </Button>
      </form>

      {/* loading */}

      {loading && searchLoading()}

      {/* Resultado */}

      {loading
        ? searchLoading()
        : erro
          ? ErrorGet()
          : wethear && (
              <div
                className={`mt-10 w-full max-w-md md:max-w-2xl lg:max-w-4xl rounded-3xl shadow-lg p-6 transition-colors duration-300 ${
                  dark
                    ? "bg-linear-to-tr from-gray-700 via-gray-500 to-gray-200 text-gray-200"
                    : "bg-linear-to-tr from-blue-200 via-blue-300 to-blue-400 text-gray-800"
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                  <h1
                    className={`text-2xl sm:text-3xl font-extrabold tracking-wide text-center sm:text-left ${
                      dark ? "text-white" : "text-blue-800"
                    }`}
                  >
                    {wethear.name}
                  </h1>
                  <img
                    className="w-12 h-8 rounded-md shadow-md border border-blue-200"
                    src={`https://flagcdn.com/w320/${wethear.sys.country.toLowerCase()}.png`}
                    alt={`Bandeira de ${wethear.sys.country}`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    className={`flex flex-col items-center rounded-xl p-4 shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-200 ${
                      dark
                        ? "bg-gray-700 text-gray-200"
                        : "bg-white/70 text-gray-800"
                    }`}
                  >
                    <p className="text-lg sm:text-xl font-semibold">
                      <Thermometer color="#d72828" />{" "}
                      {wethear.main.temp.toFixed(1)}
                      °C
                    </p>
                    <span
                      className={`text-xs sm:text-sm ${
                        dark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Temperatura
                    </span>
                  </div>

                  <div
                    className={`flex flex-col items-center rounded-xl p-4 shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-200 ${
                      dark
                        ? "bg-gray-700 text-gray-200"
                        : "bg-white/70 text-gray-800"
                    }`}
                  >
                    <p className="text-lg sm:text-xl font-semibold">
                      <ThermometerSun color="#e4f500" />{" "}
                      {wethear.main.feels_like.toFixed(1)}°C
                    </p>
                    <span
                      className={`text-xs sm:text-sm ${
                        dark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Sensação térmica
                    </span>
                  </div>

                  <div
                    className={`flex flex-col items-center rounded-xl p-4 shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-200 ${
                      dark
                        ? "bg-gray-700 text-gray-200"
                        : "bg-white/70 text-gray-800"
                    }`}
                  >
                    <p className="text-lg sm:text-xl font-semibold flex flex-col items-center">
                      <img
                        className="w-10 h-10 sm:w-12 sm:h-12 "
                        src={`https://openweathermap.org/img/wn/${wethear.weather[0].icon}@2x.png`}
                        alt=""
                        style={{ filter: "drop-shadow(0 0 1px black)" }}
                      />
                      {wethear.weather[0]?.description}
                    </p>
                    <span
                      className={`text-xs sm:text-sm ${
                        dark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Condição
                    </span>
                  </div>

                  <div
                    className={`flex flex-col items-center justify-center text-center rounded-xl p-4 shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-200 ${
                      dark
                        ? "bg-gray-700 text-gray-200"
                        : "bg-white/70 text-gray-800"
                    }`}
                  >
                    <p className="text-lg sm:text-xl font-semibold">
                      <Droplets color="#005dd6" /> {wethear.main.humidity}%
                    </p>
                    <span
                      className={`text-xs sm:text-sm ${
                        dark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Umidade
                    </span>
                  </div>

                  <div
                    className={`col-span-1 sm:col-span-2 flex flex-col items-center rounded-xl p-4 shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-200 ${
                      dark
                        ? "bg-gray-700 text-gray-200"
                        : "bg-white/70 text-gray-800"
                    }`}
                  >
                    <p className="text-lg sm:text-xl font-semibold">
                      <Wind color="#005dd6" /> {wethear.wind.speed} m/s
                    </p>
                    <span
                      className={`text-xs sm:text-sm ${
                        dark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Vento
                    </span>
                  </div>
                </div>
              </div>
            )}
    </div>
  );
}
