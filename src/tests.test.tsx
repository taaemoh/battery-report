import * as helpers from './helpers';
import {
  testData1,
  testData2,
  testData3,
  testData4,
  testData5,
} from '../testFixtures';

describe('Helper functions', () => {
  it('groupItemsByKey ... groups array of objects into a Map using a specified object property as a key', () => {
    const testResult = helpers.groupItemsByKey(testData1, "country") ;
    expect(testResult.size).toEqual(2);
    expect(testResult.get('NL')).toMatchObject(
      [
        { "id": "id111", "gender": "m", "country": "NL" },
        { "id": "id333", "gender": "f", "country": "NL" },
        { "id": "id555", "gender": "m", "country": "NL" }
      ]
    );
    expect(testResult.get('DE')).toMatchObject(
      [
        { "id": "id222", "gender": "m", "country": "DE" },
        { "id": "id444", "gender": "f", "country": "DE" }
      ]
    );
  });

  it('discardRechargeReadings ... returns longest range of battery readings uninterrupted by any recharge', () => {
    const testResult = helpers.discardRechargeReadings(testData2);
    const expectedResult = testData3

    expect(testResult.length).toEqual(16);
    expect(Array.from(testResult)).toMatchObject(expectedResult);
  });

  it('getDifferenceInHours ... calculates the hours difference between 2 utc dates', () => {
    const date1 = "2019-05-17T10:14:13.546+01:00";
    const date2 = "2019-05-20T15:12:02.798+01:00";
    const expectedResult = 76;
    const testResult = helpers.getDifferenceInHours(date1, date2);
    expect(testResult).toBe(expectedResult);
  });

  it('calculateBatteryDrainPerMeasurementRange ... calculates the battery drain amount in a range of readings that are not interrupted with any recharge', () => {
    const testResult = helpers.calculateBatteryDrainPerMeasurementRange(testData4);
    const expectedResult = 14;
    expect(testResult).toBe(expectedResult);
  });

  it('calculateBatteryDrainPerMeasurementRange ... identifies ranges where we have only one reading by returning -1', () => {
    const testData =[
      {
        "academyId": 30013,
        "batteryLevel": 0.76,
        "employeeId": "T1007415",
        "serialNumber": "TT-C67ML-A-0001-01653",
        "timestamp": "2019-05-20T15:11:32.992+01:00"
      }
    ];
    const testResult = helpers.calculateBatteryDrainPerMeasurementRange(testData);
    const expectedResult = -1;
    expect(testResult).toBe(expectedResult);
  });

  it('getFaultyDevices ... faulty batteries that need replacement when they reach a THRESHOLD', () => {
    const FAULTY_BATTERY_THRESHOLD = 45;
    const testResult = helpers.getFaultyDevices(testData5, FAULTY_BATTERY_THRESHOLD);
    const expectedResult = [
      [ '2222', { result: 73, academyId: 245233 } ],
      [ '4444', { result: 46, academyId: 233244 } ]
    ];
    
    expect(Array.from(testResult).length).toEqual(2);
    expect(Array.from(testResult)).toMatchObject(expectedResult);

  });
  
});

