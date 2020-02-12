
exports.up = function(knex, Promise) {
  return Promise.all([
  knex.schema.createTable('tickets',
        function(t){
                t.increments('id').unsigned().primary();
                t
                    .timestamp('createdAt')
                    .notNullable()
                    .defaultTo(knex.fn.now())
                t
                    .timestamp('updatedAt')
                    .notNullable()
                    .defaultTo(knex.fn.now())
                t.string('ticketGame').notNull();
                t.string('ticketStart');
                t.string('gameLocation').nullable;
                t.string('seatNumber').notNull();
                t.string('section').notNull();
                t.string('price').notNull();
                t.string('type').nullable;
                t.string('owner').notNull();

        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all(knex.schema.dropTable('tickets'));
};
