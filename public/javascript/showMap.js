
mapboxgl.accessToken = 'pk.eyJ1IjoibmlraGlsMDAxLWRldiIsImEiOiJjbDgzMGExamUwMTJuM29tc3YzdWhuaGM3In0.ZbyzwX1hh5fRhYY4-S-96g';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 9, // starting zoom
    projection: 'globe' // display the map as a 3D globe
});
// map.on('style.load', () => {
//     map.setFog({}); // Set the default atmosphere style
// });

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 30 }).setHTML(`<h4>${campground.title}</h4><p>${campground.location}</p>`))
    .addTo(map);    
