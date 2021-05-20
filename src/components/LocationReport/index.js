import  "./index.css"
import React, { useEffect, useState } from  "react";
import { Skeleton,  Card, Spin  } from 'antd';
import { LoadingOutlined } from "@ant-design/icons";
import store from "../../store";



const {Meta} = Card;

export default function LocationReport () {
 
  const [loading , setLoading] = useState(true);

  
  const [weatherDescription , setWeatherDescription] = useState(undefined);

  const [name , setName] = useState();

  const [weatherMatrics , setWeatherMatrics] = useState(undefined);

  const  renderWeatherMatrics = () => {

    if(weatherMatrics === null || weatherMatrics === undefined)
      {
        return "Weather Matrics";
      }
    else{
      return (<ul>
        <li>Temperature : {weatherMatrics?.Temperature}</li>
        <li>Humidity : {weatherMatrics?.Humidity}</li>
        <li>Pressure : {weatherMatrics?.Pressure}</li>
        <li>SEA LEVEL : {weatherMatrics?.SEALEVEL}</li>
      </ul>)

    }



  }

  
  useEffect(() => {
     const weather = store.getState().weather ;
     setLoading(weather === undefined || weather === null);
     setWeatherDescription(weather?.weather?.weather[0]?.main || null + ":" + weather?.weather?.weather[0]?.description || null);
     setName(weather?.weather?.name || null);
     //setWeatherDescription(weather?.weather || null)
     const weatherMat = [];
     weatherMat.Temperature =  weather?.weather?.main?.temp || null;
     weatherMat.Pressure =  weather?.weather?.main?.pressure || null;
     weatherMat.Humidity = weather?.weather?.main?.humidity || null;
     weatherMat.SEALEVEL = weather?.weather?.main?.sea_level || null;
     setWeatherMatrics(weatherMat || null);

  }, [store.getState().weather])

  if(weatherDescription === undefined || weatherMatrics === undefined)
    {
      const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
      return <Spin indicator={antIcon} />;
    }

  else{
    return  (
      <div style = {{padding : "50px 10px"}}>
        <Card
          style={{ width: '80vw' }}
         className = "card"
          
        >
          <Skeleton loading={loading} avatar active>
            <Meta
              title={name}
              description={weatherDescription}
            />
            <div>
              {renderWeatherMatrics()}
            </div>
          </Skeleton>
        </Card>
      </div>
    )
  }

}