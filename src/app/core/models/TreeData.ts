export class TreeData<T> {
  constructor(public data?: T, public children?: TreeData<T>[]) {
  }
}
