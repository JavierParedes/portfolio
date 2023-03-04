import { ModuleWithProviders } from '@angular/core';
import { Routes,RouterModule} from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DetailuserComponent } from './components/detailuser/detailuser.component';
import { EdituserComponent } from './components/edituser/edituser.component';
import { UsersComponent } from './components/users/users.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { LegalComponent } from './components/legal/legal.component';
import { CookieService } from 'ngx-cookie-service';
import { CookiesComponent } from './components/cookies/cookies.component';
import { PrivacityComponent } from './components/privacity/privacity.component';


const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'inicio', component: HomeComponent},
    {path: 'sobre-mi', component: AboutComponent},
    {path: 'proyectos', component: ProjectsComponent},
    {path: 'crear-proyecto', component: CreateComponent},
    {path: 'contacto', component: ContactComponent},
    {path: 'proyecto/:id', component: DetailComponent},
    {path: 'editar-proyecto/:id', component: EditComponent},
    {path: 'registrar', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'usuario/:id', component: DetailuserComponent},
    {path: 'editar-usuario/:id', component: EdituserComponent},
    {path: 'usuarios', component: UsersComponent},
    {path: 'administrador', component: AdministratorComponent},
    {path: 'aviso-legal', component: LegalComponent},
    {path: 'politicas-cookies', component: CookiesComponent},
    {path: 'politicas-privacidad', component: PrivacityComponent},
    {path: 'home', component: HomeComponent},
    {path: '**', component: ErrorComponent}
]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);

