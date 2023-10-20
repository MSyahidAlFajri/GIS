import { get } from "https://jscroot.github.io/api/croot.js";
import { URLGeoJson } from "./template/template.js";
import { MakeGeojsonFromAPI, responseData, AddLayerToMAP } from "./controller/controller.js";
import {map} from './config/configpeta.js';
import {onClosePopupClick,onDeleteMarkerClick,onSubmitMarkerClick,onMapClick,onMapPointerMove,disposePopover} from './controller/popup.js';
import {onClick} from 'https://jscroot.github.io/element/croot.js';
// import Draw from 'https://cdn.skypack.dev/ol/interaction/Draw.js';
import {getAllCoordinates} from './controller/cog.js';


onClick('popup-closer',onClosePopupClick);
onClick('insertmarkerbutton',onSubmitMarkerClick);
onClick('hapusbutton',onDeleteMarkerClick);
onClick('hitungcogbutton',getAllCoordinates);

map.on('click', onMapClick);
map.on('pointermove', onMapPointerMove);
map.on('movestart', disposePopover);
    
get(URLGeoJson,data => {
    responseData(data)
    let link = MakeGeojsonFromAPI(data)
    // console.log(link)
    // console.log(geojson)
    AddLayerToMAP(link)
    // drawer(link)
}); 
    // export function drawer(geojson) {
    //     const source = new ol.source.Vector({
    //         wrapx: false
    //       });
    //       const Stroke = new ol.layer.Vector({
    //         source: source,
    //         style: function (feature) {
    //             const featureType = feature.getGeometry().getType();
    //             if (featureType === 'Polygon') {
    //                 return new ol.style.Style({
    //                     stroke: new ol.style.Stroke({
    //                         color: 'blue', 
    //                         width: 2
    //                     })
    //                 });
    //             } else {
                    
    //                 return new ol.style.Style({
    //                     stroke: new ol.style.Stroke({
    //                         color: 'red', 
    //                         width: 3
    //                     })
    //                 });
    //             }
    //         }
    //     });
    
    //     const typeSelect = document.getElementById('type');
    
    //     let draw; // global so we can remove it later
    //     typeSelect.onchange = function () {
    //     map.removeInteraction(draw);
    //     addInteraction();
    //     };
    
    //     document.getElementById('undo').addEventListener('click', function () {
    //     draw.removeLastPoint();
    //     });
    //     function addInteraction() {
    //         const value = typeSelect.value;
    //         if (value !== 'None') {
    //             draw = new Draw({
    //             source: source,
    //             type: typeSelect.value,
    //             });
    //             map.addInteraction(draw);
    //         }
    //         }
    //     addInteraction();
    //     map.addLayer(Stroke);
    // }
    