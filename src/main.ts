import { NestFactory } from '@nestjs/core';
import { ExpensesModule } from './modules/expenses/expenses.module';

async function bootstrap() {
  const app = await NestFactory.create(ExpensesModule);
  await app.listen(3000);
}
bootstrap();
