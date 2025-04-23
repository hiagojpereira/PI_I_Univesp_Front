import { Routes } from '@angular/router';
import { EmployeeCreateComponent } from './components/employee/employee-create/employee-create.component';
import { EmployeeReadComponent } from './components/employee/employee-read/employee-read.component';
import { EmployeeUpdateComponent } from './components/employee/employee-update/employee-update.component';
import { HomeComponent } from './views/home/home.component';
import { PositionCreateComponent } from './components/position/position-create/position-create.component';
import { PositionReadComponent } from './components/position/position-read/position-read.component';
import { PositionUpdateComponent } from './components/position/position-update/position-update.component';
import { PastaCreateComponent } from './components/pasta/pasta-create/pasta-create.component';
import { PastaReadComponent } from './components/pasta/pasta-read/pasta-read.component';
import { PastaUpdateComponent } from './components/pasta/pasta-update/pasta-update.component';
import { StuffingCreateComponent } from './components/stuffing/stuffing-create/stuffing-create.component';
import { StuffingReadComponent } from './components/stuffing/stuffing-read/stuffing-read.component';
import { StuffingUpdateComponent } from './components/stuffing/stuffing-update/stuffing-update.component';
import { EmployeeCrudComponent } from './views/employee-crud/employee-crud.component';
import { PastaCrudComponent } from './views/pasta-crud/pasta-crud.component';
import { StuffingCrudComponent } from './views/stuffing-crud/stuffing-crud.component';
import { PositionCrudComponent } from './views/position-crud/position-crud.component';
import { ProductionDailyRecordReadComponent } from './components/production-daily-record/production-daily-record-read/production-daily-record-read.component';
import { ProductionDailyRecordCrudComponent } from './views/production-daily-record-crud/production-daily-record-crud.component';
import { ProductionDailyRecordUpdateComponent } from './components/production-daily-record/production-daily-record-update/production-daily-record-update.component';
import { ProductionDailyRecordCreateComponent } from './components/production-daily-record/production-daily-record-create/production-daily-record-create.component';
import { ProductionDailyRecordDetailComponent } from './components/production-daily-record/production-daily-record-detail/production-daily-record-detail.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "position",
        component: PositionCrudComponent
    },
    {
        path: "position/create",
        component: PositionCreateComponent
    },
    {
        path: "position/read",
        component: PositionReadComponent
    },
    {
        path: "position/update/:idPosition",
        component: PositionUpdateComponent
    },
    {
        path: "employee",
        component: EmployeeCrudComponent
    },
    {
        path: "employee/create",
        component: EmployeeCreateComponent
    },
    {
        path: "employee/read",
        component: EmployeeReadComponent
    },
    {
        path: "employee/update/:idEmployee",
        component: EmployeeUpdateComponent
    },
    {
        path: "pasta",
        component: PastaCrudComponent
    },
    {
        path: "pasta/create",
        component: PastaCreateComponent
    },
    {
        path: "pasta/read",
        component: PastaReadComponent
    },
    {
        path: "pasta/update/:idPasta",
        component: PastaUpdateComponent
    },
    {
        path: "stuffing",
        component: StuffingCrudComponent
    },
    {
        path: "stuffing/create",
        component: StuffingCreateComponent
    },
    {
        path: "stuffing/read",
        component: StuffingReadComponent
    },
    {
        path: "stuffing/update/:idStuffing",
        component: StuffingUpdateComponent
    },
    {
        path: "records",
        component: ProductionDailyRecordCrudComponent
    },
    {
        path: "records/create",
        component: ProductionDailyRecordCreateComponent
    },
    {
        path: "records/read",
        component: ProductionDailyRecordReadComponent
    },
    {
        path: "records/update/:idRecord",
        component: ProductionDailyRecordUpdateComponent
    },
    {
        path: "records/detail/:idRecord",
        component: ProductionDailyRecordDetailComponent
    },
];
