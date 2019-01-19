var expect= require('expect');
var {generateMessage}= require('./message');



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