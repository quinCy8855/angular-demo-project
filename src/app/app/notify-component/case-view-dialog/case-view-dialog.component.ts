import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CASE_DETAIL_MOCKS } from '../../mock/case.detail';
import { CaseDetail } from '../../model.ts/case.detail.model';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-case-view-dialog',
  templateUrl: './case-view-dialog.component.html',
  styleUrls: ['./case-view-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule],
})
export class CaseViewDialogComponent implements OnInit {
  fields: { label: string; value: string }[] = [];
  title = 'Detail Case manage ment';
  caseDetail!: CaseDetail;
  affectedAccounts: string[] = [];
  selectedAccount!: string;
  isViewMode = false;
  isAdding = false;
  newActivity = {
    time: '',
    action: '',
    by: '',
  };
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    const caseNo = this.data?.row.caseNo;

    if (this.data.mode === 'EDIT') {
      this.isViewMode = true;
    }

    this.caseDetail = CASE_DETAIL_MOCKS.find(
      (c) => c.caseNo === caseNo,
    ) as CaseDetail;
    this.affectedAccounts = this.caseDetail.impact?.affectedAccounts ?? [];
    console.log(this.caseDetail, 'this.caseDetail');
    if (this.affectedAccounts.length > 0) {
      this.selectedAccount = this.affectedAccounts[0];
    }
    console.log(this.affectedAccounts, 'affectedAccounts');
    this.fields = [
      { label: 'Priority', value: this.data?.row.priority ?? '' },
      { label: 'Case No', value: this.data?.row.caseNo ?? '' },
      { label: 'Assign to', value: this.data?.row.customerName ?? '' },
      { label: 'Status', value: this.data?.row.status ?? '' },
      { label: 'Case Created Date', value: this.data?.row.createdAt ?? '' },
      { label: 'SLA Due Date', value: this.data?.row.updatedAt ?? '' },
    ];
    console.log(this.data.row, 'data');
  }
  onAddActivity() {
    if (this.isAdding) return;

    this.isAdding = true;
    this.newActivity = {
      time: this.toDatetimeLocal(new Date()),
      action: '',
      by: '',
    };
  }

  saveActivity() {
    const { time, action, by } = this.newActivity;

    if (!action || !by) {
      alert('Please fill Action and By');
      return;
    }

    this.caseDetail.activities = this.caseDetail.activities ?? [];
    this.caseDetail.activities.push({ time, action, by });

    this.isAdding = false;
  }

  cancelActivity() {
    this.isAdding = false;
  }
  deleteActivity(index: number) {
    if (!this.caseDetail?.activities?.length) return;
    if (!confirm('Delete this activity?')) return;

    this.caseDetail.activities.splice(index, 1);
  }

  private toDatetimeLocal(d: Date): string {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
      d.getHours(),
    )}:${pad(d.getMinutes())}`;
  }
}
