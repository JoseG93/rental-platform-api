import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
// import { UsersModule } from './users/users.module';
import { PublicationsModule } from './publications/publications.module';
import { TransactionsModule } from './transactions/transactions.module';
import { typeOrmConfig } from './config/typeorm.config';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost:27017/users'), // config for use MongoDB
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule, 
    // UsersModule, 
    PublicationsModule, 
    TransactionsModule, CustomersModule,
  ],
})
export class AppModule {}
