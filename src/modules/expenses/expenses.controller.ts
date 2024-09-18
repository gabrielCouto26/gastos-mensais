import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { IExpense } from './interface/expense.interface';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Controller('/expenses')
export class ExpensesController {
  constructor(private readonly service: ExpensesService) {}

  @Get()
  async findAll(): Promise<IExpense[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IExpense> {
    return await this.service.findOne(id);
  }

  @Post()
  async create(@Body() createExpenseDto: CreateExpenseDto): Promise<IExpense> {
    return await this.service.create(createExpenseDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ): Promise<IExpense> {
    return await this.service.update(id, updateExpenseDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.service.remove(id);
  }
}
