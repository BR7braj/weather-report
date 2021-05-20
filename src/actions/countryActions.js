import csc from 'country-state-city';


export const getAllCountries = () => {
    return csc.getAllCountries();
}

export const getAllStatesOfCountry = (countryCode) => {
    return csc.getStatesOfCountry(countryCode);
}

export const getAllCitiesOfStates = (countryCode , stateCode) => {
    return csc.getCitiesOfState(countryCode, stateCode);
}

