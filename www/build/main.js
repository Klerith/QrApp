webpackJsonp([0],{

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mapa_mapa__ = __webpack_require__(205);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__mapa_mapa__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tabs_tabs__ = __webpack_require__(286);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_1__tabs_tabs__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(287);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__home_home__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__guardados_guardados__ = __webpack_require__(289);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__guardados_guardados__["a"]; });




//# sourceMappingURL=index.pages.js.map

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistorialService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_scan_data_model__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_mapa_mapa__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_contacts__ = __webpack_require__(208);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//plugins


var HistorialService = (function () {
    function HistorialService(iab, modalCrl, contacts, toastCtrl) {
        this.iab = iab;
        this.modalCrl = modalCrl;
        this.contacts = contacts;
        this.toastCtrl = toastCtrl;
        this._historial = [];
    }
    HistorialService.prototype.addHistory = function (text) {
        var data = new __WEBPACK_IMPORTED_MODULE_1__models_scan_data_model__["a" /* ScanData */](text);
        this._historial.unshift(data);
        this.openScan(0);
    };
    HistorialService.prototype.loadHistory = function () {
        return this._historial;
    };
    HistorialService.prototype.createContact = function (texto) {
        var _this = this;
        var campos = this.parse_vcard(texto);
        var nombre = campos['fn'];
        var tel = campos.tel[0].value[0];
        var contact = this.contacts.create();
        contact.name = new __WEBPACK_IMPORTED_MODULE_5__ionic_native_contacts__["b" /* ContactName */](null, nombre);
        contact.phoneNumbers = [new __WEBPACK_IMPORTED_MODULE_5__ionic_native_contacts__["a" /* ContactField */]('mobile', tel)];
        contact.save().then(function () { return _this.showToast('Contacto ' + nombre + 'creado'); }, function (error) { return _this.showToast('Error saving contact.' + error); });
    };
    HistorialService.prototype.openScan = function (index) {
        var scanData = this._historial[index];
        switch (scanData.tipo) {
            case "http":
                this.iab.create(scanData.info, "_system");
                break;
            case "mapa":
                this.modalCrl.create(__WEBPACK_IMPORTED_MODULE_3__pages_mapa_mapa__["a" /* MapaPage */], { coords: scanData.info }).present();
                break;
            case "contacto":
                this.createContact(scanData.info);
                break;
            default:
                console.error('Tipo no soportado');
        }
        console.log(JSON.stringify(scanData));
    };
    HistorialService.prototype.parse_vcard = function (input) {
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
            }
            else if (Re2.test(line)) {
                results = line.match(Re2);
                key = results[1].replace(ReKey, '').toLowerCase();
                var meta = {};
                results[2].split(';')
                    .map(function (p, i) {
                    var match = p.match(/([a-z]+)=(.*)/i);
                    if (match) {
                        return [match[1], match[2]];
                    }
                    else {
                        return ["TYPE" + (i === 0 ? "" : i), p];
                    }
                })
                    .forEach(function (p) {
                    meta[p[0]] = p[1];
                });
                if (!fields[key])
                    fields[key] = [];
                fields[key].push({
                    meta: meta,
                    value: results[3].split(';')
                });
            }
        });
        return fields;
    };
    ;
    HistorialService.prototype.showToast = function (mensaje) {
        this.toastCtrl.create({
            message: mensaje,
            duration: 2500
        }).present();
    };
    return HistorialService;
}());
HistorialService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__["a" /* InAppBrowser */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__["a" /* InAppBrowser */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* ModalController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__ionic_native_contacts__["c" /* Contacts */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__ionic_native_contacts__["c" /* Contacts */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* ToastController */]) === "function" && _d || Object])
], HistorialService);

var _a, _b, _c, _d;
//# sourceMappingURL=historial.js.map

/***/ }),

/***/ 121:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 121;

/***/ }),

/***/ 162:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 162;

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MapaPage = (function () {
    function MapaPage(navParams, viewCtrl) {
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.lat = 13.3536924;
        this.lng = -88.9533563;
        var coordsArray = this.navParams.get("coords").split(",");
        this.lat = Number(coordsArray[0].replace("geo:", ""));
        this.lng = Number(coordsArray[1]);
        console.log(this.navParams.get("coords"));
    }
    MapaPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    return MapaPage;
}());
MapaPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-mapa',template:/*ion-inline-start:"/Users/zerocool/Documents/ProjectIonic/QrApp/src/pages/mapa/mapa.html"*/'\n\n\n<ion-content >\n  <agm-map [latitude]="lat" [longitude]="lng" [zoom]="14">\n    <agm-marker [latitude]="lat" [longitude]="lng"></agm-marker>\n  </agm-map>\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar color="primary">\n    <ion-buttons end>\n      <button ion-button\n              (click)="closeModal()">Cerrar</button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/Users/zerocool/Documents/ProjectIonic/QrApp/src/pages/mapa/mapa.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ViewController */]])
], MapaPage);

//# sourceMappingURL=mapa.js.map

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(236);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_index_pages__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_barcode_scanner__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__agm_core__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_historial_historial__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_in_app_browser__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_contacts__ = __webpack_require__(208);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







