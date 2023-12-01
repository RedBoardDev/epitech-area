'use strict'

const Users = use('App/Models/Users')

class UsersController {
  async index({ response }) {
    try {
      const users = await Users.all()
      return response.json(users)
    } catch (error) {
      console.error(error.message)
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

module.exports = UsersController
