import { PipeTransform, BadRequestException } from "@nestjs/common";
import { PublicationStatus } from  '../publication-status.enum';

export class PublicationStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    PublicationStatus.OPEN,
    PublicationStatus.PENDING_RATE,
    PublicationStatus.CLOSED
  ];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`)
    }
    
    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
