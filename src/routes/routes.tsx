import { LucideIcon, User } from "lucide-react";
import Profile from "./profile";

interface RouteComponent {
    path: string;
    icon?: LucideIcon;
    type: 'public' | 'private';
    element: JSX.Element;
    parent?: RouteComposite;
    display(): void;
    detach(): void;
    add(route: RouteComponent): void;
    delete(route: RouteComponent): void;
}

class RouteComposite implements RouteComponent {
    path: string;
    icon?: LucideIcon;
    type: 'public' | 'private';
    element: JSX.Element;
    parent?: RouteComposite;
    children: RouteComponent[] = [];

    constructor(path: string, icon: LucideIcon | undefined, type: 'public' | 'private', element: JSX.Element) {
        this.path = path;
        this.icon = icon ?? undefined;
        this.type = type;
        this.element = element;
        this.children = [];
    }

    display(): void {
        const composite = `/${this.path}`
        const parent = `/${this.parent?.path ?? ''}`
        const children = this.children.map(child => `/${child.path}`).join('')
        
        console.log(`${parent}${composite}${children}`)
    }

    add(route: RouteComponent): void {
        route.detach()
        route.parent = this
        this.children.push(route)
    }

    delete(route: RouteComponent): void {
        const index = this.children.indexOf(route)

        if (index !== -1) return
        this.children.splice(index, 1)
    }

    detach(): void {
        if (!this.parent) return
        this.parent.delete(this)
        this.parent = undefined
    }
}

class RouteLeaf implements RouteComponent {
    path: string;
    icon?: LucideIcon;
    type: 'public' | 'private';
    element: JSX.Element;
    parent?: RouteComposite;

    constructor(path: string, icon: LucideIcon | undefined, type: 'public' | 'private', element: JSX.Element) {
        this.path = path;
        this.icon = icon ?? undefined;
        this.type = type;
        this.element = element;
    }

    display(): void {
        const composite = `/${this.path}`
        const parent = `/${this.parent?.path ?? ''}`
        
        console.log(`${parent}${composite}`)
    }

    add(route: RouteComponent): void {
        throw new Error(`Cannot add ${route.path} to a leaf node.`)
    }

    delete(route: RouteComponent): void {
        throw new Error(`Cannot delete ${route.path} to a leaf node.`)
    }

    detach(): void {
        if (!this.parent) return
        this.parent.delete(this)
    }
}

const root = new RouteComposite('', undefined, 'public', <Profile />)
const students = new RouteComposite('students', User, 'public', <Profile />)
const teachers = new RouteComposite('teachers', User, 'public', <Profile />)

root.add(students)
root.add(teachers)

students.add(new RouteLeaf('create', undefined, 'public', <Profile />))