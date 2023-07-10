import { Controller, Get, Post, Body, Patch, Param, HttpStatus } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateGroupDto } from './dto/update-group.dto';


@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @ApiBody({ type: CreateGroupDto })
  @ApiOperation({ summary: 'Create group' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The group has been created successfully.', type: CreateGroupDto })
  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @ApiOperation({ summary: 'List all groups'})
  @ApiResponse({ status: HttpStatus.OK, description: 'The group list has been returned successfully.'})
  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @ApiOperation({ summary: 'Update groups info'})
  @ApiResponse({ status: HttpStatus.OK, description: 'The group info has been updated successfully.', type: UpdateGroupDto })
  @Patch(':id')
  async update(@Body() data: UpdateGroupDto, @Param('id') id: string) {
    return this.groupService.update(id, data)
  }
}
