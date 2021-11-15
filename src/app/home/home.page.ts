/* eslint-disable @typescript-eslint/dot-notation */
import { Component } from '@angular/core';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  scanner: any;
  content: HTMLElement;

  resultado = '';

  constructor(private qrScanner: QRScanner, public alertController: AlertController) {}

  lerQRCode() {
  // Optionally request the permission early
this.qrScanner.prepare()
.then((status: QRScannerStatus) => {
   if (status.authorized) {
     // camera permission was granted
    this.content = document.getElementsByTagName('ion-content')[0];

    this.content.style.opacity = '0';

     // start scanning
     this.scanner = this.qrScanner.scan().subscribe((text: string) => {
       console.log('Scanned something', text);

       this.resultado = (text['result']) ? text['result'] : text;

       this.exibirAlerta(this.resultado);

       this.content.style.opacity = '1';

       this.qrScanner.hide(); // hide camera preview
       this.scanner.unsubscribe(); // stop scanning
     });

   } else if (status.denied) {
     // camera permission was permanently denied
     // you must use QRScanner.openSettings() method to guide the user to the settings page
     // then they can grant the permission from there
     alert('NÃO É PARA NEGAR, BURRO !!!');
   } else {
     // permission was denied, but not permanently. You can ask for permission again at a later time.
     alert('NÃO É PARA NEGAR. tente outra vez !!!');
   }
  })
  .catch((e: any) => console.log('Error is', e));
  }

  async exibirAlerta(mensagem: string) {
    const alert = await this.alertController.create({
      header: 'QrScanner',
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();
  }
 }
