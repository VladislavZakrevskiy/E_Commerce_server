export class RegistrationDto {
	readonly firstName: string;
	readonly lastName: string;
	readonly email: string;
	readonly password: string;
	readonly house_number: number;
	readonly house_street: string;
	readonly city: string;
	readonly country: string;
	readonly age: number;
	readonly preferences: Tags[];
	role: 'user' | 'seller';
	photo: File;
}

export interface IGeoData {
	house_number: number;
	house_street: string;
	city: string;
	country: string;
}

export interface IMainData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export type Tags =
	| 'For Home'
	| 'Technic'
	| 'Beauty'
	| 'Entertainment'
	| 'No Tag';

export interface IPersonalData {
	age: number;
	preferences: Tags[];
	role: 'customer' | 'seller';
	photo: File;
}
