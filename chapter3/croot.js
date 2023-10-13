document.addEventListener('DOMContentLoaded', () => {
    const map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([95.31678153983819, 5.554925722443841]),
            zoom: 15
        })
    });

    const waypointSource = new ol.source.Vector({
        url: 'Aceh.json',
        format: new ol.format.GeoJSON()
    });

    const lineStringSource = new ol.source.Vector({
        url: 'Aceh.json',
        format: new ol.format.GeoJSON()
    });

    const polylineSource = new ol.source.Vector({
        url: 'Aceh.json',
        format: new ol.format.GeoJSON()
    });

    const waypointLayer = new ol.layer.Vector({
        source: waypointSource,
        style: new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                    color: 'purple'
                })
            })
        })
    });

    const lineStringLayer = new ol.layer.Vector({
        source: lineStringSource,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'blue',
                width: 2
            })
        })
    });

    const polylineLayer = new ol.layer.Vector({
        source: polylineSource,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'black',
                width: 5
            })
        })
    });

    map.addLayer(waypointLayer);
    map.addLayer(lineStringLayer);
    map.addLayer(polylineLayer);

    const addPopup = (map, source, featureType) => {
        const overlay = new ol.Overlay({
            element: document.getElementById('popup'),
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        });
        map.addOverlay(overlay);

        map.on('click', (event) => {
            map.forEachFeatureAtPixel(event.pixel, (feature) => {
                const coordinates = feature.getGeometry().getCoordinates();
                const content = `<strong>${featureType}</strong><br>Coordinates: ${coordinates}`;
                overlay.setPosition(coordinates);
                document.getElementById('popup-content').innerHTML = content;
            });
        });
    };

    waypointSource.once('change', () => {
        const waypointCoords = getCoordinates(waypointSource);
        addPopup(map, waypointSource, 'Waypoint');
        document.getElementById('featureCoords').textContent = waypointCoords.toString();
    });

    lineStringSource.once('change', () => {
        const lineStringCoords = getCoordinates(lineStringSource);
        addPopup(map, lineStringSource, 'Line String');
        document.getElementById('featureCoords').textContent = lineStringCoords.toString();
    });

    polylineSource.once('change', () => {
        const polylineCoords = getCoordinates(polylineSource);
        addPopup(map, polylineSource, 'Polyline');
        document.getElementById('featureCoords').textContent = polylineCoords.toString();
    });

    const getCoordinates = (source) => {
        const features = source.getFeatures();
        const coordinates = features[0].getGeometry().getCoordinates();
        return coordinates;
    };
});

document.addEventListener("DOMContentLoaded", () => {
    const pointTable = document.getElementById("pointTable").getElementsByTagName('tbody')[0];

    fetch("Aceh.json") // Ganti "data.json" dengan nama file JSON Anda
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                if (feature.geometry.type === "Point") {
                    const row = pointTable.insertRow();
                    const nameCell = row.insertCell(0);
                    const coordinatesCell = row.insertCell(1);
                    const typeCell = row.insertCell(2);
                    nameCell.innerText = feature.properties.name;
                    coordinatesCell.innerText = JSON.stringify(feature.geometry.coordinates);
                    typeCell.innerText = feature.geometry.type;
                    
                }
            });
        })
        .catch(error => console.error("Terjadi kesalahan:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    const pointTable = document.getElementById("polygonTable").getElementsByTagName('tbody')[0];

    fetch("Aceh.json") // Ganti "data.json" dengan nama file JSON Anda
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                if (feature.geometry.type === "Polygon") {
                    const row = pointTable.insertRow();
                    const nameCell = row.insertCell(0);
                    const coordinatesCell = row.insertCell(1);
                    const typeCell = row.insertCell(2);
                    nameCell.innerText = feature.properties.name;
                    coordinatesCell.innerText = JSON.stringify(feature.geometry.coordinates);
                    typeCell.innerText = feature.geometry.type;
                    
                }
            });
        })
        .catch(error => console.error("Terjadi kesalahan:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    const pointTable = document.getElementById("polylineTable").getElementsByTagName('tbody')[0];

    fetch("Aceh.json") // Ganti "data.json" dengan nama file JSON Anda
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                if (feature.geometry.type === "LineString") {
                    const row = pointTable.insertRow();
                    const nameCell = row.insertCell(0);
                    const coordinatesCell = row.insertCell(1);
                    const typeCell = row.insertCell(2);
                    nameCell.innerText = feature.properties.name;
                    coordinatesCell.innerText = JSON.stringify(feature.geometry.coordinates);
                    typeCell.innerText = feature.geometry.type;
                    
                }
            });
        })
        .catch(error => console.error("Terjadi kesalahan:", error));
});
