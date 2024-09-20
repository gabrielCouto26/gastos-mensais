import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesController } from '../expenses.controller';
import { ExpensesModule } from '../expenses.module';
import {
  createExpensePayload,
  createExpenseResponse,
  findAllExpenseResponse,
  findOneExpenseResponse,
  updateExpensePayload,
  updateExpenseResponse,
} from './fixtures/expense';
import { ExpensesService } from '../expenses.service';

describe('ExpensesController', () => {
  let controller: ExpensesController;
  let service: ExpensesService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ExpensesModule],
    }).compile();

    controller = app.get<ExpensesController>(ExpensesController);
    service = app.get<ExpensesService>(ExpensesService);
  });

  it('expects controller to de defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all Expenses', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockResolvedValueOnce(findAllExpenseResponse);

      const expenses = await controller.findAll();
      expect(expenses).toHaveLength(3);
      expect(expenses).toEqual(findAllExpenseResponse);
    });
  });

  describe('findOne', () => {
    it('should return one Expense', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockResolvedValueOnce(findOneExpenseResponse);

      const expense = await controller.findOne('1');
      expect(expense).toBeDefined();
      expect(expense).toEqual(findOneExpenseResponse);
    });
  });

  describe('create', () => {
    it('should create one Expense', async () => {
      jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(createExpenseResponse);

      const expense = await controller.create(createExpensePayload);

      expect(expense).toBeDefined();
      expect(Object.keys(expense)).toEqual(Object.keys(createExpenseResponse));
      expect(Object.values(expense)).toEqual(
        Object.values(createExpenseResponse),
      );
    });
  });

  describe('update', () => {
    it('should update one Expense', async () => {
      jest.spyOn(service, 'update').mockResolvedValueOnce(updateExpensePayload);

      const expense = await controller.update('1', updateExpensePayload);

      expect(expense).toBeDefined();
      expect(expense.name).toEqual(updateExpenseResponse.name);
      expect(expense.description).toEqual(updateExpenseResponse.description);
      expect(expense.value).toEqual(updateExpenseResponse.value);
    });
  });

  describe('remove', () => {
    it('should remove one Expense', async () => {
      const removeSpy = jest
        .spyOn(service, 'remove')
        .mockResolvedValueOnce(null);

      await controller.delete('1');

      expect(removeSpy).toHaveBeenCalledWith('1');
    });
  });
});
