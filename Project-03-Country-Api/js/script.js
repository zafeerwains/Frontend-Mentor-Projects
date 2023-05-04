(async function () {
    const country = await fetch("https://restcountries.com/v3.1/all");
    const countryData = await country.json();
    const darkMode = () => {
        document.getElementById("darkModeHTML").style.display = "none"
        document.getElementById("lightModeHTML").style.display = "block"
        document.getElementById("mode").classList.add("bg-secondary")
        document.getElementById("optionContinent").style.background = "hsl(209, 23%, 22%)"
        document.getElementById("optionContinent").style.color = " hsl(0, 0%, 100%)"
        document.getElementById("countryInput").classList.remove("bg-light")
        document.getElementById("countryInput").classList.remove("text-success")
        document.getElementById("headerMode").classList.add("bg-success")
        document.getElementById("countryInput").classList.add("bg-success")
        document.getElementById("countryInput").classList.add("text-light")
        document.getElementById("mainChanges").classList.add("text-light")
        document.getElementById("mainChanges").classList.add("text-light")

        let cards = document.getElementsByClassName("cardColor");
        for (let i = 0; i < cards.length; i++) {
            cards[i].classList.add("bg-success");
        }
        document.getElementById("mode").classList.remove("bg-primary")
        document.getElementById("headerMode").classList.remove("bg-light")
        document.getElementById("mainChanges").classList.remove("text-danger")
        cards = document.getElementsByClassName("cardColor");
        for (let i = 0; i < cards.length; i++) {
            cards[i].classList.remove("bg-light");
        }
    }
    const showCard = (arr) => {
        document.getElementById("test").innerHTML = ""
        for (let ar of arr) {
            document.getElementById("test").innerHTML +=
                ` <div class="col-12  col-sm-6 col-md-4 col-lg-3" >
            <div class="cardColor card my-2 my-2 my-sm-4"  onclick="showcountry(this)"  style="max-width: 100%;" >
            <img src="${ar.flags.png}" class="card-img-top imgHeight"  alt="Flag">
            <div class="card-body">
            <h3>${ar.name.common}</h3>
            <p><span class="fw-bolder">Population:</span>${ar.population}</p>
                <p><span class="fw-bolder">Region:</span>${ar.continents}</p>
                <p><span class="fw-bolder">Capital:</span>${ar.capital}</p>
                </div>
                </div>
                </div>`
        }
    }
    const lightMode = () => {

        document.getElementById("back").style.color = "hsl(209, 23%, 22%)"
        document.getElementById("back").style.background = " hsl(0, 0%, 100%)"
        document.getElementById("optionContinent").style.color = "hsl(209, 23%, 22%)"
        document.getElementById("optionContinent").style.background = " hsl(0, 0%, 100%)"
        document.getElementById("darkModeHTML").style.display = "block"
        document.getElementById("lightModeHTML").style.display = "none"
        document.getElementById("mode").classList.remove("bg-secondary")
        document.getElementById("headerMode").classList.remove("bg-success")
        document.getElementById("mainChanges").classList.remove("text-light")
        let cards = document.getElementsByClassName("cardColor");
        for (let i = 0; i < cards.length; i++) {
            cards[i].classList.remove("bg-success");
        }
        document.getElementById("mode").classList.add("bg-primary")
        document.getElementById("headerMode").classList.add("bg-light")
        document.getElementById("countryInput").classList.add("bg-light")
        document.getElementById("mainChanges").classList.add("text-danger")
        cards = document.getElementsByClassName("cardColor");
        for (let i = 0; i < cards.length; i++) {
            cards[i].classList.add("bg-light");
        }
    }
    const searchCountry = () => {
        const countryInput = document.getElementById("countryInput").value;
        const searchedCountry = countryData.filter((data) => data.name.official.toLowerCase().includes(countryInput.toLocaleLowerCase()));
        showCard(searchedCountry);
    };
    const findRegion = () => {
        const countryInput = document.getElementById("optionContinent").value;
        const searchedCountry = countryData.filter((data) => data.continents[0].toLowerCase().includes(countryInput.toLocaleLowerCase()));
        showCard(searchedCountry);
        if (document.getElementById("darkModeHTML").style.display === "none") {
            darkMode()
        }
    }
    showCard(countryData)
    const countryInput = document.getElementById("countryInput");
    countryInput.addEventListener("keyup", searchCountry);
    const darkModeHTML = document.getElementById("darkModeHTML");
    darkModeHTML.addEventListener("click", darkMode);
    const lightModeHTML = document.getElementById("lightModeHTML");
    lightModeHTML.addEventListener("click", lightMode);
    const regionInput = document.getElementById("optionContinent");
    regionInput.addEventListener("change", findRegion)
})();
const back = () => {
    document.getElementById('allCountry').style.display = 'block';
    document.getElementById("clickedCountry").style.display = "none"
}
const showcountry = (ele) => {
    document.getElementById('allCountry').style.display = 'none';
    document.getElementById("clickedCountry").style.display = "block"
    const h3Value = ele.querySelector('h3').innerText;
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            const searchedCountry = data.filter(data => data.name.common === h3Value);
            let arrData = searchedCountry[0];
            let arrDataLan = Object.values(arrData.languages);
            let languageString = "";
            for (let language in arrData.languages) {
                languageString += arrData.languages[language].name + ", ";
            }
            languageString = languageString.substr(0, languageString.length - 2);
            let borderCountriesString = [];
            let currencyString = "";
            if (arrData.currencies) {
                Object.keys(arrData.currencies).forEach((currency) => {
                    currencyString += arrData.currencies[currency].name + ", ";
                });
            }
            currencyString = currencyString.substr(0, currencyString.length - 2);
            document.getElementById('cname').innerText = `${arrData.name.common}`;
            document.getElementById('cPopulation').innerText = `${arrData.population}`;
            document.getElementById('cRegion').innerText = `${arrData.region}`;
            document.getElementById('cSubRegion').innerText = `${arrData.subregion}`;
            document.getElementById('cCapital').innerText = `${arrData.capital[0]}`;
            document.getElementById('cDomain').innerText = `${arrData.tld}`;
            document.getElementById('cCurrencies').innerText = `${currencyString}`;
            document.getElementById('cLanguage').innerText = `${languageString}`;
            document.getElementById('imgC').innerHTML = `<img src="${arrData.flags.png}" id="imgFlag" style="width:100%;height:100%;" alt="Flag">`;
        });
};