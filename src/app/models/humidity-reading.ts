import { IReading } from './i-reading';

export class HumidityReading implements IReading {
	value: number;
	timestamp: number;
}
