import { Test, TestingModule } from '@nestjs/testing';
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
import ExpensesRepository from '../../database/expenses.repository';

describe('ExpensesService', () => {
  let service: ExpensesService;
  let repository: ExpensesRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ExpensesModule],
      providers: [
        {
          provide: ExpensesRepository,
          useValue: {
            find: jest
              .fn()
              .mockResolvedValue(Promise.resolve(findAllExpenseResponse)),
            findOne: jest
              .fn()
              .mockResolvedValue(Promise.resolve(findOneExpenseResponse)),
            save: jest
              .fn()
              .mockResolvedValue(Promise.resolve(createExpenseResponse)),
            update: jest
              .fn()
              .mockResolvedValue(Promise.resolve(updateExpensePayload)),
            delete: jest.fn().mockResolvedValue(Promise.resolve(null)),
          },
        },
      ],
    }).compile();

    service = app.get<ExpensesService>(ExpensesService);
    repository = app.get<ExpensesRepository>(ExpensesRepository);
  });

  it('expects service to de defined', () => {
    expect(service).toBeDefined();
  });

  describe('find', () => {
    it('should return all Expenses', async () => {
      const expenses = await repository.find();
      expect(expenses).toHaveLength(3);
      expect(expenses).toEqual(findAllExpenseResponse);
    });
  });

  describe('findOne', () => {
    it('should return one Expense', async () => {
      const expense = await repository.findOne({ id: '1' });
      expect(expense).toBeDefined();
      expect(expense).toEqual(findOneExpenseResponse);
    });
  });

  describe('save', () => {
    it('should save one Expense', async () => {
      const expense = await repository.save(createExpensePayload);

      expect(expense).toBeDefined();
      expect(Object.keys(expense)).toEqual(Object.keys(createExpenseResponse));
      expect(Object.values(expense)).toEqual(
        Object.values(createExpenseResponse),
      );
    });
  });

  describe('update', () => {
    it('should update one Expense', async () => {
      const expense = await repository.update('1', updateExpensePayload);

      expect(expense).toBeDefined();
      expect(expense.name).toEqual(updateExpenseResponse.name);
      expect(expense.name).toEqual(updateExpenseResponse.name);
      expect(expense.description).toEqual(updateExpenseResponse.description);
      expect(expense.value).toEqual(updateExpenseResponse.value);
    });
  });

  describe('delete', () => {
    it('should delete one Expense', async () => {
      const deleteSpy = jest
        .spyOn(repository, 'delete')
        .mockResolvedValue(null);

      await repository.delete('1');

      expect(deleteSpy).toHaveBeenCalledWith('1');
    });
  });
});
