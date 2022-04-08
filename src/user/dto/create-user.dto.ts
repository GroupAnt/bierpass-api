import { IsOptional } from 'class-validator';

export class CreateUserDto {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  streetName: string;
  streetNumber: string;
  neighborhood: string;
  postalCode: string;
  city: string;
  country: string;

  @IsOptional()
  hasAdmin: boolean;
}
