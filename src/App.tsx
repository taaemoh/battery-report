import { useState, useEffect } from 'react';
import ErrorBoundary from './errorBoundary';
import { BatteryReport } from './features/batteryReport';
import { LoadingSection } from './components/loadingSection';
import { readFileContent } from './services';
import * as helpers from './helpers';
import {
  DataMapType,
  BatteryReading,
  DeviceResult,
  FaultyDeviceMapType,
  Academy
} from './types';

const App = () => {
  const [academies, setAcademies] = useState<(string | Academy[])[]>([]);
  const FAULTY_BATTERY_THRESHOLD = 30;

  const calculateDeviceDailyAvgConsumption = (measurableRanges: DataMapType): Map<string, DeviceResult> => {
    const map = new Map<string, DeviceResult>();

    measurableRanges.forEach((value: BatteryReading[], key: string) => {
      const hours: number = helpers.getDifferenceInHours(value[0].timestamp, value[value.length -1].timestamp);
      const batteryDrain: number = helpers.calculateBatteryDrainPerMeasurementRange(value);
      const HOURS_IN_DAY = 24;

      if (hours < 1) {
        map.set(key, { result: -1, academyId: value[0].academyId  });
        return;
      }
      
      const result = (batteryDrain * HOURS_IN_DAY) / hours;
      map.set(key, {result, academyId: value[0].academyId  });
    });

    return map;
  }

  const prepareState = (faultyDevices: FaultyDeviceMapType) => {
    let stateItems: Academy[] = [];

    faultyDevices
      .forEach((value: DeviceResult, key: string) => {
        stateItems.push({
          result: value.result,
          academyId: value.academyId,
          serialNumber: key 
        });
      });

     return Array
      .from(helpers.groupItemsByKey(stateItems, "academyId"))
      .sort((academy1, academy2) => academy2[1].length - academy1[1].length);
  }
  
  useEffect(() => {
    const loadPageContent = async () => {
      const data = await readFileContent('/battery-data.json');
      const groups = helpers.groupItemsByKey(data, "serialNumber");
      const measurableRanges: Map<string, BatteryReading[]> = helpers.getMeasurableRanges(groups);
      const dailyBatteryDrainPerDevice = calculateDeviceDailyAvgConsumption(measurableRanges);
      const faultyDevices = helpers.getFaultyDevices(dailyBatteryDrainPerDevice, FAULTY_BATTERY_THRESHOLD);
      const academiesState = prepareState(faultyDevices);
      setAcademies(academiesState);
    };

    loadPageContent();
  }, []);

  const renderLoadingSection = () => {
    return <LoadingSection message="...Loading..." />;
  }

  const renderApp = () => {
    return (
      <div>
        <BatteryReport academies={academies} />
      </div>
    )
  }

  return (
    <ErrorBoundary>
      {
        academies.length === 0 ? renderLoadingSection() : renderApp()
      }
    </ErrorBoundary>
  );
}

export default App;
