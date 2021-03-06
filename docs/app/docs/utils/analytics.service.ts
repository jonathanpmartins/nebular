import {Injectable} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {Location} from '@angular/common';

import {filter} from 'rxjs/operator/filter';

declare const ga: any;

@Injectable()
export class Analytics {
  private _enabled: boolean;

  constructor(private _location: Location, private _router: Router) {
    this._enabled = window.location.href.indexOf('akveo.github.io') >= 0;
  }

  trackPageViews() {
    if (this._enabled) {
      filter.call(this._router.events, (event) => event instanceof NavigationEnd)
        .subscribe(() => {
          ga('send', {hitType: 'pageview', page: this._location.path()});
        });
    }
  }
}
