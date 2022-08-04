import Notiflix from 'notiflix';

export default class Countries{
    constructor() {
        this.country=""
    }

    fetchCountries() {
        const url = `https://restcountries.com/v3.1/name/${this.country}?fields=name,capital,population,languages,flags`
        return fetch(url).then(response => {
            if (!response.ok) {
                throw new Error()
            }else{return response.json()}
        }).then(data => {
             if (data.length > 10) {
                    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
             } else { 
                return data
                 
                }
         }).catch(error => {
                Notiflix.Notify.failure('Oops, there is no country with that name"');
                
            })
    }  
    
    get userCountry() {
        return this.country
    }

    set userCountry(userValue) {
        this.country= userValue
    }
    
}

