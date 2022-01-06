# Leaflet-Challenge
### Visualizing Data with Leaflet

![1-Logo](https://github.com/PeiDay/Leaflet-Challenge/blob/main/static/images/1-Logo.png)

## Background
Welcome to the United States Geological Survey, or USGS for short. The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. 

They collect a massive amount of data from all over the world each day. We are building a new set of tools that will visualize the **USGS earthquake data**.  We will visualize their data will to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

### Task 1: Basic Visualization

![BasicMap](basic_map)

Your first task is to visualize an earthquake data set.

1. **Get Dataset**

   The USGS provides earthquake data in a number of different formats, updated every 5 minutes. We retrieved a JSON representation of "All Earthquakes from the Past 7 Days" from the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page. 
   We pulled the JSON data from this URL for our visualization.

   ![4-JSON](Images/4-JSON.png)

2. **Import & Visualize the Data**

   Create a map using Leaflet that plots all of the earthquakes from the retrievd data based on the longitude and latitude.

   * The data circle markers reflect the magnitude of the earthquake by the size and and depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger and earthquakes with greater depth should appear darker in color.

   * When a marker is clicked, the popups provide additional information about the earthquake.

   * A legend on the bottom right corner will provide context for the map data.

