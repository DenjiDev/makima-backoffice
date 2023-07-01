import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { PrismaService } from '../prisma/prisma.service';
import { GetCustomerDto } from './dto/get-customer.dto';
import { UpdatePutCustomerDto } from './dto/update-put-customer.dto';
import { UpdatePatchCustomerDto } from './dto/update-patch-customer.dto';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';


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

  async updateAllCustomerInfo(id: string, {email, name, phone, credit, groups}: UpdatePutCustomerDto) {

    if (email === undefined) {
      email = '';
    }

    if (name === undefined) {
      name = '';
    }

    if (phone === undefined) {
      phone = '';
    }

    if (credit === undefined) {
      credit = 0;
    }

    return this.prisma.customer.update({
      data: {email, name, phone, credit, groups},
      where: {
        id
      }
    })
  }

  async updateAnyCustomerInfo(id: string, data: UpdatePatchCustomerDto) {
    return this.prisma.customer.update({
      data,
      where: {
        id
      }
    })
  }


}
