export type BatteryReading = {
academyId: number,
batteryLevel: number,
employeeId: string,
serialNumber: string,
timestamp: string
}

export type DataMapType = Map<string, BatteryReading[]>;

export type FaultyDeviceMapType = Map<string, DeviceResult>

export type DeviceResult = { result: number, academyId: number }

export type Academy = DeviceResult & { serialNumber: string }
