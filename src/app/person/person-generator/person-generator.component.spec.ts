import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Spectator } from "@ngneat/spectator";
import { createComponentFactory } from "@ngneat/spectator/jest";
import { FEMALE, MALE } from "../../share/constant";
import { PersonGeneratorComponent } from "./person-generator.component";

describe("PersonGeneratorComponent", () => {
  let component: PersonGeneratorComponent;
  let fixture: ComponentFixture<PersonGeneratorComponent>;
  let de: DebugElement;

  let spectator: Spectator<PersonGeneratorComponent>;
  const createComponent = createComponentFactory({
    component: PersonGeneratorComponent,
    declarations: [PersonGeneratorComponent],
    imports: [
      MatCheckboxModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      ReactiveFormsModule,
      NoopAnimationsModule,
    ],
  });

  beforeEach(() => {
    createComponent();
    fixture = TestBed.createComponent(PersonGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test("should create", () => {
    expect(component).toBeTruthy();
  });

  test("should disable button when @input value > 100", () => {
    fixture.detectChanges(); // ngOnInit Lifecycle hook is run here
    const inputElement = fixture.nativeElement.querySelector(
      `input[formControlName='count']`
    );
    const buttonElement = fixture.nativeElement.querySelector(`button`);

    inputElement.value = "1000";
    inputElement.dispatchEvent(new Event("input"));

    fixture.detectChanges();
    expect(component.generator.invalid).toBeTruthy();
    expect(buttonElement.disabled).toBeTruthy();
  });
  test("should correctly render the passed @input value", () => {
    const inputElement = fixture.nativeElement.querySelector(
      `input[formControlName='count']`
    );
    const buttonElement = fixture.nativeElement.querySelector(`button`);

    inputElement.value = "10";
    inputElement.dispatchEvent(new Event("input"));

    fixture.detectChanges();
    expect(buttonElement.disabled).toBeFalsy();
  });

  it("should render title in a h3 tag", () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("h3").textContent).toContain(
      "Critères de génération :"
    );
  });

  test("should return config value before call generate() method", () => {
    const inputElement = fixture.nativeElement.querySelector(
      `input[formControlName='count']`
    );
    const buttonElement = fixture.nativeElement.querySelector(`button`);

    inputElement.value = "10";
    inputElement.dispatchEvent(new Event("input"));

    fixture.detectChanges();
    expect(buttonElement.disabled).toBeFalsy();
    buttonElement.click();
    expect(component.generator.valid).toBeTruthy();
  });
  test("should return config value before call generate() method", () => {
    const inputElement = fixture.nativeElement.querySelector(
      `input[formControlName='count']`
    );
    const buttonElement = fixture.nativeElement.querySelector(`button`);

    inputElement.value = "1000";
    inputElement.dispatchEvent(new Event("input"));

    fixture.detectChanges();
    expect(buttonElement.disabled).toBeTruthy();
    buttonElement.click();
    expect(component.generator.valid).toBeFalsy();
  });
});
