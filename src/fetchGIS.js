import fetch from 'node-fetch';

function fetchGIS() {

  return fetch('https://api.tel-aviv.gov.il/gis/Layer?layerCode=680',
              { method: 'GET'});

}

export default fetchGIS;
//module.exports = fetchGIS;
