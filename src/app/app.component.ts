import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private storageService: StorageService, private platform: Platform) {
    this.platform.ready()
      .then(() => this.initStorage())
  }

  async initStorage() {
    await this.storageService.initializeStorage();
  }
}
