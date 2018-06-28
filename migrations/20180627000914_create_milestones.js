
exports.up = function (knex, Promise) {
  // table name: milestones
  // columns: description (string), date_achieved (date)
  return Promise.all([
    knex.schema.createTable('milestones', table => {
      table.increments();
      table.string('description');
      table.date('date_achieved');
    })
  ]);
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('milestones');
};
