'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Users extends Model {
    static get table() {
        return 'users';
    }

    static get fillable() {
        return ['email', 'password'];
    }
}

module.exports = Users
