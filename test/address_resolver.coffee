describe 'AddressResolver', ->
  beforeEach ->
    @resolver = new AddressResolver

  describe 'find()', ->
    it 'returns address', ->
      @resolver.find('0010933').then (result) ->
        assert.ok result.prefecture == '北海道'
