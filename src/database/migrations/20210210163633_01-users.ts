// knex migrate:make <migration name> --cwd src/database
import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("users", users => {
        users.increments('user_id');
        users.string('username').notNullable().unique();
        users.string('password').notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("users");
}

