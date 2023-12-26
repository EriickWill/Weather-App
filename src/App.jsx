import { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
  
  const [key,setKey] = useState(import.meta.env.VITE_API_KEY);

  const [weathers, setWeathers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("São Paulo");

  const ref = useRef(null);
  useEffect(() => {
    const params = {
      q: city,
      appid: key,
      units: "metric",
    };
    axios.get(baseUrl, { params }).then((response) => {
      console.log(response.data);
      setWeathers(response.data);
      setLoading(false)
    });

    console.log(weathers);
  }, [city,key]);

  function searchTemp(e) {
    e.preventDefault();
    setLoading(false)
    setCity(ref.current.value);
    console.log(city);
  }

  return (
    <main>
      <section className='container-clima'>
        <form>
          <input type="text" ref={ref} />
          <button onClick={searchTemp}>Search</button>
        </form>
 
        {loading == true ? (
            <div>Carregando</div>
          ) : (
            <div className='weather-container'>
              <h1>{weathers.name}</h1>
              <span>{Math.floor(weathers.main.temp)}<p>°</p></span>
              <p>{weathers.weather[0].main}</p>
            </div>
          )}

       
      </section>
    </main>
  );
}

export default App;
