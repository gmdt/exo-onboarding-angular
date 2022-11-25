import { Pipe, PipeTransform } from "@angular/core";
import { FEMALE_FR, MALE, MALE_FR } from "../constant";

@Pipe({
  name: "gender",
})
export class GenderPipe implements PipeTransform {
  transform(value: string): unknown {
    return value === MALE ? MALE_FR : FEMALE_FR;
  }
}
