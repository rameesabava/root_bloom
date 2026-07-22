import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Register } from './register/register';
import { Login } from './login/login';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Plants } from './plants/plants';
import { Pnf } from './pnf/pnf';
import { View } from './view/view';
import { Profile } from './profile/profile';
import { Cart } from './cart/cart';
import { Checkout } from './checkout/checkout';

export const routes: Routes = [
    // lazy load module - admin
    {
        path:"admin",loadChildren:()=>import('./admin-module/admin-module-module').then(module=>module.AdminModuleModule)
    },
    {
        path:"",component:Home,title:"Home"
    },
    {
        path:"register",component:Register,title:"Register"
    },
    {
        path:"login",component:Login,title:"Login"
    },
    {
        path:"about",component:About,title:"About"
    },
    {
        path:"contact",component:Contact,title:"Contact"
    },
    {
        path:"plants",component:Plants,title:"Plants"
    },
    {
        path:"plant/:id",component:View,title:"View-Plant"
    },
     {
        path:"profile",component:Profile,title:"My Profile"
    },
     {
        path:"cart",component:Cart,title:"My Cart"
    },
    {
        path:"checkout",component:Checkout,title:"Checkout"
    },
    {
        path:"**",component:Pnf,title:"Page Not Found"
    },
];
