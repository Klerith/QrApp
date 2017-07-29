import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import {GuardadosPage,MapaPage,TabsPage,HomePage} from '../pages/index.pages';

/**
 * Plugins
 */
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {AgmCoreModule} from "@agm/core";
/**  .end inject plugins */



/**
 * inject Providers
 */
import { HistorialService } from '../providers/historial/historial';
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {Contacts} from "@ionic-native/contacts";

/** .end providers **/

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GuardadosPage,
    MapaPage,
    TabsPage,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB5GxJV-H8GgI7xxXrurzAN4ny7nhFd9zk'
    }),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GuardadosPage,
    MapaPage,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HistorialService,
    InAppBrowser,
    Contacts
  ]
})
export class AppModule {}
