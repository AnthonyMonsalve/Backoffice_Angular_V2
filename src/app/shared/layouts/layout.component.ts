import { Component, OnInit, Renderer2 } from '@angular/core';

import { User } from 'src/app/core/models/auth.models';
import { AuthenticationService } from '../../core/services/auth.service';
import { EventService } from '../../core/services/event.service';
import {
  LAYOUT_HORIZONTAL,
  LAYOUT_MODE,
  LAYOUT_POSITION,
  LAYOUT_VERTICAL,
  LAYOUT_WIDTH,
  SIDEBAR_COLOR,
  SIDEBAR_SIZE,
  TOPBAR,
} from './layouts.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})

/**
 * layout Component
 */
export class LayoutComponent implements OnInit {
  // layout related config
  layoutType!: string;
  layoutMode!: string;
  layoutwidth!: string;
  layoutposition!: string;
  topbar!: string;
  sidebarcolor!: string;
  sidebarsize!: string;
  currentUser: User | null = null;

  constructor(
    private eventService: EventService,
    private renderer: Renderer2,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.layoutMode = LAYOUT_MODE;
    // default settings
    this.layoutType = LAYOUT_HORIZONTAL;
    this.layoutwidth = LAYOUT_WIDTH;
    this.layoutposition = LAYOUT_POSITION;
    this.sidebarcolor = SIDEBAR_COLOR;
    this.sidebarsize = SIDEBAR_SIZE;
    this.topbar = TOPBAR;

    this.LayoutMode(this.layoutMode);

    // listen to event and change the layout, theme, etc
    this.eventService.subscribe('changeLayout', (layout) => {
      this.layoutType = layout;
    });

    this.eventService.subscribe('changeMode', (mode) => {
      this.layoutMode = mode;
      this.LayoutMode(this.layoutMode);
    });

    this.eventService.subscribe('changeWidth', (width) => {
      this.layoutwidth = width;
      this.LayoutWidth(this.layoutwidth);
    });

    this.eventService.subscribe('changePosition', (position) => {
      this.layoutposition = position;
      this.LayoutPosition(this.layoutposition);
    });

    this.eventService.subscribe('changeTopbar', (topbar) => {
      this.topbar = topbar;
      this.Topbar(this.topbar);
    });

    this.eventService.subscribe('changeSidebarSize', (sidebarsize) => {
      this.sidebarsize = sidebarsize;
      this.SidebarSize(this.sidebarsize);
    });

    this.eventService.subscribe('changeSidebarColor', (sidebarcolor) => {
      this.sidebarcolor = sidebarcolor;
      this.SidebarColor(this.sidebarcolor);
    });

    this.authService.currentUser.subscribe((user) => (this.currentUser = user));
  }

  /**
   * Check if the vertical layout is requested
   */
  isVerticalLayoutRequested() {
    return this.layoutType === LAYOUT_VERTICAL;
  }

  /**
   * Check if the horizontal layout is requested
   */
  isHorizontalLayoutRequested() {
    return this.layoutType === LAYOUT_HORIZONTAL;
  }

  /**
   * Layout Mode Set
   */
  LayoutMode(mode: string) {
    switch (mode) {
      case 'light':
        this.renderer.setAttribute(document.body, 'data-sidebar', 'light');
        this.renderer.setAttribute(document.body, 'data-bs-theme', 'light');
        this.renderer.setAttribute(document.body, 'data-topbar', 'light');
        break;
      case 'dark':
        this.renderer.setAttribute(document.body, 'data-sidebar', 'dark');
        this.renderer.setAttribute(document.body, 'data-bs-theme', 'dark');
        this.renderer.setAttribute(document.body, 'data-topbar', 'dark');
        break;
      default:
        this.renderer.setAttribute(document.body, 'data-bs-theme', 'light');
        this.renderer.setAttribute(document.body, 'data-topbar', 'light');
        break;
    }
  }

  /**
   * Layout Width Set
   */
  LayoutWidth(width: string) {
    switch (width) {
      case 'light':
        this.renderer.setAttribute(document.body, 'data-layout-size', 'fluid');
        break;
      case 'boxed':
        this.renderer.setAttribute(document.body, 'data-layout-size', 'boxed');
        break;
      default:
        this.renderer.setAttribute(document.body, 'data-layout-size', 'light');
        break;
    }
  }

  /**
   * Layout Position Set
   */
  LayoutPosition(position: string) {
    if (position === 'fixed') {
      this.renderer.setAttribute(
        document.body,
        'data-layout-scrollable',
        'false'
      );
    } else {
      this.renderer.setAttribute(
        document.body,
        'data-layout-scrollable',
        'true'
      );
    }
  }

  /**
   * Layout Topbar Set
   */
  Topbar(topbar: string) {
    switch (topbar) {
      case 'light':
        this.renderer.setAttribute(document.body, 'data-layout-size', 'fluid');

        document.body.setAttribute('data-topbar', 'light');
        break;
      case 'dark':
        this.renderer.setAttribute(document.body, 'data-layout-size', 'fluid');
        document.body.setAttribute('data-topbar', 'dark');
        break;
      default:
        this.renderer.setAttribute(document.body, 'data-layout-size', 'fluid');
        document.body.setAttribute('data-topbar', 'light');
        break;
    }
  }

  /**
   * Layout Sidebar Size Set
   */
  SidebarSize(size: string) {
    switch (size) {
      case 'default':
        this.renderer.setAttribute(document.body, 'data-sidebar-size', 'lg');
        break;
      case 'compact':
        this.renderer.setAttribute(document.body, 'data-sidebar-size', 'md');
        break;
      case 'small':
        this.renderer.setAttribute(document.body, 'data-sidebar-size', 'sm');
        break;
      default:
        this.renderer.setAttribute(document.body, 'data-sidebar-size', 'lg');
        break;
    }
  }

  /**
   * Layout Sidebar Color Set
   */
  SidebarColor(color: string) {
    switch (color) {
      case 'light':
        this.renderer.setAttribute(document.body, 'data-sidebar', 'light');
        break;
      case 'dark':
        this.renderer.setAttribute(document.body, 'data-sidebar', 'dark');
        break;
      case 'brand':
        this.renderer.setAttribute(document.body, 'data-sidebar', 'brand');
        break;
      default:
        this.renderer.setAttribute(document.body, 'data-sidebar', 'light');
        break;
    }
  }
}
