import { IReading } from './i-reading';

export class TemperatureReading implements IReading {
	value: number;
	timestamp: number;
}
