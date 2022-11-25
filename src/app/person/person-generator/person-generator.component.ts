import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FEMALE, MALE } from "../../share/constant";
import { GenerationConfig } from "../generation-config";

@Component({
  selector: "app-person-generator",
  templateUrl: "./person-generator.component.html",
  styleUrls: ["./person-generator.component.scss"],
})
export class PersonGeneratorComponent implements OnInit {
  generator: FormGroup;

  @Output()
  private generateRequest = new EventEmitter<GenerationConfig>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.generator = this.formBuilder.group({
      count: [1000],
      male: [MALE],
      female: [FEMALE],
    });
  }

  generate() {
    const value: GenerationConfig = this.generator.value;
    const female = value.female ? FEMALE : MALE;
    const male = value.male ? MALE : FEMALE;
    if (this.generator.valid)
      this.generateRequest.emit({ ...value, female, male });
  }
}
