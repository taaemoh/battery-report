import { BatteryReading, DeviceResult, DataMapType } from '../types';

export const groupItemsByKey = (items: any[], key: string): Map<string, any> => {
  return items.reduce((map, obj) => {
    const keyValue = obj[key];
    if (map.has(keyValue)) {
      (map.get(keyValue) ?? []).push(obj);
    } else {
      map.set(keyValue, [obj]);
    }
    return map;
  }, new Map());
}

export const discardRechargeReadings = (batteryReadings: BatteryReading[]): BatteryReading[] => {
  let increasingIndexes: number[] = batteryReadings.reduce<number[]>((indexes, reading, index) => {
    if (index > 0 && reading.batteryLevel > batteryReadings[index - 1].batteryLevel) {
      indexes.push(index);
    }
    return indexes;
  }, []);
  
  let slicedArrays = increasingIndexes.reduce((arrays: BatteryReading[][], index, i) => {
    let start = (i === 0) ? 0 : increasingIndexes[i - 1] + 1;
    let end = index;
    arrays.push(batteryReadings.slice(start, end));
    return arrays;
  }, []);
  
  let lastIncreasingIndex = increasingIndexes[increasingIndexes.length - 1];
  slicedArrays.push(batteryReadings.slice(lastIncreasingIndex));
  
  let longestArray = slicedArrays.reduce((longest, array) => {
    return (array.length > longest.length) ? array : longest;
  });
  
  return longestArray
}

export const getDifferenceInHours = (date1: string, date2: string): number => {
  const diff = Math.abs(new Date(date2).getTime() - new Date(date1).getTime());
  const hours = Math.floor(diff / (1000 * 60 * 60));
  return hours;
}

export const calculateBatteryDrainPerMeasurementRange = (readings: BatteryReading[]): number => {
  if (readings.length < 2) {
    return -1;
  }
  
  const firstReadingInRange: number =  Math.round(readings[0].batteryLevel * 100);
  const lastReadingInRange: number = Math.round(readings[readings.length -1].batteryLevel * 100);

  return firstReadingInRange - lastReadingInRange;
}

export const getFaultyDevices = (
  devices: Map<string, DeviceResult>,
  threshold: number
  ): Map<string, DeviceResult> => {

  let map = new Map<string, DeviceResult>();
  devices.forEach((value: DeviceResult, key: string) => {
    if (value.result > threshold) {
      map.set(
        key,
        { result: value.result, academyId: value.academyId }
      );
    }
  });

  return map;
}

export const getMeasurableRanges = (groups: DataMapType): DataMapType => {
  const rangesMap: DataMapType = new Map();
  groups.forEach((value: BatteryReading[], key: string) => {
    const measurableReadingRange: BatteryReading[] = discardRechargeReadings(value);
    rangesMap.set(key, measurableReadingRange);
  });
  return rangesMap;
}