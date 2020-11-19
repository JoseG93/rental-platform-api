import { Controller, Body, Post, Get, Req, Res, Next, UseGuards, UnprocessableEntityException, ValidationPipe, Patch, Query, Param, ParseIntPipe, UsePipes, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// dto
import { CreatePublicationDto } from './dto/create-publication.dto';
import { GetPublicationsFilterDto } from './dto/get-publications-filter.dto';

// pipes
import { PublicationStatusValidationPipe } from './pipes/publication-status-validation.pipe';

import { PublicationStatus } from './publication-status.enum';
import { Publication } from './publication.entity';
import { PublicationsService } from './publications.service';

import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('publications')
@UseGuards(AuthGuard())
export class PublicationsController {
	constructor(
    	private publicationsService: PublicationsService
  	) {}

  	@Get()
  	getPublications(
    	@Query(ValidationPipe) filterDto: GetPublicationsFilterDto,
    	@GetUser() user: User
  	): Promise<Publication[]> {
    	return this.publicationsService.getPublications(filterDto, user);
  	}

  	@Get(':id')
  	getPublicationById(
    	@Param('id', ParseIntPipe) id: number,
    	@GetUser() user: User
  	): Promise<Publication> {
    	return this.publicationsService.getPublicationById(id, user);
  	}

  	@Post()
  	@UsePipes(ValidationPipe)
  	createPublication(
    	@Body() createPublicationDto: CreatePublicationDto,
    	@GetUser() user: User
  	): Promise<Publication> {
    	return this.publicationsService.createPublication(createPublicationDto, user);
  	}

  	@Delete('/:id')
  	deletePublication(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<void> {
    	return this.publicationsService.deletePublication(id, user);
    }

    @Patch('/:id/status')
    updatePublicationStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', PublicationStatusValidationPipe) status: PublicationStatus,
        @GetUser() user: User
    ): Promise<Publication> {
        return this.publicationsService.updatePublicationStatus(id, status, user);
    }
}
