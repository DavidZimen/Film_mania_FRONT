import { TestBed } from '@angular/core/testing';
import {Utils} from "./utils";


describe('Utils test', () => {
  let util: Utils;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    util = new Utils();
  });

  it('should format date correctly', function () {
    let day = 1;
    let month = 4;
    let year = 2002;

    let result = util.formatDate(day, month, year);

    expect(result).toMatch("01.04.2002");
  });
});
