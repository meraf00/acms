export interface IMigration {
  migrationNumber: number;
  runMigration(): Promise<void>;
}
