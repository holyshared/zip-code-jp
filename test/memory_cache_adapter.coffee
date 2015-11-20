describe 'MemoryCacheAdapter', ->
  describe 'find()', ->
    beforeEach ->
      @adapter = new cache.MemoryCacheAdapter

      Promise.bind(@).then ->
        @adapter.find('001')
      .then (dict1) ->
        @dict1 = dict1
        @adapter.store('001', '001': {})
        @adapter.find('001')
      .then (dict2) ->
        @dict2 = dict2

      it 'returns dictionary of address', ->
        assert.ok @dict1 == null
        assert.ok @dict2 != null
