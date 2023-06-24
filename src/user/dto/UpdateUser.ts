import { Tags } from '../../../dist/auth/dto/registration';
export class UpdateUserDto {
    readonly user_id: string
    readonly firstName: string
    readonly lastName: string
    readonly password: string
    readonly email: string
    readonly preferences: Tags[]
    photo: string
    readonly city: string
    readonly country: string
    readonly house_street: string
    readonly house_number: number
    readonly settings: object
}