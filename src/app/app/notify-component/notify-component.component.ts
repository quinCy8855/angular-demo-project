import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CaseItem, CaseStatus } from '../model.ts/case.model';
import { CommonModule } from '@angular/common';
import { CASES_MOCK } from '../mock/case.mock';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CaseViewDialogComponent } from './case-view-dialog/case-view-dialog.component';
import { CaseDetail } from '../model.ts/case.detail.model';

@Component({
  selector: 'app-notify-component',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './notify-component.component.html',
  styleUrl: './notify-component.component.scss',
})
export class NotifyComponentComponent implements OnInit {
  constructor(private dialog: MatDialog) {}
  caseDetail!: CaseDetail;
  displayedColumns: string[] = [
    'priority',
    'caseNo',
    'customerName',
    'amount',
    'status',
    'updatedAt',
    'actions',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<CaseItem>(CASES_MOCK);
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(keyword: string) {
    this.dataSource.filter = keyword.trim().toLowerCase();
  }

  onView(row: CaseItem): void {
    this.dialog.open(CaseViewDialogComponent, {
      data: {
        row,
        mode: 'VIEW',
      },
      width: '1500px',
      height: '1000px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      panelClass: 'case-view-dialog-panel', // ใช้ตกแต่งเพิ่ม
    });
  }

  ngOnInit(): void {
    this.dataSource.data = CASES_MOCK;
  }

  getStatusClass(status: CaseStatus): string {
    switch (status) {
      case 'NEW':
        return 'pill-new';
      case 'PENDING':
        return 'pill-pending';
      case 'APPROVED':
        return 'pill-approved';
      case 'REJECTED':
        return 'pill-rejected';
      default:
        return '';
    }
  }

  onEdit(row: CaseItem) {
    this.dialog.open(CaseViewDialogComponent, {
      data: {
        row,
        mode: 'EDIT',
      },
      width: '1500px',
      height: '1000px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      panelClass: 'case-view-dialog-panel', // ใช้ตกแต่งเพิ่ม
    });
  }

  onDelete(row: CaseItem) {
    const ok = confirm(`Delete case ${row.caseNo}?`);
    if (!ok) return;

    const index = this.dataSource.data.findIndex(
      (item) => item.caseNo === row.caseNo,
    );

    if (index >= 0) {
      this.dataSource.data.splice(index, 1);
      this.dataSource.data = [...this.dataSource.data];
    }
  }
}
