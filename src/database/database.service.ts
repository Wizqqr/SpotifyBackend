import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(private readonly dataSource: DataSource) {}

  async clearDatabase() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.startTransaction();

      // Get all public schema tables
      const tables = await queryRunner.query(`
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public';
      `);

      // Truncate each table with CASCADE to remove related records
      for (const { tablename } of tables) {
        await queryRunner.query(`TRUNCATE TABLE "${tablename}" CASCADE;`);
      }

      await queryRunner.commitTransaction();
      console.log('✅ All table data deleted successfully!');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('❌ Error deleting data:', error);
    } finally {
      await queryRunner.release();
    }
  }
}
