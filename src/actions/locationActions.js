import axios from "axios";
import { FETCH_WEATHER} from "./types"

const API_KEY  = "e27b2b78809962f40ec21d68973f3e7e";



export const fetchWeather = (lattitude , longitude) =>  async dispatch =>  {

    const weather = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lattitude}&lon=${longitude}&appid=${API_KEY}`)
    dispatch( {
        type : FETCH_WEATHER,
        weather : weather.data
    })
   
}

