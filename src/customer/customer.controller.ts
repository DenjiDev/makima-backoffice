import { Controller, Get, Post, Body, Patch, Put, Param, Delete, HttpStatus } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { UpdatePutCustomerDto } from './dto/update-put-customer.dto';
import { UpdatePatchCustomerDto } from './dto/update-patch-customer.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetCustomerDto } from './dto/get-customer.dto';

@ApiTags('Customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiBody({ type: CreateCustomerDto })
  @ApiOperation({ summary: 'Create customer' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The customer has been created successfully.', type: CreateCustomerDto })
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @ApiOperation({ summary: 'List all customers'})
  @ApiResponse({ status: HttpStatus.OK, description: 'The customer list has been returned successfully.', type: [GetCustomerDto] })
  @Get()
  listAllCustomers() :Promise<GetCustomerDto[]> {
    return this.customerService.listAllCustomers();
  }

  @ApiOperation({ summary: 'Update desired customers information and clear all others'})
  @ApiResponse({ status: HttpStatus.OK, description: 'The customer info has been updated successfully.', type: UpdatePutCustomerDto })
  @Put(':id')
  async update(@Body() data: UpdatePutCustomerDto, @Param('id') id: string) {
    return this.customerService.updateAllCustomerInfo(id, data)
  }

  @ApiOperation({ summary: 'Update desired customers information and ignore all others'})
  @ApiResponse({ status: HttpStatus.OK, description: 'The customer info has been updated successfully.', type: UpdatePatchCustomerDto })
  @Patch(':id')
  async partialUpdate(@Body() data: UpdatePatchCustomerDto, @Param('id') id: string) {
    return this.customerService.updateAnyCustomerInfo(id, data)
  }

}