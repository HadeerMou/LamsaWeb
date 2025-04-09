import Joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export class updateProductDto {
  @ApiProperty()
  nameEn: string;

  @ApiProperty()
  nameAr: string;

  @ApiProperty()
  descriptionEn: string;

  @ApiProperty()
  descriptionAr: string;

  @ApiProperty()
  price: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  categoryId: number;
}

export const updateProductSchema = Joi.object<updateProductDto>({
  nameEn: Joi.string().required(),
  nameAr: Joi.string().required(),
  descriptionEn: Joi.string().required(),
  descriptionAr: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  categoryId: Joi.number().required(),
});
