import Feature from 'https://cdn.skypack.dev/ol/Feature.js';
import Point from 'https://cdn.skypack.dev/ol/geom/Point.js';
import VectorSource from 'https://cdn.skypack.dev/ol/source/Vector.js';
import {Vector as VectorLayer} from 'https://cdn.skypack.dev/ol/layer.js';
import {fromLonLat} from 'https://cdn.skypack.dev/ol/proj.js';
import {Icon, Style} from 'https://cdn.skypack.dev/ol/style.js';
import {map,idmarker} from '../config/configpeta.js';

export function insertMarker(name,long,lat,volume){
    let marker = new Feature({
        type: 'icon',
        id : idmarker.id,
        name : name,
        volume : volume,
        geometry: new Point(fromLonLat([long, lat])),
    });
    marker.setStyle(
        new Style({
          image: new Icon({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: 'img/icon.png',
          }),
        })
      );
    let vectorSource = new VectorSource({
        features: [marker],
    });
    
    let vectorLayer = new VectorLayer({
    source: vectorSource,
    });
    map.addLayer(vectorLayer);
}

export function deleteMarker(idmarker){
    let i=0;
    let sudahhapus=0;
    map.getLayers().forEach(layer => {
      if (i !== 0 && sudahhapus === 0) {
        layer.getSource().getFeatures().forEach( feature =>
          {
            if (feature.get('id') == idmarker){
              map.removeLayer(layer);
              sudahhapus=1;
              console.log("hapus layer");
              return;
            }
          }
        );
      }
      i++;
    });
}

export function insertMarkerCOG(x,y){
  let marker = new Feature({
      type: 'icon',
      id : idmarker.id,
      name : 'Center of Grafity',
      volume : '-',
      geometry: new Point([x, y]),
  });
  marker.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'img/icog.png',
        }),
      })
    );
  let vectorSource = new VectorSource({
      features: [marker],
  });
  
  let vectorLayer = new VectorLayer({
  source: vectorSource,
  });
  map.addLayer(vectorLayer);
}