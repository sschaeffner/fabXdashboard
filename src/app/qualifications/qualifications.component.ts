import {Component, OnInit, ViewChild} from '@angular/core';
import {Qualification} from "../shared/models/qualification.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {QualificationService} from "../services/qualification.service";

@Component({
  selector: 'app-qualifications',
  templateUrl: './qualifications.component.html',
  styleUrls: ['./qualifications.component.scss']
})
export class QualificationsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'orderNr', 'name', 'description'];

  qualifications: Qualification[] = [];
  dataSource: MatTableDataSource<Qualification> = new MatTableDataSource<Qualification>();

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private qualificationService: QualificationService) { }

  ngOnInit() {
    this.getQualifications();
  }

  public getQualifications() {
    this.qualificationService.getAllQualifications().subscribe(qualifications => {
      this.qualifications = qualifications;

      this.dataSource = new MatTableDataSource<Qualification>(this.qualifications);
    })
  }
}
