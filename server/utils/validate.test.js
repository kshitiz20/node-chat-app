var {isRealString}= require('./validate.js');
var expect= require('expect');

// describe('generateMessage', ()=>{

//     it('should return a message object', ()=>{
//         var from ='Test';
//         var text = 'test message';
//         var messageObj=generateMessage(from, text);

//         expect(messageObj.from).toBe(from);
//         expect(messageObj.text).toBe(text);
//         expect(typeof messageObj.createdAt).toBe('number');
        
//     })
// })

describe('validate String',()=>{
    it('should return true for non empty strings', ()=>{
        var name= 'TestName';
        var room ='TestRoom';
        
        var result1=isRealString(name);
        var result2= isRealString(room);

        expect(result1).toBe(true);
        expect(result2).toBe(true);
        expect(isRealString("  ")).toBe(false);
    })
})