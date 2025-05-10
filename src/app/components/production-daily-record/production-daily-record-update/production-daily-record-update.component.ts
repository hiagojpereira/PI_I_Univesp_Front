import { Component } from '@angular/core';
import { Employee } from '../../../models/employee.model';
import { Pasta } from '../../../models/pasta.model';
import { Stuffing } from '../../../models/stuffing.model';
import { ProductionDailyRecordDetail } from '../../../models/production-daily-record.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';
import { PositionService } from '../../../services/position.service';
import { CommonService } from '../../../services/common.service';
import { PastaService } from '../../../services/pasta.service';
import { StuffingService } from '../../../services/stuffing.service';
import { ProductionDailyRecordService } from '../../../services/production-daily-record.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-production-daily-record-update',
  imports: [
    CommonModule, 
    HttpClientModule, 
    MatCardModule, 
    MatFormFieldModule, 
    FormsModule, 
    MatInputModule, 
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: './production-daily-record-update.component.html',
  styleUrl: './production-daily-record-update.component.css'
})
export class ProductionDailyRecordUpdateComponent {
  record: ProductionDailyRecordDetail = {
    id: '',
    author_id: '',
    production_leader_id: '',
    date: '',
    finished_pastas: [],
    in_progress_pastas: [],
    pasta_machine_usages: [],
    cooked_pastas: [],
    pasta_stuffings: []
  }

  isLoading = false;

  employee_list: Employee[] = []
  pasta_list: Pasta[] = []
  stuffing_list: Stuffing[] = []

  selectedFinishedPasta: any;
  finished_pasta_quantity: any;
  finished_pasta_waste: any;

  displayedColumnsFinished: string[] = ['Massa Acabada', 'Quantidade', 'Desperdício', 'Ações'];

  selectedInProgressPasta: any;
  selectedInProgressEmployee: any;
  in_progress_pasta_quantity: any;

  displayedColumnsInProgress: string[] = ['Colaborador', 'Massa em elaboração', 'Quantidade', 'Ações'];

  selectedMachineEmployee: any;
  machine: any;

  displayedColumnsMachine: string[] = ['Colaborador', 'Masseira', 'Ações'];

  selectedCookedEmployee: any;
  selectedCookedPasta: any;
  cooked_pasta_quantity: any;
  cooked_pasta_discard: any;

  displayedColumnsCooked: string[] = ['Colaborador', 'Massa em cozimento', 'Quantidade', 'Desperdício', 'Ações'];

  selectedStuffingEmployee: any;
  selectedStuffing: any;
  recipes: any;

  displayedColumnsStuffing: string[] = ['Colaborador', 'Recheio', 'Receitas', 'Ações'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recordService: ProductionDailyRecordService,
    private employeeService: EmployeeService,
    private pastaService: PastaService,
    private stuffingService: StuffingService,
    private commonService: CommonService
  ) {

  }

