describe 'AddressResolver', ->

  describe 'find()', ->
    context 'when first lookup', ->
      beforeEach ->
        @resolver = new AddressResolver
      it 'returns address', ->
        @resolver.find('0010933').then (result) ->
          assert.ok result.prefecture == '北海道'

    context 'when run twice the same code', ->
      beforeEach ->
        adapter = new cache.MemoryCacheAdapter
        @resolver = new AddressResolver adapter
      it 'returns address', ->
        Promise.bind(@).then ->
          Promise.all([
            @resolver.find('0010933')
            @resolver.find('0010933')
          ])
        .spread (result1, result2) ->
          assert.ok result1.prefecture == '北海道'
          assert.ok result2.prefecture == '北海道'
