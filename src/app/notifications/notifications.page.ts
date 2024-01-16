import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { IResolvedRouteData, ResolverHelper } from '../utils/resolver-helper';

import { FirebaseProfileModel } from '../firebase/auth/profile/firebase-profile.model';

import { FirebaseAuthService } from '../firebase/auth/firebase-auth.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: [
    './styles/notifications.page.scss',
    './styles/notifications.shell.scss'
  ]
})
export class NotificationsPage implements OnInit {
  // Gather all component subscription in one place. Can be one Subscription or multiple (chained using the Subscription.add() method)
  subscriptions: Subscription;

  notifications: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: FirebaseAuthService
    ) { }

  ngOnInit(): void {
    this.subscriptions = this.route.data
    .pipe(
      // Extract data for this page
      switchMap((resolvedRouteData: {source: Observable<any>}) => {
        return resolvedRouteData['data'].source;
      })
    )
    .subscribe({
      next: (pageData) => {
        this.notifications = pageData;
      },
      error: (error) => console.log(error)
    });
  }


  // NOTE: Ionic only calls ngOnDestroy if the page was popped (ex: when navigating back)
  // Since ngOnDestroy might not fire when you navigate from the current page, use ionViewWillLeave to cleanup Subscriptions
  ionViewWillLeave(): void {
    this.subscriptions.unsubscribe();
  }
}
