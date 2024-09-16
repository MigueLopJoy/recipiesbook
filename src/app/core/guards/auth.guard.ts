import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";
import { User } from "@angular/fire/auth";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {
        return this.authService.authenticate().pipe(
            map((user: User | null) => {
                if (user) return true;
                
                this.router.navigate(['/auth']);
                return false;
            })
        );
    }
}