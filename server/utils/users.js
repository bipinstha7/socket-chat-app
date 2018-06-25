class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    let user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    // return user that was removed
    let user = this.users.filter(user => user.id === id)[0];
    // let user = this.getUser(id);

    if(user) {
      this.users = this.users.filter(user => user.id !== id);
    }
    return user;
  }

  getUser(id) {
    // let user = this.users.filter(user => user.id === id);
    // return user[0].name;

    return this.users.filter(user => user.id === id)[0];
  }

  getUserList(room) {
    // find all of the users by the room they are joined
    let users = this.users.filter(user => user.room === room);

    let namesArray = users.map(user => {
     return {
        name: user.name, 
        room: user.room
     };
    });

    return namesArray;
  }
}

module.exports = {Users};

// or it can be done by
// let users = [];

// const addUser = (id, name, room) => {
//   users.push({});
// };

// module.exports = {addUser};

