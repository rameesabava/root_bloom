import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Register } from './register/register';
import { Login } from './login/login';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Plants } from './plants/plants';
import { Pnf } from './pnf/pnf';
import { View } from './view/view';
import { Cart } from './cart/cart';
import { Checkout } from './checkout/checkout';
import { UserLayout } from './user-layout/user-layout';
import { adminGuardGuard } from './guards/admin-guard-guard';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    // lazy load module - admin
    {
        path:"admin", canActivate:[adminGuardGuard], loadChildren:()=>import('./admin-module/admin-module-module').then(module=>module.AdminModuleModule)
    },
    {
        path:"",component:UserLayout,
        children:[
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
        path:"plants", canActivate:[authGuard], component:Plants,title:"Plants"
    },
    {
        path:"plant/:id",canActivate:[authGuard],component:View,title:"View-Plant"
    },
     {
        path:"cart",canActivate:[authGuard],component:Cart,title:"My Cart"
    },
    {
        path:"checkout",canActivate:[authGuard],component:Checkout,title:"Checkout"
    },
    {
        path:"**",component:Pnf,title:"Page Not Found"
    }

        ]
    }
    
];
