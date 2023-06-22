import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CustomerModule, PrismaModule, ConfigModule.forRoot()]
})
export class AppModule {}
