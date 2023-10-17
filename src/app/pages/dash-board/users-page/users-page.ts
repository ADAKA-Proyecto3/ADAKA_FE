import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { User } from 'src/app/models/user.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import {
  addSubUser,
  loadUsers,
  removeUser,
  updateUser,
} from 'src/app/store/actions/user.actions';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../components/user-form-component/user-form-component';
import { DebugerService } from 'src/app/services/debug-service/debug.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.html',
  styleUrls: ['./users-page.scss'],
})
export class UsersPage implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private store: Store<AppState>, 
    private dialog: MatDialog) {}

  displayedColumns: string[] = [
    'id',
    'name',
    'role',
    'phone',
    'email',
    'status',
    'actions',
  ];
  dataSource = new MatTableDataSource<User>();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
    console.log('onInit');
  }

  ngAfterViewInit(): void {
    this.store.select('users').subscribe(({ users, status }) => {
      this.dataSource.data = users;
      console.log('aterview INIT');
    });

    this.dataSource.paginator = this.paginator;
  }

  //CRUD
  registerUser(user: User) {
    this.store.dispatch(addSubUser({ content: user }));
  }

  editUser(id: number, user: User) {
    this.store.dispatch(updateUser({ id: id, content: user }));
  }

  deleteUser(user: User) {
    const userId = user.id!;
    this.store.dispatch(removeUser({ id: userId }));
  }

  deactivateUserUser(user: User) {
    this.store.dispatch(
      updateUser({
        id: user.id!,
        content: {
          ...user,
          status: 'INACTIVE',
        },
      })
    );
  }

  // Dialog | Modal Control
  openUserEditDialog(user: User): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '60%',
      data: user,
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && result.id) {
        this.editUser(result.id, result.user);
      }
    });
  }

  openUserRegisterDialog(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '60%',
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      DebugerService.log('USER REGISTRATION DIALOG CLOSED');
      console.log(result);
      if (result && result.user) {
        this.registerUser(result.user);
      }
    });
  }
}
