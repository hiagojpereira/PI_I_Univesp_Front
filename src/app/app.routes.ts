import { Routes } from '@angular/router';
import { EmployeeCreateComponent } from './components/employee/employee-create/employee-create.component';
import { EmployeeReadComponent } from './components/employee/employee-read/employee-read.component';
import { EmployeeUpdateComponent } from './components/employee/employee-update/employee-update.component';
import { EmployeeDeleteComponent } from './components/employee/employee-delete/employee-delete.component';

export const routes: Routes = [
    {
        path: "employee/create",
        component: EmployeeCreateComponent
    },
    {
        path: "",
        // path: "employee/read",
        component: EmployeeReadComponent
    },
    {
        path: "employee/update/:idEmployee",
        component: EmployeeUpdateComponent
    },
    {
        path: "employee/delete",
        component: EmployeeDeleteComponent
    },
];
