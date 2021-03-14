import { CollectionSynchronizer } from './CollectionSynchronizer';
import type { ModelOf} from 'clerk';
import { CollectionSortFunction } from './sort/CollectionSortFunction';

export class Collection<T = unknown> {

  protected _models : ModelOf<T>[] = [];

  protected _synchronizer?: CollectionSynchronizer;

  protected _sortFunction?: CollectionSortFunction;

  private _subCollections? : Collection<T>[] = [];
  
  constructor(private _name : string) {}

  set sortFn(sortFn : CollectionSortFunction<T>) {
    this._sortFunction = sortFn;
    this.sort();
  }

  get sortFn() {
    return this._sortFunction!;
  }

  sort() {
    this._models.sort(this._sortFunction!);
  }

  get name() {
    return this._name;
  }

  get models() {
    return [...this._models];
  }

  get length() {
    return this._models.length;
  }

  [Symbol.iterator] () {
    return this._models[Symbol.iterator]();
  }

}