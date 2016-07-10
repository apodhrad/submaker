describe("Parsing subs", function() {
  
  it("empty input", function() {
    var text = ""
    expect(parseSub(text).length).toEqual(0)
  })

  it("single sub", function() {
    var text = "1\n00:01:23 --> 00:02:34\nHello!"
    expect(parseSub(text).length).toEqual(1)
  })

});
