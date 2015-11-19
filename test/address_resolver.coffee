describe 'AddressResolver', ->

  describe 'find()', ->
    context 'when first lookup', ->
      beforeEach ->
        @resolver = new AddressResolver
      it 'returns address', ->
        @resolver.find('0010933').then (result) ->
          assert.ok result.prefecture == '北海道'

    context 'when the postal code is short', ->
      beforeEach ->
        @resolver = new AddressResolver
      it 'returns null value', ->
        @resolver.find('00').then (result) ->
          assert.ok result == null

    context 'when the postal code not found', ->
      beforeEach ->
        @resolver = new AddressResolver
      it 'returns null value', ->
        @resolver.find('0049999').then (result) ->
          assert.ok result == null

    context 'when run twice the same code', ->
      beforeEach ->
        dict =
          '0010933': [1,"札幌市北区","新川西三条"]

        @adapter =
          called: 0
          codePrefixes: []
          addressDicts: {}

          find: (prefix) ->
            @codePrefixes.push prefix
            result = if @called > 0 then dict else null
            @called++
            Promise.resolve result
          store: (prefix, dict) ->
            @addressDicts[prefix] = dict
            Promise.resolve()

        @resolver = new AddressResolver @adapter
      it 'returns address from cache', ->
        Promise.bind(@).then ->
          Promise.all([
            @resolver.find('0010933')
            @resolver.find('0010933')
          ])
        .spread (result1, result2) ->
          assert.ok @adapter.codePrefixes[0] == '001'
          assert.ok @adapter.codePrefixes[1] == '001'
          assert.ok @adapter.addressDicts['001'] != undefined
