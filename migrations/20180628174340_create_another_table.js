
exports.up = function (knex, Promise) {
  return knex.schema.createTable('another_table', table => {
    table.increments();
    table.string('name').notNullable();
    table.integer('milestone_id').
      references('id').inTable('milestones').notNull().onDelete('cascade');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('another_table');
};
