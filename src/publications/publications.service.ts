import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreatePublicationDto } from './dto/create-publication.dto';
import { GetPublicationsFilterDto } from './dto/get-publications-filter.dto';

import { PublicationStatus } from './publication-status.enum';

import { User } from '../auth/user.entity';
import { Publication } from './publication.entity';
import { PublicationRepository } from './publication.repository';

@Injectable()
export class PublicationsService {

    constructor(
      @InjectRepository(PublicationRepository)
      private publicationRepository: PublicationRepository,
    ) {}

    async getPublications(
        filterDto: GetPublicationsFilterDto,
        user: User
    ) {
      return this.publicationRepository.getPublications(filterDto, user);
    }

    async getPublicationById(
        id: number,
        user: User
    ): Promise<Publication> {
        const found = await this.publicationRepository.findOne({ where: { id, userId: user.id } });

        if (!found) {
            throw new NotFoundException(`Publication with ID ${id} not found`);
        }
        return found;
    }

    async createPublication(
        createPublicationDto: CreatePublicationDto,
        user: User
    ): Promise<Publication> {
        return this.publicationRepository.createPublication(createPublicationDto, user);
    }

    async deletePublication(
        id: number,
        user: User
    ): Promise<void> {
        const result = await this.publicationRepository.delete({ id, userId: user.id });

        if (result.affected === 0) {
            throw new NotFoundException(`Publication with ID ${id} not found`);
        }
    }

    async updatePublicationStatus(
        id: number, 
        status: PublicationStatus,
        user: User
    ): Promise<Publication> {
        const publication = await this.getPublicationById(id, user);
        publication.status = status;
        await publication.save();
        return publication;
    }
}
