// Store our API endpoint as queryUrl.
// monthly data
// var queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
// weekly data 
var queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

// ****************************************** //
d3.json(queryUrl).then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function.
    createMap(data.features);
  });
// ****************************************** //

// Define a markerSize based on earthquake magnitude
function markerSize(magnitude) {
    return magnitude * 5;
}

// Define markerColor based on earthquake depth
function markerColor(depth) {
    if (depth <= 10) {
        return "rgb(253,212,158)"
    } else if (depth <= 30) {
        return "rgb(253,187,132)"
    } else if (depth <= 50) {
        return "rgb(252,141,89)"
    } else if (depth <= 70) {
        return "rgb(239,101,72)"
    } else if (depth <= 90) {
        return "rgb(215,48,31)"
    } else {
        return "rgb(127,0,0)"
    }
};

function createMap (earthquakeData){
    // Create the base layer
    var myMap = L.map("map", {
        center: [
            38.50, -96.00
        ],
        zoom: 5,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);


    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    L.geoJSON(earthquakeData, {
        pointToLayer: function circleLayer(features, latlng) {

            return L.circleMarker(latlng, {
                radius: markerSize(features.properties.mag),
                fillColor: markerColor(features.geometry.coordinates[2]),
                color: "white",
                weight: 0.7,
                opacity: 0.8,
                fillOpacity: 0.7
        
            });
        
        },
        onEachFeature: onEachFeature
    }).addTo(myMap);


    // Define a function to run once for each feature in the features array.
    // Give each feature a popup that describes the magnitude, place, and time of the earthquake.
    function onEachFeature(feature, layer) {
        
        layer.bindPopup(`<h3>Magnitude: ${feature.properties.mag}</h3><hr><p><strong>Place: </strong>${feature.properties.place}<br><strong>Time: </strong>${new Date(feature.properties.time)}<br><strong>Depth: </strong>${feature.geometry.coordinates[2]}</p>`);
        };


    // Create legend on the map
    // https://www.igismap.com/legend-in-leafletjs-map-with-topojson/ 
    var legend = L.control({position: "bottomright"});
    legend.onAdd = function() {
        var legend_div = L.DomUtil.create("div", "info legend");
        var depths = [-10, 10, 30, 50, 70, 90];
        var labels = [];
        var legendData = "<h4> Earthquake <br> Depth </h4>";

        legend_div.innerHTML = legendData;

        // go through each "depth" to label and color the legend
        // push to labels array as list item
        for (var i = 0; i < depths.length; i++) {
            labels.push('<li style="background-color:' + markerColor(depths[i] + 1) + '"> <span>' + depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '' : '+') + '</span></li>');
        }

        // add each label list item to the div under the <ul> tag
        legend_div.innerHTML += "<ul>" + labels.join("") + "</ul>";

        return legend_div;
    };
    legend.addTo(myMap);

};





