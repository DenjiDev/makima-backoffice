import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
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

  @ApiOperation({ summary: 'Return specified customer'})
  @ApiResponse({ status: HttpStatus.OK, description: 'The customer has been returned successfully.', type: GetCustomerDto })
  @Get(":id")
  findOne(@Param('id') id:string) {
    return this.customerService.findOne(id)
  }

  @ApiOperation({ summary: 'Delete specified customer'})
  @ApiResponse({ status: HttpStatus.OK, description: 'The customer has been deleted successfully.', type: GetCustomerDto })
  @Delete(":id")
  deleteOne(@Param('id') id:string) {
    return this.customerService.deleteOne(id)
  }
}