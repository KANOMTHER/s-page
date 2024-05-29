import { LucideIcon } from 'lucide-react';

export interface RouteComponent {
  path: string;
  icon?: LucideIcon;
  type: 'public' | 'private';
  element: JSX.Element;
  parent?: RouteComposite;
  display(): void;
  detach(): void;
  getNode(): RouteComponent;
}

export interface IRouteComposite extends RouteComponent {
  children: RouteComponent[];
  add(route: RouteComponent): void;
  delete(route: RouteComponent): void;
}

export class RouteComposite implements IRouteComposite {
  path: string;
  icon?: LucideIcon;
  type: 'public' | 'private';
  element: JSX.Element;
  parent?: RouteComposite;
  children: RouteComponent[] = [];

  constructor(
    path: string,
    icon: LucideIcon | undefined,
    type: 'public' | 'private',
    element: JSX.Element,
  ) {
    this.path = path;
    this.icon = icon ?? undefined;
    this.type = type;
    this.element = element;
    this.children = [];
  }

  display(): void {
    const composite = `/${this.path}`;
    const parent = `/${this.parent?.path ?? ''}`;
    const children = this.children.map((child) => `/${child.path}`).join('');

    console.log(`${parent}${composite}${children}`);
  }

  add(route: RouteComponent): void {
    route.detach();
    route.parent = this;
    this.children.push(route);
  }

  delete(route: RouteComponent): void {
    const index = this.children.indexOf(route);

    if (index !== -1) return;
    this.children.splice(index, 1);
  }

  detach(): void {
    if (!this.parent) return;
    this.parent.delete(this);
    this.parent = undefined;
  }

  getNode(): RouteComposite {
    return this;
  }
}

export class RouteLeaf implements RouteComponent {
  path: string;
  icon?: LucideIcon;
  type: 'public' | 'private';
  element: JSX.Element;
  parent?: RouteComposite;

  constructor(
    path: string,
    icon: LucideIcon | undefined,
    type: 'public' | 'private',
    element: JSX.Element,
  ) {
    this.path = path;
    this.icon = icon ?? undefined;
    this.type = type;
    this.element = element;
  }

  display(): void {
    const composite = `/${this.path}`;
    const parent = `/${this.parent?.path ?? ''}`;

    console.log(`${parent}${composite}`);
  }

  detach(): void {
    if (!this.parent) return;
    this.parent.delete(this);
  }

  getNode(): RouteComponent {
    return this;
  }
}
