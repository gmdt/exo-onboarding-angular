import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Spectator } from "@ngneat/spectator";
import { createComponentFactory } from "@ngneat/spectator/jest";
import { of } from "rxjs";
import { MALE, FEMALE } from "../../share/constant";
import { Person } from "../person";
import { PersonGeneratorComponent } from "../person-generator/person-generator.component";
import { PersonService } from "../person.service";
import { PersonListComponent } from "./person-list.component";
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

describe("PersonListComponent", () => {
  let service: any;
  let spectator: Spectator<PersonListComponent>;
  const createComponent = createComponentFactory({
    component: PersonListComponent,
    declarations: [PersonListComponent, PersonGeneratorComponent],
    imports: [
      MatTableModule,
      MatCheckboxModule,
      MatInputModule,
      MatButtonModule,
      ReactiveFormsModule,
      HttpClientTestingModule,
      NoopAnimationsModule,
    ],
  });

  beforeEach(() => {
    spectator = createComponent();

    service = TestBed.inject(PersonService);
    jest.spyOn(service, "getAllPersons").mockReturnValueOnce(of(PERSONS));
  });

  test("should create", () => {
    expect(spectator.component).toBeTruthy();
  });

  test("should generate", () => {
    spectator.detectChanges();
    const generateButton = spectator.debugElement.query(By.css("button"));

    // WHEN
    generateButton.triggerEventHandler("click", new Event("click"));

    // THEN
    // expect(service.getAllPersons()).toHaveBeenCalledTimes(1);
    spectator.component.generate({
      count: 10,
      male: MALE,
      female: FEMALE,
    });
    let capturedData: Person[] = [];
    spectator.component.dataSource.subscribe((data) => (capturedData = data));
    expect(capturedData.length).toBe(3);
    expect(capturedData.map((p) => p.id)).toEqual([1, 2, 3]);
    /*
    it("should navigate to division details when current division details is clicked", () => {
      const spy = spyOn(TestBed.inject(Router), "navigate");

      fixture.detectChanges();

      const modifyButton = fixture.debugElement.query(
        By.css(".modify-attachment-bank")
      );

      modifyButton.triggerEventHandler("click", new Event("click"));

      expect(spy).toHaveBeenCalledWith([
        "/",
        PAGE_URL.SIGN_UP,
        PAGE_URL.SIGN_UP_DIVISION_DETAILS,
      ]);
    });*/
  });
});
