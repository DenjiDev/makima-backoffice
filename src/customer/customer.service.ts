import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { PrismaService } from '../prisma/prisma.service';
import { GetCustomerDto } from './dto/get-customer.dto';
import { UpdateCustomersDto } from './dto/update-customer.dto';


@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService){

  }
  async create(data: CreateCustomerDto) {
    const { phone, email } = data

    try {
      const foundCustomer = await this.prisma.customer.findFirst({
        where: {
          phone, 
          email
        }
      })

      if(foundCustomer){
        Logger.error('Customer already created', '', 'CustomerService', true)
        throw new ConflictException('Customer already created')
      }

      const createdUser = await this.prisma.customer.create({
        data
      })

      return createdUser

    } catch (error) {
      Logger.error(error, '', 'CustomerService', true)
      throw error
    }
  }

  async listAllCustomers() {
    return this.prisma.customer.findMany() as unknown as GetCustomerDto[];
  }

  async updateCustomers(id: string, data: UpdateCustomersDto) {
    return this.prisma.customer.update({
      data,
      where: {
        id
      }
    })
  }


}
