
function fetchCountriesByName(name = Ukraine) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=capital,population,flags,languages,name `).then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    } )  
    }

export { fetchCountriesByName };