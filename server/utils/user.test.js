var expect= require('expect');
var {Users}= require('./user');



describe('Users',()=>{
    var users;
beforeEach(()=>{
    users= new Users();
    users.users=[{
        id:1,
        name:'Mike',
        room:"Node Course"
    }, {
        id:2,
        name:"Jen",
        room:"React Course"

    }, {
        id:3,
        name:"Misha",
        room:"Node Course"

    }]
})

    it('should add new user', ()=>{
        var id= 'TestId';
        var name= 'TestName';
        var room ='TestRoom';

        var users= new Users();
        var returnedUser= users.addUser(id, name, room);
        expect(returnedUser.id).toBe(id);
        expect(returnedUser.name).toBe(name);
        expect(returnedUser.room).toBe(room);
    })

    it('should return the names of the Node Course', ()=>{
           expect( users.getUserList('Node Course')).toEqual(['Mike', 'Misha']);
      })

      it('should return the names of the React Course', ()=>{
        expect( users.getUserList('React Course')).toEqual(['Jen']);
     })
     it('should remove a User', ()=>{
         expect(users.removeUser(3)[0]).toMatchObject({"id":3})
     })

     it('should find a User', ()=>{
        expect(users.getUser(3)).toMatchObject({"id":3})
    })
})
