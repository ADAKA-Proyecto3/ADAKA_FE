import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {MatPaginator} from "@angular/material/paginator";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.state";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MedicalCenter} from "../../../models/medical-center.interface";
import {addMedicalCenter, loadMedicalCenter, removeMedicalCenter, updateMedicalCenter} from "../../../store/actions/medicalCenter.actions";
import {MedicalCenterFormComponent} from "../components/medicalCenter-form-component/medicalCenter-form-component";
import {DebugerService} from "../../../services/debug-service/debug.service";

@Component({
  selector: 'app-medicalCenter-page',
  templateUrl: './medicalCenters-page.html',
  styleUrls: ['./medicalCenters-page.scss'],
})
export class MedicalCentersPage implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog
    ) {}

  displayedColumns: string[] = [
    'name',
    'email',
    'status',
    'direction',
    'latitude',
    'longitude',
    'actions',
  ];
  dataSource = new MatTableDataSource<MedicalCenter>();
  idAdmin: number = 1;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.store.dispatch(loadMedicalCenter({id: this.idAdmin}));
  }

  ngAfterViewInit(): void {
    this.store.select('medicalCenters').subscribe(({ medicalCenters }) => {
      console.log(medicalCenters)
      this.dataSource.data = medicalCenters;
    });
    this.dataSource.paginator = this.paginator;
  }

  //CRUD
  registerMedicalCenter(id: number,medicalCenter: MedicalCenter) {
    this.store.dispatch(addMedicalCenter({ id: id,content: medicalCenter }));
  }

  editMedicalCenter(id: number, medicalCenter: MedicalCenter) {
    this.store.dispatch(updateMedicalCenter({ id: id, content: medicalCenter }));
  }

  deleteMedicalCenter(medicalCenter: MedicalCenter) {
    const medicalId = medicalCenter.id!;
    this.store.dispatch(removeMedicalCenter({ id: medicalId }));
  }

  deactivateMedicalCenter(medicalCenter: MedicalCenter) {
    this.store.dispatch(
      updateMedicalCenter({
        id: medicalCenter.id!,
        content: {
          ...medicalCenter,
          status: 'INACTIVE',
        },
      })
    );
  }

  // Dialog | Modal Control
  openMedicalCenterEditDialog(medicalCenter: MedicalCenter): void {
    console.log("Entrro");
    const dialogRef = this.dialog.open(MedicalCenterFormComponent, {
      width: '60%',
      data: medicalCenter,
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && result.id) {
        this.editMedicalCenter(result.id, result.medicalCenter);
      }
    });
  }

  openMedicalCenterRegisterDialog(): void {
    const dialogRef = this.dialog.open(MedicalCenterFormComponent, {
      width: '60%',
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      DebugerService.log('MEDICAL CENTER REGISTRATION DIALOG CLOSED');
      console.log(result);
      if (result && result.medicalCenter) {
        this.registerMedicalCenter(this.idAdmin,result.medicalCenter);
      }
    });
  }
}
