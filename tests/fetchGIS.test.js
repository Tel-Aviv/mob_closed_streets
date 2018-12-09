import fetchGIS from '../src/fetchGIS';

test('Fetch GIS', () => { 

  expect.assertions(3); // expect exactly 3 assertions

  return fetchGIS()
  .then( res => res.json() )
  .then( json => {
    expect(json).not.toBeNull();
    expect(json.features).not.toBeNull();
    expect(json.features.length).toBeGreaterThan(0);
  });
});
