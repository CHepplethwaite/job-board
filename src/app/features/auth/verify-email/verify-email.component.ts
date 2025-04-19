import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  loading = true;
  success = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParams['token'];
    
    if (!token) {
      this.error = 'No verification token provided';
      this.loading = false;
      return;
    }
    
    this.authService.verifyEmail(token).subscribe({
      next: () => {
        this.success = true;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.error?.message || 'Email verification failed';
        this.loading = false;
      }
    });
  }
}