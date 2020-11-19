import { Repository, EntityRepository } from "typeorm";
import { Publication } from "./publication.entity";
import { CreatePublicationDto } from './dto/create-publication.dto';
import { PublicationStatus } from './publication-status.enum';
import { GetPublicationsFilterDto } from './dto/get-publications-filter.dto';
import { User } from '../auth/user.entity';

@EntityRepository(Publication)
export class PublicationRepository extends Repository<Publication> {
    async getPublications(
        filterDto: GetPublicationsFilterDto,
        user: User
    ): Promise<Publication[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('publication');

        query.where('publication.userId = :userId', { userId: user.id });

        if (status) {
            query.andWhere('publication.status = :status', { status });
        }

        if (search) {
            query.andWhere('(publication.title LIKE :search OR publication.description LIKE :search)', { search: `%${search}%` });
        }

        const publications = await query.getMany();
        return publications;
    }

    async createPublication(
        createPublicationDto: CreatePublicationDto,
        user: User,
    ): Promise<Publication> {
        const { title, description } = createPublicationDto;

        const publication = new Publication();
        publication.title = title;
        publication.description = description;
        publication.status = PublicationStatus.OPEN;
        publication.user = user;
        await publication.save();
        delete publication.user;
        return publication;
    }
}
