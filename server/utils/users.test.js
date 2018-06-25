const { Users } = require('./users');

describe('Users', () => {

  let users;
  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: '1',
        name: 'ramu',
        room: 'Node'
      },
      {
        id: '2',
        name: 'bhuvan',
        room: 'Javascript'
      },
      {
        id: '3',
        name: 'gurung',
        room: 'React'
      },
      {
        id: '4',
        name: 'khadka',
        room: 'Node'
      }
    ];
  });

  describe('addUser', () => {
    it('should add new user', () => {
      let users = new Users();
      let user = {
        id: '123',
        name: 'nepal',
        room: 'chat room'
      };
      let resUser = users.addUser(user.id, user.name, user.room);

      expect(users.users).toEqual([user]);
    });
  });

  describe('removeUser', () => {
    it('should remove user of give id', () => {
      let userId = '2';
      let user = users.removeUser(userId);

      expect(user.id).toBe(userId);
      // after remove remaining users are
      expect(users.users.length).toBe(3);
    });

    it('should not remove user of given invalid id', () => {
      let userId = '24';
      let user = users.removeUser(userId);

      expect(user).toBeFalsy();
      // after remove remaining users are
      expect(users.users.length).toBe(4);
    });
  });

  describe('getUser', () => {
    it('should return username of give id', () => {
      let userId = '3';
      let user = users.getUser(userId);

      expect(user).toEqual('gurung');

      // expect(user).toBeTruthy();
      // expect(user.id).toBe(userId);
    });

    // it('should not return user of invalid userId', () => {
    //   let user = users.getUser('87');
    //   expect(user).toBe('h');
    // });
  });

  describe('getUserList', () => {
    it('should return name(s) of Node room', () => {
      let userList = users.getUserList('Node');

      expect(userList).toEqual(['ramu', 'khadka']);
    });

    it('should return name(s) of Javascript room', () => {
      let userList = users.getUserList('Javascript');

      expect(userList).toEqual(['bhuvan']);
    });

    it('should return name(s) of React room', () => {
      let userList = users.getUserList('React');

      expect(userList).toEqual(['gurung']);
    });
  });
});