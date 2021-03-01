//Utworzenie obiektu XMLHttpRequest
const xhr = new XMLHttpRequest();
//Konfiguracja połączenia: open(typ, url, async, [login],[password])
xhr.open('GET', 'https://restcountries.eu/rest/v2/all/');
//Ustawienie formatu odpowiedzi
xhr.responseType = 'json';
//Wysłanie żądania na serwer: send([data])
xhr.send();
//Wypisanie otrzymanych danych w konsoli po zakończeniu połączenia asynchronicznego 
xhr.addEventListener('load', function(){
    if(xhr.status ==200){
        var countryData = xhr.response;
        console.log(countryData);
        countriesToTheList('list', countryData);
    }else if(xhr.status == 404){
        alert('List not found!');
    }else{
        alert('Unable to load!');
    }
});
//obsluga bledu polaczenia
xhr.addEventListener('error', function(){
    console.log('Not connected!');
});

// Dodaj kraje do listy
function countriesToTheList(dropDownList, countryData){
    let countryList = document.getElementById('chooseTheCountry');

    countryData.forEach(function(country){
        let countryChoice = document.createElement('option');
        countryChoice.text = country.name;
        countryList.appendChild(countryChoice);
    })
}
// loading the data to the listOfCountries
function chooseTheCountry(){
    let choosenCountry = document.getElementById('chooseTheCountry').value;
    //nawiazanie polaczenia
    const xhr2 = new XMLHttpRequest();
    //Konfiguracja połączenia: open(typ, url, async, [login],[password])
    xhr2.open('GET', 'https://restcountries.eu/rest/v2/name/' + choosenCountry);
    //ustawienia formatu odpowiedzi
    xhr2.responseType = 'json';
    //wysylanie zadania na server
    xhr2.send();
    //wpisanie danych do konsoli
    xhr2.addEventListener('load', function(){
        if(xhr2.status==200){
            var countryDetails = xhr2.response;
            console.log(countryDetails);
            addInformation(countryDetails);
        }else if(xhr2.status==404){
            alert('Details not found!');
        }else{
            alert('No data availiable!');
        }
    });
    //obsluga bledu polaczenia
    xhr2.addEventListener('error',function(){
        console.log('Not Connected!');
    })
}
//uzupelnianie danych kraju
function addInformation(countryInfo){
    fillTable('name', countryInfo[0].name);
    fillTable('capital', countryInfo[0].capital);
    fillTable('language', countryInfo[0].languages[0].name);
    fillTable('area', countryInfo[0].area);
    fillTable('population', countryInfo[0].population);
    fillTable('currency', countryInfo[0].currencies[0].name);
    document.getElementById('flag').src = countryInfo[0].flag;
}
function fillTable(identification, parameter){
    document.getElementById(identification).innerHTML = parameter;
}