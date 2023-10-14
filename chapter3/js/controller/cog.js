import {map,idmarker} from '../config/configpeta.js';
import {insertMarkerCOG} from './marker.js';
import {disposePopover} from './popup.js';
import {hide} from 'https://jscroot.github.io/element/croot.js';

export function getAllCoordinates(){
    let i=0;
    let sudahhapus=0;
    let pointlist = [];
    let totaldemand=0;
    let Xcog=0;
    let Ycog=0;
    map.getLayers().forEach(layer => {
      if (i !== 0 && sudahhapus === 0) {
        layer.getSource().getFeatures().forEach( feature =>
          {
            let node = {
                id : feature.get('id'),
                name : feature.get('name'),
                volume : feature.get('volume'),
                xy : feature.get('geometry').flatCoordinates,
            }
            pointlist.push(node);
            totaldemand=totaldemand+Number(feature.get('volume'));
            Xcog=Xcog+feature.get('geometry').flatCoordinates[0]*Number(feature.get('volume'));
            Ycog=Ycog+feature.get('geometry').flatCoordinates[1]*Number(feature.get('volume'));
          }
        );
      }
      i++;
    });
    console.log(pointlist);
    let x=Xcog/totaldemand;
    let y=Ycog/totaldemand;
    console.log(x);
    console.log(y);
    insertMarkerCOG(x,y);
    disposePopover();
    hide('hitungcogbutton');
}