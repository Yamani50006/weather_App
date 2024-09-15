import React, { useEffect, useRef, useState } from 'react'
import './waether.css'
import search_icon from "../assets/search.png"
import clear from "../assets/clear.png"
import cloud from "../assets/cloud.png"
import drizzle from "../assets/drizzle.png" 
import humidity from "../assets/humidity.png"
import snow from "../assets/snow.png"
import wind from "../assets/wind.png"
import rain from "../assets/rain.png"


const Weather = () => {
  const [weather, setWeather] = useState(false);
  const inputRef=useRef();
const allicons={
  "01d":clear,
  "01n":clear,
  "02d":cloud,
  "02n":cloud,
  "03d":cloud,
  "03n":cloud,
  "04d":drizzle,
  "04n":drizzle,
  "09d":rain,
  "09n":rain,
  "10d":rain,
  "10n":rain,
  "13d":snow,
  "13n":snow,

}

  const search= async(city)=>{
if (city===""){
  alert("Enter the city name");
  return;
}
  try {
  const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
 const response= await fetch(url);
 const data =await response.json();
 console.log(data);
 const icon=allicons[data.weather[0].icon]|| clear;
 setWeather({
  city: data.name,
  humidity:data.main.humidity,
  wind:data.wind.speed,
  temperature:Math.floor(data.main.temp),
  location:data.name,
  icon:icon 
   
 });
  } catch (error) {
    setWeather(false);
    console.log('error in fetching weather data');
  }
}

useEffect(()=>{
  search(weather.city);
},[]);

  return (
    <div className='weather'>

  <div className="search-bar">
    <input ref={inputRef} type="text" placeholder='Search' value={weather.city}  />
    <img src={search_icon} alt=""  onClick={()=>search(inputRef.current.value)} />
  </div>
{
  weather? <>
  <img src={weather.icon} alt="" className='weater-icon' />
  <p className="temperature">{weather.temperature} ْc </p>
  <p className="city">{weather.city}</p>
 <div className="weather-data">
<div className="col">
  <img src={humidity} alt="" className='weather-icon' />
   <div>
    <p>{weather.humidity}%</p>
    <span>humidity</span>
   </div>
</div>

<div className="col">
  <img src={wind} alt="" className='weather-icon' />
   <div>
    <p>{weather.wind} km</p>
    <span>wind speed</span>
   </div>
</div>

 </div>
  
  
  
  
  </>:<></>
}

  
    </div>
  )
}

export default Weather