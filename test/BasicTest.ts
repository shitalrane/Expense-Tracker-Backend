var assert = require('assert');

describe('basictest', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });

  describe("multiplication", function () {
    it('should equal 15 when  5 is multiply by 3', function () {
      var result = 5 * 3;
      assert.equal(result, 15)
    })
  })

  describe('userlogin',function(){
    it('should return undefine when emailId does not exist',function(){

    })
  })
});
