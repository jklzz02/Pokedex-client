import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, any[]>();
  public cache$ = new BehaviorSubject<Map<string, any[]>>(new Map());

  set(key: string, data: any[]): void {
    if (this.cache.has(key)) {
     return;
    }
    this.cache.set(key, data);
    this.cache$.next(new Map(this.cache));
  }

  get(key: string): any[] | undefined {
    return this.cache.get(key);
  }

  clear(key: string): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
      this.cache$.next(new Map(this.cache));
    }
  }

  dispose(): void{
    this.cache.clear();
  }
}
