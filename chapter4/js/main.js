import { get } from "https://jscroot.github.io/api/croot.js";
import {getCookie} from "https://jscroot.github.io/cookie/croot.js";
import { URLGeoJson } from "./template/template.js";
import { MakeGeojsonFromAPI, responseData, AddLayerToMAP, drawer } from "./controller/controller.js";
import {map} from './config/configpeta.js';
import {onClosePopupClick,onDeleteMarkerClick,onSubmitMarkerClick,onMapClick,onMapPointerMove,disposePopover} from './controller/popup.js';
import {onClick} from 'https://jscroot.github.io/element/croot.js';
import {getAllCoordinates} from './controller/cog.js';

onClick('popup-closer',onClosePopupClick);
onClick('insertmarkerbutton',onSubmitMarkerClick);
onClick('hapusbutton',onDeleteMarkerClick);
onClick('hitungcogbutton',getAllCoordinates);


map.on('click', onMapClick);
// map.on('click', onMapInput)
map.on('pointermove', onMapPointerMove);
map.on('movestart', disposePopover);
export let allCoordinates = []
map.on('click', function (event) {
    let lonLat = ol.proj.toLonLat(event.coordinate);
    allCoordinates.push(lonLat);

    console.log(lonLat)
});


get(URLGeoJson,data => {
    responseData(data)
    let link = MakeGeojsonFromAPI(data)
    // console.log(link)
    // console.log(geojson)
    AddLayerToMAP(link)
    drawer(link)
}); 