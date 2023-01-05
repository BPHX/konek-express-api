import knex from 'knex';

function initDB({ dbUrl } : any) {
  const { hostname: host, port, username: user, password, pathname } = new URL(dbUrl);
  const database = pathname.substring(1);
  return knex({
    client: 'mysql2',
    connection: {
      host,
      port: parseInt(port) || undefined,
      user,
      password,
      database,
    },
    pool: { min: 0, max: 7 }
  });
}

export default initDB;