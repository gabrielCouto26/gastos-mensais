import { Controller, Get } from '@nestjs/common';
import { ExpensesService } from './expenses.service';

@Controller()
export class ExpensesController {
  constructor(private readonly service: ExpensesService) {}

  @Get()
  getHello(): string {
    return this.service.getHello();
  }
}
