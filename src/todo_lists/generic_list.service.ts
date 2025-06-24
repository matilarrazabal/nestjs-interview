import { Injectable } from '@nestjs/common';

interface HasId {
    id: number;
}

@Injectable()
export class ListService<T extends HasId> {
  private readonly items: T[] = [];

  constructor(obj: T[] = []) {
    this.items = obj;
  }

  all(): T[] {
    return this.items;
  }

  get(id: number): T {
    return this.items.find((x) => x.id === Number(id));
  }

  create(item: T): T {
    item.id = this.nextId();
    this.items.push(item);
    return item;
  }

  update(id: number, dto: T): T {
    let indxItem = this.items.findIndex((x) => x.id == Number(id));
    if (indxItem >= 0) {
        this.items[indxItem] = dto;
    }
    return dto;
  }

  delete(id: number): void {
    const index = this.items.findIndex((x) => x.id == Number(id));

    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  private nextId(): number {
    const last = this.items
      .map((x) => x.id)
      .sort()
      .reverse()[0];

    return last ? last + 1 : 1;
  }
}
