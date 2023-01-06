import knex from 'knex';
import memoize from 'memoizee';

function initDB(dbUrl: string) {
  const db = knex({
    client: 'pg',
    connection: {
      connectionString: dbUrl,
    },
    pool: {
      min: 0,
      max: 5,
      createTimeoutMillis: 30000,
      acquireTimeoutMillis: 30000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
    },
  });

  return [ db, () => db.destroy() ];
}

export default memoize(initDB);