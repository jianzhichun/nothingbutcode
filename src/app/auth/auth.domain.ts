import { Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

export abstract class UserService {
    public readonly currentUser: Observable<User>;
    
    constructor(protected currentUserSubject: BehaviorSubject<User>) {
        this.currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
    }
}

export interface User {
    name: string;
    permissions: string[];
}