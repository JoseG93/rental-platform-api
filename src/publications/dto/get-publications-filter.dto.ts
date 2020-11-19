import { PublicationStatus } from '../publication-status.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetPublicationsFilterDto {
  @IsOptional()
  @IsIn([PublicationStatus.OPEN, PublicationStatus.PENDING_RATE, PublicationStatus.CLOSED])
  status: PublicationStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
