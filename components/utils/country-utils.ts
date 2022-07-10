import { countries } from 'country-data';

export function getCountryName(countryCode: string) {
    const country = countries[countryCode].name;
    return country;
}
  
export function getCounryCode(contryName: string) {
    const countryCode = countries[contryName].alpha2;
    return countryCode;
}

export function getCounryCodeFromLocation(locationWithFlag: string) {
    const countryName = locationWithFlag.split(' ')[0];
    return getCounryCode(countryName);
}


export function getFlagEmoji(countryCode: string) {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }

export function getLocation(countryCode: string) {
    // get flag emoji
    const flagEmoji = getFlagEmoji(countryCode);
    // get country name
    const country = countries[countryCode].name;
    return `${country} ${flagEmoji}`;
}

