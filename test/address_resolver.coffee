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
        @adapter =
          codePrefixes: []
          addressDicts: {}

          find: (prefix) ->
            @codePrefixes.push prefix
            Promise.resolve null
          store: (prefix, dict) ->
            @addressDicts[prefix] = dict

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
