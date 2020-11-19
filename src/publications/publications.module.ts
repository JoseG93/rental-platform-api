import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { PublicationRepository } from './publication.repository';
import { PublicationsController } from './publications.controller';
import { PublicationsService } from './publications.service';

import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PublicationRepository]),
    AuthModule
  ],
  controllers: [PublicationsController],
  providers: [PublicationsService]
})
export class PublicationsModule {}
