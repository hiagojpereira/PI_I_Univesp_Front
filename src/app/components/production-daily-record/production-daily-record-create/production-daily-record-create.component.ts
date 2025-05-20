import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductionDailyRecordService } from '../../../services/production-daily-record.service';
import { CommonService } from '../../../services/common.service';
import { Employee } from '../../../models/employee.model';
import { MatSelectModule } from '@angular/material/select';
import { EmployeeService } from '../../../services/employee.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Pasta } from '../../../models/pasta.model';
import { PastaService } from '../../../services/pasta.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { StuffingService } from '../../../services/stuffing.service';
import { Stuffing } from '../../../models/stuffing.model';
import { ProductionDailyRecordDetail } from '../../../models/production-daily-record.model';
import { MatDateFnsModule } from '@angular/material-date-fns-adapter';
import { DateFnsAdapter } from '@angular/material-date-fns-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { ptBR } from 'date-fns/locale';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'dd/MM/yyyy',
  },
  display: {
    dateInput: 'dd/MM/yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'dd/MM/yyyy',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

@Component({
  selector: 'app-production-daily-record-create',
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
    MatTableModule,
    MatDateFnsModule
  ],
  templateUrl: './production-daily-record-create.component.html',
  styleUrl: './production-daily-record-create.component.css',
  providers: [
    { provide: DateAdapter, useClass: DateFnsAdapter },
    { provide: MAT_DATE_LOCALE, useValue: ptBR },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export class ProductionDailyRecordCreateComponent {
  
  record: ProductionDailyRecordDetail = {
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
    private commonService: CommonService,
    private recordService: ProductionDailyRecordService,
    private employeeService: EmployeeService,
    private pastaService: PastaService,
    private stuffingService: StuffingService,
    
  ) { }

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
                this.isLoading = false;
                this.stuffing_list = stuffings;
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
    debugger
    let obj = {
      finished_pasta_id: this.selectedFinishedPasta,
      quantity: this.finished_pasta_quantity,
      waste: this.finished_pasta_waste!! ? this.finished_pasta_waste.replace(',', '.') : 0
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
      discard: this.cooked_pasta_discard!! ? this.cooked_pasta_discard.replace(',', '.') : 0
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
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getUTCDate()}`
  }

  changeDecimalRepresentation(value: string) {
    return value.replace('.', ',')
  }

  createRecord(): void {
    this.record.date = this.formatDate(this.record.date)
    this.isLoading = true;
    
    this.recordService.create(this.record).subscribe({
      next: () => {
        this.isLoading = false;
        this.commonService.showMessage('Registro criado com sucesso!')
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
    const char = event.key;
    const input = event.target as HTMLInputElement;

    const allowedChars = /[0-9,]/;
    if (!allowedChars.test(char)) {
      event.preventDefault();
      return;
    }

    if (char === ',' && input.value.includes(',')) {
      event.preventDefault();
      return;
    }

    const valorAtual = input.value;
    if (valorAtual.includes(',')) {
      const [parteInteira, parteDecimal] = valorAtual.split(',');

      const cursorAfterComma = input.selectionStart! > valorAtual.indexOf(',');
      if (parteDecimal?.length >= 3 && cursorAfterComma) {
        event.preventDefault();
      }
    }
  }

  preventInvalidKeys(event: KeyboardEvent) {
    if (['e', 'E', '+', '-', ',', '.'].includes(event.key)) {
      event.preventDefault();
    }
  }

}