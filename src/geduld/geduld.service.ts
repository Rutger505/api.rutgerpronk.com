import { Injectable } from "@nestjs/common";

@Injectable()
export class GeduldService {
  private geduld = 50;

  public setGeduld(newGeduld: number): void {
    this.geduld = newGeduld;
  }

  public getGeduld(): number {
    return this.geduld;
  }
}
