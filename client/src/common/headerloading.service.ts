import { Injectable } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Injectable()
export class HeaderLoading {
  public constructor(
    private slimLoadingBarService: SlimLoadingBarService
  ) {

    this.slimLoadingBarService.interval = 1000;
  }
  start() {
    console.log("herre")
    this.slimLoadingBarService.start(() => {
      console.log('Loading complete');
    });
  }
  stop() {
    this.slimLoadingBarService.stop();
  }

  completeLoading() {
    this.slimLoadingBarService.complete();
  }
}
