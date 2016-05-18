describe 'AddressResolver', ->

  describe 'find()', ->
    context 'when first lookup', ->
      beforeEach ->
        @resolver = new AddressResolver
      it 'returns address', ->
        @resolver.find('0010933').then (results) ->
          assert.ok results[0].prefecture == '北海道'

    context 'when two address matched', ->
      beforeEach ->
        @resolver = new AddressResolver
      it 'returns addresses', ->
        @resolver.find('0040000').then (results) ->
          assert.ok results.length == 2

    context 'when the zip code is short', ->
      beforeEach ->
        @resolver = new AddressResolver
      it 'returns null value', ->
        @resolver.find('00').then (result) ->
          assert.ok result == null

    context 'when the zip code not found', ->
      beforeEach ->
        @resolver = new AddressResolver
      it 'returns null value', ->
        @resolver.find('0049999').then (result) ->
          assert.ok result == null

    context 'when run twice the same code', ->
      beforeEach ->
        a1 =
          prefecture: "北海道"
          city: "札幌市厚別区"
          area: ""
        a2 =
          prefecture: "北海道"
          city: "札幌市清田区"
          area: ""

        addresses =
          "0040000": [ a1, a2 ]

        @adapter =
          called: 0
          codePrefixes: []
          addressDicts: {}

          find: (prefix) ->
            @codePrefixes.push prefix
            result = if @called > 0 then addresses else null
            @called++
            Promise.resolve result
          store: (prefix, dict) ->
            @addressDicts[prefix] = dict
            Promise.resolve()

        @resolver = new AddressResolver @adapter

      it 'returns address from cache', ->
        Promise.bind(@).then ->
          Promise.all([
            @resolver.find('0040000')
            @resolver.find('004-0000')
          ])
        .spread (result1, result2) ->
          assert.ok @adapter.codePrefixes[0] == '004'
          assert.ok @adapter.codePrefixes[1] == '004'
          assert.ok @adapter.addressDicts['004'] != undefined
