exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          name: '',
        },
        {
          id: 2,
          name: '',
        },
      ])
    })
}
