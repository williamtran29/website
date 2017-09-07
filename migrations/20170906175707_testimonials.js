exports.up = knex =>
  knex.schema
    .createTable('companies', table => {
      table.bigincrements('id').primary()
      table.timestamps(false, true)
      table.string('color').notNullable()
      table.string('name').notNullable()
      table.string('logo').notNullable()
    })
    .createTable('testimonials', table => {
      table.bigincrements('id').primary()
      table.timestamps(false, true)
      table.integer('rank').defaultTo(0)
      table.string('text').notNullable()
      table.string('avatar')
      table.string('name').notNullable()
      table.string('title').notNullable()
      table
        .bool('featured')
        .defaultTo(false)
        .notNullable()
      table.bigInteger('company_id').unsigned()
      table.foreign('company_id').references('companies.id')
      table.index('company_id')
    })

exports.down = async knex => {
  await knex.schema.dropTableIfExists('testimonials')
  await knex.schema.dropTableIfExists('companies')
}
