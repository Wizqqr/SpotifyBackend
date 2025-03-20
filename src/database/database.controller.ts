import { Controller, Delete, HttpStatus } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Delete('clear') // You can change the URL to fit your needs
  async clearAllData() {
    try {
      const result = await this.databaseService.clearDatabase();
      return { message: result };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '❌ Error occurred while clearing database',
      };
    }
  }
}
