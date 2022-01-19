console.log("step 2 JS read")

// Store our API endpoint as queryUrl.
// ** monthly data
// var earthquakeUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
// ** weekly data 
var earthquakeUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

// tectonic plates url
var tecPlateUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"


var theMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Create the base layer
var myMap = L.map("map", {
    center: [38.50, -96.00],
    zoom: 3,
    layers: [theMap, topo]
});

theMap.addTo(myMap)

var baseMap = {
   "Basic Map": theMap ,
   Topography: topo
};

// variable for the layers
var earthquakesLayer = new L.LayerGroup();
var tecPlateLayer = new L.LayerGroup();

// Overlays that can be toggled on or off
var overlayMaps = {
    Earthquakes: earthquakesLayer,
    "Tectonic Plates": tecPlateLayer
  };

// Pass our map layers into our layer control.
// Add the layer control to the map.
L.control
.layers(baseMap, overlayMaps)
.addTo(myMap);
  

// Define a markerSize based on earthquake magnitude
function markerSize(magnitude) {
    return magnitude * 5;
};

// Define markerColor based on earthquake depth
function markerColor(depth) {
    if (depth <= 10) {
        return "#bcbddc"
    } else if (depth <= 30) {
        return "#9e9ac8"
    } else if (depth <= 50) {
        return "#807dba"
    } else if (depth <= 70) {
        return "#6a51a3"
    } else if (depth <= 90) {
        return "#54278f"
    } else {
        return "#3f007d"
    }
};

d3.json(earthquakeUrl).then(function (data) {
    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    L.geoJSON(data, {
        pointToLayer: function circleLayer(features, latlng) {
            return L.circleMarker(latlng, {
                radius: markerSize(features.properties.mag),
                fillColor: markerColor(features.geometry.coordinates[2]),
                stroke: true,   
                color: "white",
                weight: 0.7,
                opacity: 0.8,
                fillOpacity: 0.7
            });
        },
        onEachFeature: onEachFeature
    }).addTo(earthquakesLayer);

    // Define a function to run once for each feature in the features array.
    // Give each feature a popup that describes the magnitude, place, and time of the earthquake.
    function onEachFeature(feature, layer) {
        
        layer.bindPopup(`<h3>Magnitude: ${feature.properties.mag}</h3>
        <hr><p><strong>Place: </strong>${feature.properties.place}<br>
        <strong>Time: </strong>${new Date(feature.properties.time)}<br>
        <strong>Depth: </strong>${feature.geometry.coordinates[2]}</p>`);
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

    d3.json(tecPlateUrl).then(function(tectonicData) {
        L.geoJSON(tectonicData, {
            color: "red",
            weight: 3,
        }).addTo(tecPlateLayer);

        tecPlateLayer.addTo(myMap);
    })
});








