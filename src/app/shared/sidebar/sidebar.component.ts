import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  showActiveDetail = false;
  showDetailInBotton = false;
  selectedProject: any = null;
  defaultActiveProjects = ['Issue Tracking', 'CMSP'];
  showSidebar = false;
  showBlackPanel = false;
  iconMain = [
    {
      icon: '<i class="fa-solid fa-house"></i>',
      label: 'Home',
      route: '/home',
    },
    {
      icon: '<i class="fa-regular fa-bell"></i>',
      label: 'Notifications',
      route: '/notify',
    },
    { icon: '<i class="fa-regular fa-comment-dots"></i>', label: 'Messages' },
    { icon: '<i class="fa-brands fa-patreon"></i>', label: 'Patreon' },
    { icon: '<i class="fa-solid fa-users"></i>', label: 'Community' },
    { icon: '<i class="fa-solid fa-pause"></i>', label: 'Pause' },
    { icon: '<i class="fa-regular fa-circle-question"></i>', label: 'Help' },
  ];

  iconBottom = [
    { icon: '<i class="fa-solid fa-gear"></i>', label: 'setting' },
    {
      icon: '<i class="fa-solid fa-right-from-bracket"></i>',
      label: 'Logout',
    },
  ];

  projects = [
    { name: 'My Cases', color: '#8f63e2ff' },
    { name: 'Issue Tracking', color: '#6393ecff', shape: 'circle' },
  ];

  dribble = [
    { name: 'DentalPro', color: '#bea162ff' },
    { name: 'Shopify', color: '#db8d34ff' },
    { name: 'Mobile App', color: '#434d47ff' },
  ];

  behance = [
    { name: 'DentalPro', color: '#ae4adaff' },
    { name: 'Shopify', color: '#d358d3ff' },
    { name: 'Mobile App', color: '#e031e0ff' },
    { name: 'Mobile App', color: '#6127aeff' },
  ];

  ActiveDetail = [
    { name: 'ICMS', color: '#ae4adaff' },
    { name: 'CMSP', color: 'rgb(133, 25, 133)' },
  ];

  onSelectProject(project: any) {
    if (project.name === 'Issue Tracking') {
      this.showActiveDetail = !this.showActiveDetail;
    }
    console.log(project, 'project');
    if (project.isTrusted == true) {
      this.showDetailInBotton = !this.showDetailInBotton;
    }
  }
  constructor(private router: Router) {
    this.updatePanel(this.router.url);

    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.updatePanel(e.urlAfterRedirects);
      }
    });
  }

  private updatePanel(url: string) {
    this.showBlackPanel = url.startsWith('/notify');
    console.log(
      '[Sidebar] updatePanel',
      'url =',
      url,
      'showBlackPanel =',
      this.showBlackPanel,
    );
  }
}
