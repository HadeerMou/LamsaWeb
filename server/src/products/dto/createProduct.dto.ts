import Joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export class createProductDto {
  @ApiProperty()
  nameEn: string;

  @ApiProperty()
  nameAr: string;

  @ApiProperty()
  descriptionEn: string;

  @ApiProperty()
  descriptionAr: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  color: string;

  @ApiProperty()
  categoryId: number;
}

export const createProductSchema = Joi.object<createProductDto>({
  nameEn: Joi.string().required(),
  nameAr: Joi.string().required(),
  descriptionEn: Joi.string().required(),
  descriptionAr: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  color: Joi.string().required(),
  categoryId: Joi.number().required(),
});
