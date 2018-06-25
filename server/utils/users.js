[{
  id: '938392jdj39ufj00ls8',
  name: 'bipin',
  room: 'The Office Fans'
}]

// addUser(id,name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

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
    // find the user by id
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

// class Person {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }

//   getUserDescription() {
//     return `${this.name} is ${this.age} year(s) old`;
//   }
// }

// const me = new Person('bipin', '25');
// const description = me.getUserDescription();
// console.log(description);
// console.log(me.name);

// or it can be done by
// let users = [];

// const addUser = (id, name, room) => {
//   users.push({});
// };

// module.exports = {addUser};

