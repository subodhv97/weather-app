import React, { useEffect, useState } from 'react';
import { Button, InputGroup, FormControl, ListGroup, Card } from 'react-bootstrap';
import axios from 'axios';
import { FaBeer, FaTemperatureLow, GiSunrise, GiSunset, WiHumidity } from 'react-icons/all';

function Weather() {
    const key = '0cf93cb4d11746fb47b6d681034556f7';
    const [temperature, setTemperature] = useState('');
    const [city_name, setCityName] = useState('London');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [sunrise, setSunrise] = useState('');
    const [sunset, setSunset] = useState('');
    const [windSpeed, setWindSpeed] = useState('');
    const [humidity, setHumidity] = useState('');
    const [name, setName] = useState('');

    
    useEffect(() => {
        var options = {
            method: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city_name + '&appid=' + key,

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
            setTemperature(response.data.main.temp);
            setSunrise(response.data.sys.sunrise);
            setSunset(response.data.sys.sunset);
            setHumidity(response.data.main.humidity);
            setWindSpeed(response.data.wind.speed);
            setCountry(response.data.sys.country);
            setName(response.data.name);

        }).catch(function (error) {
            console.error(error);
            alert("Enter Correct City");

        });
    }, [city_name]);
  //  C:\Users\Sverm\Desktop\react\weather-app\src\Component\scene.jpg
    return (

        <div >
            <h1>Weather Forcasting</h1>
            <br/>
            <div>
                <input type="text" name="cityname" value={city} onChange={e => setCity(e.target.value)}></input>
                <>
                    <Button variant="success" size="lg" active onClick={() => setCityName(city)} onKeyPress={event=>{if(event.key === "Enter"){
                        setCityName(city)
                    }}}>search</Button>
                </>
            </div>
            <br/>
            <br/>
            <div className="itemlist" >
                <Card >
                    <Card.Body>
                        <Card.Title><h2>{name} , {country}</h2></Card.Title>
                        <Card.Text>
                            <p><FaTemperatureLow />Temperature: {temperature} &deg;F</p>
                            <p><GiSunrise />Sunrise: {new Date(sunrise * 1000).toLocaleTimeString('en-IN')}</p>
                            <p><GiSunset />Sunset: {new Date(sunset * 1000).toLocaleTimeString('en-IN')}</p>
                            <p><WiHumidity />Humidity: {humidity} %</p>
                            <p>Wind Speed: {windSpeed} KMPH</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );


}
export default Weather;