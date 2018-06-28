
exports.up = function (knex, Promise) {
  return Promise.all([
    // put your async functon(s) inside Promise.all();
    knex.schema.alterTable('milestones', table => {
      table.string('description').notNullable().alter();
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('milestones', table => {
      table.string('description').nullable().alter();
    })
  ]);
};