/**
 * Plugins
 */


/**  .end inject plugins */
/**
 * inject Providers
 */



/** .end providers **/
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_6__pages_index_pages__["b" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_index_pages__["a" /* GuardadosPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_index_pages__["c" /* MapaPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_index_pages__["d" /* TabsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */]),
            __WEBPACK_IMPORTED_MODULE_8__agm_core__["a" /* AgmCoreModule */].forRoot({
                apiKey: 'AIzaSyB5GxJV-H8GgI7xxXrurzAN4ny7nhFd9zk'
            }),
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_6__pages_index_pages__["b" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_index_pages__["a" /* GuardadosPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_index_pages__["c" /* MapaPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_index_pages__["d" /* TabsPage */],
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_9__providers_historial_historial__["a" /* HistorialService */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_contacts__["c" /* Contacts */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_index_pages__ = __webpack_require__(102);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_index_pages__["d" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/zerocool/Documents/ProjectIonic/QrApp/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/zerocool/Documents/ProjectIonic/QrApp/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_pages__ = __webpack_require__(102);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TabsPage = (function () {
    function TabsPage() {
        this.tab1 = __WEBPACK_IMPORTED_MODULE_1__index_pages__["b" /* HomePage */];
        this.tab2 = __WEBPACK_IMPORTED_MODULE_1__index_pages__["a" /* GuardadosPage */];
    }
    return TabsPage;
}());
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-tabs',template:/*ion-inline-start:"/Users/zerocool/Documents/ProjectIonic/QrApp/src/pages/tabs/tabs.html"*/'\n\n<ion-tabs color="primary">\n\n  <ion-tab tabTitle="Scan" tabIcon="qr-scanner" [root]="tab1"></ion-tab>\n  <ion-tab tabTitle="Historial" tabIcon="list" [root]="tab2"></ion-tab>\n\n\n</ion-tabs>\n'/*ion-inline-end:"/Users/zerocool/Documents/ProjectIonic/QrApp/src/pages/tabs/tabs.html"*/,
    }),
    __metadata("design:paramtypes", [])
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_barcode_scanner__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_historial_historial__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//plugins

//componentes

//service

var HomePage = (function () {
    function HomePage(toastCtrl, barcodeScanner, platform, _historialService) {
        this.toastCtrl = toastCtrl;
        this.barcodeScanner = barcodeScanner;
        this.platform = platform;
        this._historialService = _historialService;
    }
    HomePage.prototype.scan = function () {
        var _this = this;
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
        this.barcodeScanner.scan().then(function (barcodeData) {
            if (barcodeData.text != null && barcodeData.cancelled == false) {
                _this._historialService.addHistory(barcodeData.text);
            }
        }, function (err) {
            _this.showError('Error: ' + err);
        });
    };
    HomePage.prototype.showError = function (mensaje) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            duration: 2500
        });
        toast.present();
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/zerocool/Documents/ProjectIonic/QrApp/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n      QrApp\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n <button ion-button\n         block\n         (click)="scan()">Realizar Scan</button>\n</ion-content>\n'/*ion-inline-end:"/Users/zerocool/Documents/ProjectIonic/QrApp/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* Platform */], __WEBPACK_IMPORTED_MODULE_3__providers_historial_historial__["a" /* HistorialService */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScanData; });
var ScanData = (function () {
    function ScanData(text) {
        this.tipo = 'No definido'; //tipoArchivo;
        this.info = text;
        if (text.startsWith("http")) {
            this.tipo = 'http';
        }
        else if (text.startsWith("geo")) {
            this.tipo = "mapa";
        }
        else if (text.startsWith("BEGIN:VCARD")) {
            this.tipo = 'contacto';
        }
    }
    return ScanData;
}());

//# sourceMappingURL=scan-data.model.js.map

/***/ }),

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GuardadosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_historial_historial__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GuardadosPage = (function () {
    function GuardadosPage(_historialService) {
        this._historialService = _historialService;
        this.historial = [];
    }
    GuardadosPage.prototype.ionViewDidLoad = function () {
        this.historial = this._historialService.loadHistory();
    };
    GuardadosPage.prototype.openScanHistory = function (index) {
        this._historialService.openScan(index);
    };
    return GuardadosPage;
}());
GuardadosPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-guardados',template:/*ion-inline-start:"/Users/zerocool/Documents/ProjectIonic/QrApp/src/pages/guardados/guardados.html"*/'<!--\n  Generated template for the GuardadosPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Historial</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n<ion-list>\n  <button ion-item *ngFor="let data of historial; let i = index"\n          (click)="openScanHistory(i)">{{data.info}}\n  <p>{{data.tipo}}</p></button>\n</ion-list>\n</ion-content>\n\n'/*ion-inline-end:"/Users/zerocool/Documents/ProjectIonic/QrApp/src/pages/guardados/guardados.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_historial_historial__["a" /* HistorialService */]])
], GuardadosPage);

//# sourceMappingURL=guardados.js.map

/***/ })

},[217]);
//# sourceMappingURL=main.js.map