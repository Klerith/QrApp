import {Injectable} from '@angular/core';
import {ScanData} from "../../models/scan-data.model";
import {ModalController, ToastController} from "ionic-angular";
import {MapaPage} from "../../pages/mapa/mapa";
//plugins
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {Contacts, Contact, ContactField, ContactName} from '@ionic-native/contacts';

@Injectable()
export class HistorialService {

  private _historial: ScanData[] = [];

  constructor(private iab: InAppBrowser, private modalCrl: ModalController,
              private contacts: Contacts, private toastCtrl: ToastController) {

  }

  addHistory(text: string) {
    let data = new ScanData(text);
    this._historial.unshift(data);
    this.openScan(0);
  }

  loadHistory() {
    return this._historial;
  }

  private createContact(texto: string) {
    let campos: any = this.parse_vcard(texto);
    let nombre = campos['fn'];
    let tel = campos.tel[0].value[0];

    let contact: Contact = this.contacts.create();

    contact.name = new ContactName(null, nombre);
    contact.phoneNumbers = [new ContactField('mobile', tel)];
    contact.save().then(
      () => this.showToast('Contacto ' + nombre + 'creado'),
      (error: any) => this.showToast('Error saving contact.' + error)
    );


  }

  openScan(index: number) {
    let scanData = this._historial[index];
    switch (scanData.tipo) {
      case "http":
        this.iab.create(scanData.info, "_system");
        break;
      case "mapa":
        this.modalCrl.create(MapaPage, {coords: scanData.info}).present();
        break;
      case "contacto":
        this.createContact(scanData.info);
        break;

      default:
        console.error('Tipo no soportado');
    }

    console.log(JSON.stringify(scanData));

  }


  private parse_vcard(input: string) {

    var Re1 = /^(version|fn|title|org):(.+)$/i;
    var Re2 = /^([^:;]+);([^:]+):(.+)$/;
    var ReKey = /item\d{1,2}\./;
    var fields = {};

    input.split(/\r\n|\r|\n/).forEach(function (line) {
      var results, key;

      if (Re1.test(line)) {
        results = line.match(Re1);
        key = results[1].toLowerCase();
        fields[key] = results[2];
      } else if (Re2.test(line)) {
        results = line.match(Re2);
        key = results[1].replace(ReKey, '').toLowerCase();

        var meta = {};
        results[2].split(';')
          .map(function (p, i) {
            var match = p.match(/([a-z]+)=(.*)/i);
            if (match) {
              return [match[1], match[2]];
            } else {
              return ["TYPE" + (i === 0 ? "" : i), p];
            }
          })
          .forEach(function (p) {
            meta[p[0]] = p[1];
          });

        if (!fields[key]) fields[key] = [];

        fields[key].push({
          meta: meta,
          value: results[3].split(';')
        })
      }
    });

    return fields;
  };

  private showToast(mensaje: string) {
    this.toastCtrl.create({
      message: mensaje,
      duration: 2500
    }).present();
  }

}
