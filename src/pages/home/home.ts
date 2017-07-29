import {Component} from '@angular/core';
//plugins
import {BarcodeScanner} from "@ionic-native/barcode-scanner";

//componentes
import {ToastController, Platform} from 'ionic-angular';

//service
import {HistorialService} from "../../providers/historial/historial";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private toastCtrl: ToastController, private barcodeScanner: BarcodeScanner,
              private platform: Platform, private _historialService: HistorialService) {

  }

  scan() {
    console.log('Estamos en modo desarrollo...');

    if (!this.platform.is('cordova')) {
     //io this._historialService.addHistory("http://google.com");
      this._historialService.addHistory("BEGIN:VCARD\n" +
        "VERSION:2.1\n" +
        "N:Kent;Clark\n" +
        "FN:Clark Kent\n" +
        "ORG:\n" +
        "TEL;HOME;VOICE:12345\n" +
        "TEL;TYPE=cell:67890\n" +
        "ADR;TYPE=work:;;;\n" +
        "EMAIL:clark@superman.com\n" +
        "END:VCARD");
      //this._historialService.addHistory("http://google.com");
      return;
    }

    this.barcodeScanner.scan().then((barcodeData) => {


      if (barcodeData.text != null && barcodeData.cancelled == false) {
        this._historialService.addHistory(barcodeData.text);
      }

    }, (err) => {
      this.showError('Error: ' + err);
    });

  }


  showError(mensaje: string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2500
    });
    toast.present();
  }

}
