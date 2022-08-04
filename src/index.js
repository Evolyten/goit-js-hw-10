import './css/styles.css';
import Countries from './fetchCountries';
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;


 const refs = {
    inputEl: document.querySelector("#search-box"),
    countryListEl: document.querySelector(".country-list"),
    countryInfoEl: document.querySelector(".country-info")
    
}

refs.inputEl.addEventListener("input", debounce(inputCountry,DEBOUNCE_DELAY))

const chosenCountry = new Countries()


function inputCountry(e) {
    let inputValue = (e.target.value).trim()
    if(inputValue!=="")
    {chosenCountry.userCountry = (e.target.value).trim()
    chosenCountry.fetchCountries().then(data => {
         if (data.length === 1) {
         clearContent()
        refs.countryInfoEl.insertAdjacentHTML('beforeend', createMarkupForOneCountries(data))
        }
        else {
        clearContent()
        refs.countryListEl.insertAdjacentHTML('beforeend', createMarkupForSeveralCountries(data))
        } 
    }).catch(error => {
        clearContent()
    })
    } else {
            clearContent()
        }
}

function clearContent() {
    refs.countryListEl.textContent = ""
    refs.countryInfoEl.textContent = ""
}

function createMarkupForSeveralCountries(obj) {
    return obj.map(n =>`<li>
        <img width='40' height='20' src="${n.flags.svg}"><span>${n.name.official}</span></li>`).join("")
}

function createMarkupForOneCountries(obj) {
    return obj.map(n=>`<img width='40' height='20' src="${n.flags.svg}" alt="">
        <h3>${n.name.official}</h3>
      </div>
      <ul>
        <li>
          <p><strong>Capital:</strong>${n.capital}</p>
        </li>
        <li>
          <p><strong>Population:</strong>${n.population}</p>
        </li>
        <li>
          <p><strong>Languages:</strong>${Object.values(n.languages)}</p>
        </li>
      </ul>`)
}