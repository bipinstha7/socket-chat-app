const {Users} = require('./users');

describe('Users', () => {
  it('should add new user', () => {
    let users = new Users();
    let user = {
      id: '123',
      name: 'nepal',
      room: 'chat room'
    };
    let resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  })
})