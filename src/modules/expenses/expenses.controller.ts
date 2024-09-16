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
  findAll(): IExpense[] {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): IExpense {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto): IExpense {
    return this.service.create(createExpenseDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ): IExpense {
    return this.service.update(id, updateExpenseDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    return this.service.remove(id);
  }
}
