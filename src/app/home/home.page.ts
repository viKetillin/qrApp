import { Component } from '@angular/core';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  scanner: any;
  content: HTMLElement;
  resultado = '';

  constructor(private qrScanner: QRScanner) {}

  lerQRCode() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          this.content = document.getElementsByTagName('ion-content')[0];
          this.content.style.opacity = '0';

          // start scanning
          this.scanner = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned', text);

            this.content.style.opacity = '1';

            this.qrScanner.hide(); // hide camera preview
            this.scanner.unsubscribe(); // stop scanning
          });
        } else if (status.denied) {
          alert('negado');
        } else {
          alert('negado, tente novamente');
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }
}
