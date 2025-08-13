import { IoSearchOutline } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";
import { FiWind } from "react-icons/fi";
import { ImSpinner9 } from "react-icons/im";
import { useEffect, useState, useRef } from "react";
 


const HomePage = () => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false);
    
    const allIcons = {
        "01d": "https://cdn-icons-png.flaticon.com/128/4814/4814268.png",
        "01n": "https://cdn-icons-png.flaticon.com/128/8030/8030068.png",
        "02d": "https://cdn-icons-png.flaticon.com/128/3222/3222808.png",
        "02n": "https://cdn-icons-png.flaticon.com/128/1163/1163625.png",
        "03d": "https://cdn-icons-png.flaticon.com/128/5904/5904053.png",
        "03n": "https://cdn-icons-png.flaticon.com/128/4834/4834497.png",
        "04d": "https://cdn-icons-png.flaticon.com/128/9342/9342323.png",
        "04n": "https://cdn-icons-png.flaticon.com/128/10369/10369442.png",
        "09d": "https://cdn-icons-png.flaticon.com/128/5545/5545843.png",
        "09n": "https://cdn-icons-png.flaticon.com/128/5903/5903792.png",
        "10d": "https://cdn-icons-png.flaticon.com/128/2864/2864448.png",
        "10n": "https://cdn-icons-png.flaticon.com/128/2337/2337416.png",
        "13d": "https://cdn-icons-png.flaticon.com/128/6566/6566218.png",
        "13n": "https://cdn-icons-png.flaticon.com/128/4006/4006054.png",
    }

    const fetchWeather = async (city) => {
        if(city === ""){
            alert("Enter City Name")
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
            const res = await fetch(url);
            const data = await res.json();
            if(!res.ok){
                alert(data.message)
                return
            }
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || "https://cdn-icons-png.flaticon.com/128/4814/4814268.png";
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
                moosam: data.weather[0].main
            })
        } catch (error) {
            setWeatherData(false)
            console.log(`Error in fetching weather data..${error}`)
        }
    }

   useEffect(() => {
    fetchWeather("dehradun");
    const interval = setInterval(() => {
        const city = inputRef.current.value?.trim();
        if (city) { 
            fetchWeather(city);
        }
    }, 10000);

    return () => clearInterval(interval);
}, []);


  return (
    <>
    <div className="flex mt-16 flex-col w-[100%] justify-center gap-10 items-center">
       
       <div className="flex gap-8">
         <input ref={inputRef} required className="bg-blue-200 px-8 py-2 border-none outline-none rounded-2xl" type="text" placeholder="Search Location..." />
         <button onClick={()=>fetchWeather(inputRef.current.value)} className="bg-blue-300 py-2 px-4 rounded-2xl cursor-pointer"> <IoSearchOutline className="font-bold text-xl"/> </button>
       </div>

       {weatherData?<>
        <div className="flex justify-center items-center">
         <div className="bg-blue-100 flex flex-col max:px-28 max:py-6 py-5 px-18 rounded-2xl justify-center items-center ">
            <h1 className="text-3xl font-semibold text-black">{weatherData.location}</h1>
            <img className="py-8 px-8" src={weatherData.icon} alt="" />
            <h2 className="text-center text-black text-3xl">{weatherData.temperature}℃</h2>
            <p className="text-center text-gray-900 text-xl font-semibold">{weatherData.moosam}</p>

            <div className="bg-gray-400 rounded-2xl mt-4 h-0.5 w-[100%]"></div>

        <div className="mt-6">
        <div className="flex gap-12">
            <div className="flex justify-center items-center gap-1">
            <WiHumidity className="w-6 h-6"/>
            <p>Humidity:</p>
            </div>
            <p>{weatherData.humidity} %</p>
        </div>

        <div className="flex gap-8">
            <div className="flex justify-center items-center gap-1">
            <FiWind className="w-5 h-5"/>
            <p>Wind Speed:</p>
            </div>
            <p>{weatherData.windSpeed} km/h</p>
        </div>         
       </div>

        </div>
       </div>
       </>:<>

         <div className="bg-blue-100 w-60 h-60  flex flex-col max:px-28 max:py-6 py-5 px-18 rounded-2xl justify-center items-center ">
            <ImSpinner9 className="text-blue-400 animate-spin h-10 w-10"/>
        </div>
       </>}

    </div>
    </>
  )
};

export default HomePage;