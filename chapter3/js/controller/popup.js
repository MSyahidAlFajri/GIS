import {toLonLat} from 'https://cdn.skypack.dev/ol/proj.js';
import {toStringHDMS} from 'https://cdn.skypack.dev/ol/coordinate.js';
import {overlay,map,popupinfo,idmarker} from '../config/configpeta.js';
import {clickpopup} from '../template/template.js';
import {insertMarker,deleteMarker} from './marker.js';
import {setInner,textBlur,onClick, getValue,setValue} from 'https://jscroot.github.io/element/croot.js';
import { postWithToken } from "https://jscroot.github.io/api/croot.js";


export function onClosePopupClick() {
    overlay.setPosition(undefined);
    textBlur('popup-closer');
}

export function onDeleteMarkerClick() {
    let idmarker = getValue('idmarker');
    popupinfo.setPosition(undefined);
    deleteMarker(idmarker);
}

export function onSubmitMarkerClick() {
    let long = getValue('long');
    let lat = getValue('lat');
    let name = getValue('name');
    let volume = getValue('volume');
    let data = {long,lat,volume};
    postWithToken("https://eoqc0wqfm9sjc6y.m.pipedream.net","Token","dsf9ygf87h98u479y98dj0fs89nfd7",data,afterSubmitCOG);
    overlay.setPosition(undefined);
    textBlur('popup-closer');
    insertMarker(name,long,lat,volume);
    idmarker.id=idmarker.id+1;
}

function afterSubmitCOG(result){
    console.log(result);
}

function popupInputMarker(evt) {
    let tile = evt.coordinate;
    let coordinate = toLonLat(tile);
    let msg = clickpopup.replace("#LONG#",coordinate[0]).replace("#LAT#",coordinate[1]).replace('#X#',tile[0]).replace('#Y#',tile[1]).replace('#HDMS#',toStringHDMS(coordinate));
    msg = 'ID : '+idmarker.id+'<br>'+msg + "Pixel : "+evt.pixel+"<br>"
    setInner('popup-content',msg);
    setValue('long',coordinate[0]);
    setValue('lat',coordinate[1]);
    overlay.setPosition(tile);
}

function popupGetMarker(evt,features) {
    let title = features.get('name');
    setInner('popupinfo-title',title);
    setValue('idmarker',features.get('id'));
    let ctnt = "type : "+features.getGeometry().getType()+"<br>XY : "+toLonLat(evt.coordinate);
    setInner('popupinfo-content',ctnt);
    popupinfo.setPosition(evt.coordinate);
}

export function onMapPointerMove(evt) {
  const pixel = map.getEventPixel(evt.originalEvent);
  const hit = map.hasFeatureAtPixel(pixel);
  map.getTargetElement().style.cursor = hit ? 'pointer' : '';
}

let popover;
export function disposePopover() {
  if (overlay || popupinfo) {
    overlay.setPosition(undefined);
    popupinfo.setPosition(undefined);
  }
}

export function onMapClick(evt) {
    let feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
      return feature;
    });
    overlay.setPosition(undefined);
    popupinfo.setPosition(undefined);
    if (!feature) {
        popupInputMarker(evt);
        return;
    }else{
        popupGetMarker(evt,feature);
    }
  }