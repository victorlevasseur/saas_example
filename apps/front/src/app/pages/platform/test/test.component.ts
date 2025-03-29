import { Component, inject } from '@angular/core';
import { TestGQL } from '../../../graphql/generated';
import { map } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-test-component',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent {
  private testGql = inject(TestGQL);

  data$ = this.testGql.watch().valueChanges.pipe(map((value) => value.data));
}