  ngOnInit(): void {
    this.isLoading = true;

    this.employeeService.read().subscribe({
      next: (emps) => {
        this.employee_list = emps;

        this.pastaService.read().subscribe({
          next: (pastas) => {
            this.pasta_list = pastas;

            this.stuffingService.read().subscribe({
              next: (stuffings) => {
                this.stuffing_list = stuffings;

                const idRecord = this.route.snapshot.paramMap.get('idRecord')

                this.recordService.readByCod(idRecord != undefined ? Number(idRecord) : 0).subscribe({
                  next: (rec) => {                    
                    this.isLoading = false;

                    this.record.id = rec.id
                    this.record.author_id = rec.author.id
                    this.record.production_leader_id = rec.production_leader.id
                    this.record.date = rec.date

                    rec.finished_pastas_read.forEach((x: { finished_pasta: any ; quantity: any; waste: any; }) => {
                        let objeto = {finished_pasta_id: x.finished_pasta.id, quantity: x.quantity, waste: x.waste}
                        this.record.finished_pastas.push(objeto)
                    })

                    rec.in_progress_pastas_read.forEach((x: { employee: any, in_progress_pasta: any; quantity: any;}) => {
                        let objeto = {employee_id: x.employee.id, in_progress_pasta_id: x.in_progress_pasta.id, quantity: x.quantity}
                        this.record.in_progress_pastas.push(objeto)
                    })
        
                    rec.pasta_machine_usages_read.forEach((x: { employee: any; machine: any;}) => {
                        let objeto = {employee_id: x.employee.id, machine: x.machine}
                        this.record.pasta_machine_usages.push(objeto)
                    })  
        
                    rec.cooked_pastas_read.forEach((x: { employee: any; pasta_cooking: any; quantity: any; discard: any; }) => {
                        let objeto =  {employee_id: x.employee.id, pasta_cooking_id: x.pasta_cooking.id, quantity: x.quantity, discard: x.discard}
                        this.record.cooked_pastas.push(objeto)
                    })   
        
                    rec.pasta_stuffings_read.forEach((x: { employee: any; stuffing: any; recipes: any;}) => {
                        let objeto = {employee_id: x.employee.id, stuffing_id: x.stuffing.id, recipes: x.recipes}
                        this.record.pasta_stuffings.push(objeto)
                    })                   
                  },
                  error: () => {
                    this.isLoading = false;
                    this.commonService.showMessage('Erro ao carregar colaboradores!', true);
                  }
                })  


              },
              error: () => {
                this.isLoading = false;
                this.commonService.showMessage('Erro ao carregar!', true);
              }    
            })

          },
          error: () => {
            this.isLoading = false;
            this.commonService.showMessage('Erro ao carregar!', true);
          }    
        })
      },
      error: () => {
        this.isLoading = false;
        this.commonService.showMessage('Erro ao carregar!', true);
      }
    }) 

   
  }

  getPastaName(pasta_id: any) {
    let pasta_name = ''
    this.pasta_list.forEach(x => { x.id == pasta_id ? pasta_name = x.name : '' }) 
    return pasta_name
  }

  getEmployeeName(employee: any) {
    let employee_name = ''
    this.employee_list.forEach(x => { x.id == employee.employee_id ? employee_name = x.name + ' - ' + x.position.name : ''}) 
    return employee_name
  }

  getStuffingName(stuffing: any) {
    let stuffing_name = ''
    this.stuffing_list.forEach(x => { x.id == stuffing.stuffing_id ? stuffing_name = x.name : ''}) 
    return stuffing_name
  }
  
  btnAddFinishedDisabled() {
    return this.selectedFinishedPasta && this.finished_pasta_quantity ? false : true; 
  }

  btnAddInProgressDisabled() {
    return this.selectedInProgressEmployee && this.selectedInProgressPasta && this.in_progress_pasta_quantity ? false : true; 
  }

  btnAddMachineDisabled() {
    return this.selectedMachineEmployee && this.machine ? false : true; 
  }

  btnAddCookedDisabled() {
    return this.selectedCookedEmployee && this.selectedCookedPasta && this.cooked_pasta_quantity ? false : true; 
  }

  btnAddStuffingDisabled() {
    return this.selectedStuffingEmployee && this.selectedStuffing && this.recipes ? false : true; 
  }


  addFinishedPasta() {   
    let obj = {
      finished_pasta: {
        id: this.selectedFinishedPasta,
        name: this.getPastaName(this.selectedFinishedPasta)
      },
      finished_pasta_id: this.selectedFinishedPasta,
      quantity: this.finished_pasta_quantity,
      waste: this.finished_pasta_waste!! ? this.finished_pasta_waste : 0
    }

    this.record.finished_pastas = [...this.record.finished_pastas, obj];

    this.selectedFinishedPasta = undefined
    this.finished_pasta_quantity = undefined
    this.finished_pasta_waste = undefined
  }

  removeFinishedPasta(obj: any) {
    const index = this.record.finished_pastas.indexOf(obj);
    if (index > -1) {
      this.record.finished_pastas.splice(index, 1);
    }

    this.record.finished_pastas = [...this.record.finished_pastas];
  }

