/* Global Variables */
const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=`;
const apiKey = `&units=metric&appid=0825e42c8766f7ba5ede6f7d352d163d`;
const cityName = '';
const input = '';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+'.'+ (d.getMonth()+1)+'.'+ d.getFullYear();

// Add event listener
document.getElementById('generate').addEventListener('click', performAction);

// Main functions
function performAction() {
    const input = document.getElementById('feelings').value;
    console.log(input);
    getData(baseURL, cityName, apiKey)
    .then(function(data){ 
        postData('/add', {
            temperature: data.main.temp,
            date: newDate, 
            input: input});
    })
    .then(updateUI());
};

// Helper functions
const getData = async (url, city, key)=>{
    const cityName = document.getElementById('city').value;
    const request = await fetch (baseURL+cityName+apiKey);
    try{
        const data = await request.json();
        console.log(data);
        console.log(data.main.temp);
        return data;
    } catch (error){
        console.log('error', error);
    };
};

const postData = async (url='', data = {}) => {
    const response = await fetch (url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    try{
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error){
        console.log('error', error);
    };
};

const updateUI =  async ()=>{
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        document.getElementById('date').innerHTML += allData.date;
        document.getElementById('temp').innerHTML += `${allData.temperature}°C`;
        document.getElementById('content').innerHTML += allData.input;
    } catch (error){
        console.log('error', error);
    }
}; 
