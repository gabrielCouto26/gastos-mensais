import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesController } from '../expenses.controller';
import { ExpensesModule } from '../expenses.module';
import {
  expensePayload,
  expenseResponse,
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

    addExpense(service);
  });

  it('expects controller to de defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all Expenses', () => {
      expect(controller.findAll()).toHaveLength(1);
      expect(controller.findAll()).toEqual([expenseResponse]);
    });
  });

  describe('findOne', () => {
    it('should return one Expensee', () => {
      expect(controller.findOne('1')).toBeDefined();
      expect(controller.findOne('1')).toEqual(expenseResponse);
    });
  });

  describe('create', () => {
    it('should create one Expensee', () => {
      const created = controller.create(expensePayload);
      expect(created).toBeDefined();
      expect(Object.keys(created)).toEqual(Object.keys(expenseResponse));
      expect(created.name).toEqual(expenseResponse.name);
      expect(created.description).toEqual(expenseResponse.description);
      expect(created.value).toEqual(expenseResponse.value);
    });
  });

  describe('update', () => {
    it('should update one Expensee', () => {
      const updated = controller.update('1', updateExpensePayload);
      expect(updated).toBeDefined();
      expect(Object.keys(updated)).toEqual(Object.keys(updateExpenseResponse));
      expect(updated.name).toEqual(updateExpenseResponse.name);
      expect(updated.description).toEqual(updateExpenseResponse.description);
      expect(updated.value).toEqual(updateExpenseResponse.value);
    });
  });

  describe('delete', () => {
    it('should delete one Expensee', () => {
      controller.delete('1');
      expect(service.findAll()).toHaveLength(0);
    });
  });
});

function addExpense(service: ExpensesService) {
  service.create(expensePayload);
}
