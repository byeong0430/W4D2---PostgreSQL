
exports.up = function(knex, Promise) {
  // table name: milestones
  // columns: description (string), date_achieved (date)
  return Promise.all([
    knex.schema.createTable('milestones', table =>{
      table.string('description')
      table
    })
  ]);
};

exports.down = function(knex, Promise) {

};
