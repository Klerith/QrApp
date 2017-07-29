import {Component} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {

  lat: number;
  lng: number;

  constructor(public navParams: NavParams, private viewCtrl: ViewController) {
    this.lat = 13.3536924
    this.lng = -88.9533563

    let coordsArray = this.navParams.get("coords").split(",");

    this.lat = Number(coordsArray[0].replace("geo:",""));
    this.lng = Number(coordsArray[1]);
    console.log(this.navParams.get("coords"))
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }


}
