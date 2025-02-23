/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('notes', function (table) {
      table.uuid('id', { primaryKey: true }).defaultTo(knex.fn.uuid()).notNullable();
      table.string('title', 255).notNullable();
      table.text('description');
      table.boolean('is_active').defaultTo(true).notNullable();
      table.dateTime('created_at').notNullable().defaultTo(knex.fn.now())
      table.bigInteger('user_id').notNullable()
      table.foreign('user_id').references('id').inTable('users');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('notes');
};
