const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/postgres';

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

const migrationConf = {
  migrations: { glob: 'migrations/*.js' },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  });
};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log('Database connected successfully.');
  } catch (err) {
    console.log('Connecting database failed:', err.message);
    return process.exit(1);
  }
};

module.exports = { sequelize, connectToDatabase };
