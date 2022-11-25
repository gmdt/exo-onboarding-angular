import { HttpClientTestingModule } from "@angular/common/http/testing";
import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { createSpyObject, HttpMethod, SpectatorHttp } from "@ngneat/spectator";
import * as nock from "nock";

import {
  createComponentFactory,
  createHttpFactory,
  Spectator,
} from "@ngneat/spectator/jest";
import { FEMALE, MALE } from "../share/constant";
import { Person } from "./person";
import { PersonGeneratorComponent } from "./person-generator/person-generator.component";
import { PersonListComponent } from "./person-list/person-list.component";
import { PersonService } from "./person.service";
import { of } from "rxjs";

const PERSONS: Person[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "REESE",
    email: "john@reese.com",
    gender: "Male",
  },
  {
    id: 2,
    firstName: "Harold",
    lastName: "FINCH",
    email: "harold@finch.com",
    gender: "Male",
  },
  {
    id: 3,
    firstName: "Joss",
    lastName: "CARTER",
    email: "joss@carter.com",
    gender: "Female",
  },
];

const DEFAULT_CONFIG = {
  count: 3,
  male: MALE,
  female: FEMALE,
};

describe("PersonListComponent", () => {
  let service: PersonService;
  let spy: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatTableModule,
        MatCheckboxModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [PersonService],
    });
    service = TestBed.inject(PersonService);
    jest.spyOn(service, "getAllPersons").mockReturnValueOnce(of(PERSONS));
  });

  test("should create", () => {
    expect(service).toBeTruthy();
  });

  test("should provide a list of 3 persons", () => {
    let capturedValues: Person[] = [];
    service
      .getPersons(DEFAULT_CONFIG)
      .subscribe((element) => (capturedValues = element));

    expect(capturedValues?.length).toBe(DEFAULT_CONFIG.count);
    expect(service.getAllPersons).toHaveBeenCalledTimes(1);
  });

  test("should provide a list of 1 person", () => {
    let capturedValues: Person[] = [];
    const count: number = DEFAULT_CONFIG.count - 2;
    service
      .getPersons({ ...DEFAULT_CONFIG, count })
      .subscribe((element) => (capturedValues = element));

    expect(capturedValues?.length).toBe(count);
    expect(service.getAllPersons).toHaveBeenCalledTimes(1);
  });

  test("should provide a list of person male", () => {
    let capturedValues: Person[] = [];
    service
      .getPersons({
        count: 1,
        male: MALE,
      })
      .subscribe((element) => (capturedValues = element));

    expect(capturedValues?.length).toBe(1);
    expect(service.getAllPersons).toHaveBeenCalledTimes(1);
  });

  test("should provide a list of person female", () => {
    let capturedValues: Person[] = [];
    service
      .getPersons({
        count: 3,
        female: FEMALE,
      })
      .subscribe((element) => (capturedValues = element));

    expect(capturedValues?.length).toBe(1);
    expect(service.getAllPersons).toHaveBeenCalledTimes(1);
  });
});
