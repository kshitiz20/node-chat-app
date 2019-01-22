var expect= require('expect');
var {generateMessage, generateURLMessage}= require('./message');



describe('generateMessage', ()=>{

    it('should return a message object', ()=>{
        var from ='Test';
        var text = 'test message';
        var messageObj=generateMessage(from, text);

        expect(messageObj.from).toBe(from);
        expect(messageObj.text).toBe(text);
        expect(typeof messageObj.createdAt).toBe('number');
        
    })
})


//`https://www.google.com/maps?q=${latitude},${longitude}
describe('generateLocationMessage',()=>{
    it('should return a location message object', ()=>{
        var from ='test';
        
        var messageUrlObj= generateURLMessage(from,1,1);
        expect(messageUrlObj.from).toBe(from);
        //expect(messageUrlObj.text).toBe(text);
        expect(typeof messageUrlObj.createdAt).toBe('number');
        expect(messageUrlObj.url).toBe('https://www.google.com/maps?q=1,1');
    })
})