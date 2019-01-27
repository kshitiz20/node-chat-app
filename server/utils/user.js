var _= require('lodash');

class Users {
    constructor(){
        this.users=[];
    }
    addUser(id, name, room){
        var user= {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id){
         this.users= _.remove(this.users, (user)=>{
            return user.id===id;
        })
        return this.users;

    }
    getUser(id){
        var user= _.find(this.users, (user)=>{
            return user.id===id;
        })
        return user
    }
    getUserList(room){
        var usersInRoom= _.filter(this.users, function(user){
            return user.room===room;
        })

        var namesArray= _.map(usersInRoom, (user)=>{
            return user.name
        })
        return namesArray;
    }

}

var UserInstance= new Users();
UserInstance.addUser('123','Kshitiz', 'Dudes');
UserInstance.addUser('456','Aman', 'Dudes');
UserInstance.addUser('789','Amit', 'Dudes');
UserInstance.addUser('1010','Ajay', 'Dudes');

UserInstance.addUser('abc','Vanshika', 'Cool');
UserInstance.addUser('def','Vaibhavi', 'Cool');
UserInstance.addUser('fgh','Anita', 'Cool');
UserInstance.addUser('jkl','Akshaya', 'Cool');

// console.log(UserInstance.users);
// console.log(UserInstance.addUser('555','John', 'Dusky'));
// console.log(UserInstance.addUser('555','John', 'Dusky'));
// console.log(UserInstance.users);
// console.log(UserInstance.removeUse('456'));
// console.log(UserInstance.users);
console.log(UserInstance.getUser('123'));
console.log(UserInstance.getUserList('Cool'));
module.exports={Users};