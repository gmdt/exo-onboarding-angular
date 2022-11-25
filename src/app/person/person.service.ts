import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, take } from "rxjs";
import { GenerationConfig } from "./generation-config";
import { Person } from "./person";

@Injectable({
  providedIn: "root",
})
export class PersonService {
  constructor(private http: HttpClient) {}

  getPersons(config: GenerationConfig): Observable<Person[]> {
    const data = this.getAllPersons().pipe(
      map((persons) =>
        persons
          .filter(
            (person: Person) =>
              person.gender === config.female || person.gender === config.male
          )
          .slice(0, config.count)
      )
    );

    return data;
  }

  getAllPersons(): Observable<Person[]> {
    return this.http.get<Person[]>("/assets/data/persons.json");
  }
}
