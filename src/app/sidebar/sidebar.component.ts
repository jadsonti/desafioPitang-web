import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$().subscribe(status => {
      this.isLoggedIn = status; 
    });
  }

  reloadPage(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/users']);
    });
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToUsers(): void {
    this.router.navigate(['/users']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  checkLoginStatus(): void {
    this.isLoggedIn = !!localStorage.getItem('jwt');
  }

  navigateToLogout(): void {
    this.authService.logout(); 
  }

  navigateToProfile(): void {
    this.router.navigate(['/user-profile']); 
  }

  logout(): void {
    localStorage.removeItem('jwt');  
    this.isLoggedIn = false;  
    this.navigateToHome();  
  }

  navigateToHome(): void {
    this.router.navigate(['/users']);  
  }

}