  addInProgressPasta() {   
    let obj = {
      employee_id: this.selectedInProgressEmployee,
      in_progress_pasta_id: this.selectedInProgressPasta,
      quantity: this.in_progress_pasta_quantity
    }

    this.record.in_progress_pastas = [...this.record.in_progress_pastas, obj];
    
    this.selectedInProgressEmployee = undefined
    this.selectedInProgressPasta = undefined
    this.in_progress_pasta_quantity = undefined

  }

  removeInProgressPasta(obj: any) {
    const index = this.record.in_progress_pastas.indexOf(obj);
    if (index > -1) {
      this.record.in_progress_pastas.splice(index, 1);
    }

    this.record.in_progress_pastas = [...this.record.in_progress_pastas];
  }

  addMachine() {       
    let obj = {
      employee_id: this.selectedMachineEmployee,
      machine: this.machine
    }

    this.record.pasta_machine_usages = [...this.record.pasta_machine_usages, obj];
    
    this.selectedMachineEmployee = undefined
    this.machine = undefined

    console.log(this.record.pasta_machine_usages)
  }

  removeMachine(obj: any) {
    const index = this.record.pasta_machine_usages.indexOf(obj);
    if (index > -1) {
      this.record.pasta_machine_usages.splice(index, 1);
    }

    this.record.pasta_machine_usages = [...this.record.pasta_machine_usages];
  }

  addCookedPasta() {
    let obj = {
      employee_id: this.selectedCookedEmployee,
      pasta_cooking_id: this.selectedCookedPasta,
      quantity: this.cooked_pasta_quantity,
      discard: this.cooked_pasta_discard!! ? this.cooked_pasta_discard : 0
    }

    this.record.cooked_pastas = [...this.record.cooked_pastas, obj];
    
    this.selectedCookedEmployee = undefined
    this.selectedCookedPasta = undefined
    this.cooked_pasta_quantity = undefined
    this.cooked_pasta_discard = undefined
  }

  removeCookedPasta(obj: any) {
    const index = this.record.cooked_pastas.indexOf(obj);
    if (index > -1) {
      this.record.cooked_pastas.splice(index, 1);
    }

    this.record.cooked_pastas = [...this.record.cooked_pastas];
  }

  addStuffing() {
    let obj = {
      employee_id: this.selectedStuffingEmployee,
      stuffing_id: this.selectedStuffing,
      recipes: this.recipes,
    }
    
    this.record.pasta_stuffings = [...this.record.pasta_stuffings, obj];
    
    this.selectedStuffingEmployee = undefined
    this.selectedStuffing = undefined
    this.recipes = undefined

  }

  removeStuffing(obj: any) {
    const index = this.record.pasta_stuffings.indexOf(obj);
    if (index > -1) {
      this.record.pasta_stuffings.splice(index, 1);
    }

    this.record.pasta_stuffings = [...this.record.pasta_stuffings];
  }

  formatDate(date: Date) {
    if (typeof(date) == 'string')
      return date
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getUTCDate()}`
  }

  updateRecord(): void {
    this.record.date = this.formatDate(this.record.date)
    this.isLoading = true;
    this.recordService.update(this.record).subscribe({
      next: () => {
        this.isLoading = false;
        this.commonService.showMessage('Registro atualizado com sucesso!')
        this.router.navigate(['/records'])
      },
      error: () => {
        this.isLoading = false;
        this.commonService.showMessage('Erro ao criar!', true);
      }
    })
  }

  cancel(): void {
    this.router.navigate(['/records'])
  }

  onlyNumber(event: KeyboardEvent) {
    const charCode = event.key;
    if (!/^[0-9]$/.test(charCode)) {
      event.preventDefault();
    }
  }

  preventInvalidKeys(event: KeyboardEvent) {
    if (['e', 'E', '+', '-', ',', '.'].includes(event.key)) {
      event.preventDefault();
    }
  }
}
