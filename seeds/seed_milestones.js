
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('milestones').del()
    .then(function () {
      const seeds = [
        { id: 1, description: 'rowValue1', date_achieved: new Date() },
        { id: 2, description: 'rowValue2', date_achieved: new Date('1988-04-30') },
        { id: 3, description: 'rowValue3', date_achieved: new Date('Apr-2-88') }
      ];
      // Inserts seed entries
      return knex('milestones').insert(seeds);
    });
};
