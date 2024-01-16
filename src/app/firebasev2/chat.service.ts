import { Injectable } from '@angular/core';
//import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { BehaviorSubject, Observable, map } from 'rxjs';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { Database, set, ref, update } from '@angular/fire/database';
// import firebase from 'firebase/compat/app';//--
//AUTHSERVICE
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })

export class ChatService {

    itemsRef: AngularFireList<any>;
    items: Observable<any[]>;
    msg:string;

    constructor(
        private router: Router,
        public db: AngularFireDatabase,
        ) {

        }
}