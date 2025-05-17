import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

import { User } from '../../model/User';
import { UserService } from '../../services/user.service';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-landing-page',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatButtonModule
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  user: User | null = null;
  features: Feature[] = [
    {
      icon: 'assignment',
      title: 'Test Case Management',
      description: 'Create, organize, and maintain comprehensive test cases with ease.'
    },
    {
      icon: 'link',
      title: 'Requirement Traceability',
      description: 'Link requirements to test cases to ensure full coverage and compliance.'
    },
    {
      icon: 'bar_chart',
      title: 'Real-time Reporting',
      description: 'Monitor test progress and quality metrics with intuitive dashboards.'
    }
  ];

  isLargeScreen = true;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.checkScreenSize();
    this.userService.getCurrentUser().subscribe({
      next: (user) => this.user = user,
      error: () => this.user = null
    });
  }

  @HostListener('window:resize')
  checkScreenSize() {
    this.isLargeScreen = window.innerWidth > 768;
  }

  get isLoggedOut(): boolean {
    return this.user?._id ? true : false;
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }
}