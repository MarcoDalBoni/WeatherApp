class WeatherData {

    constructor(location, condition, tempCelsius, tempFarenheit) {
        this.location = location;
        this.condition = condition;
        this.tempCelsius = tempCelsius;
        this.tempFarenheit = tempFarenheit;
    }

    set location(value) { this._location = value; }
    get location() { return this._location; }

    set condition(value) { this._condition = value; }
    get condition() { return this._condition; }

    set tempCelsius(value) { this._tempCelsius = value; }
    get tempCelsius() { return this._tempCelsius; }

    set tempFarenheit(value) { this._tempFarenheit = value; }
    get tempFarenheit() { return this._tempFarenheit; }

    printInformation = () => {
        return `In ${this.location} the temperature is ${this.tempCelsius}°C (${this.tempFarenheit}F), and it's ${this.condition}`;
    }
}

const weatherKey = "9e6f5d3ac57f4f6aa81121030240507";

var form = document.getElementById("locationForm");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);
const inputLocation = document.getElementById("inputLocation");
const submitLocation = document.getElementById("submitLocation");

submitLocation.addEventListener("click", () => {
    getWeather(inputLocation.value)
});


async function getWeather(searchLocation) {

    try {
        const result = await fetch(`https://api.weatherapi.com/v1/current.json?key=${weatherKey}&q=${searchLocation}`);
        const weatherDataJson = await result.json();
    
        const location = weatherDataJson.location.name;
        document.getElementById("weatherIcon").src = weatherDataJson.current.condition.icon;
        const condition = weatherDataJson.current.condition.text;
        const tempCelsius = weatherDataJson.current.temp_c;
        const tempFarenheit = weatherDataJson.current.temp_f;
    
        const weatherData = new WeatherData(location, condition, tempCelsius, tempFarenheit);
    
        document.getElementById("weatherInformation").textContent = weatherData.printInformation();
    } catch(error) {
        document.getElementById("weatherIcon").src = "error.png";
        document.getElementById("weatherInformation").textContent = "please enter an existent country or city"
    }
}

getWeather("Rome");