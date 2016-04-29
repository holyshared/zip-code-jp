build:
	wget http://www.post.japanpost.jp/zipcode/dl/oogaki/zip/ken_all.zip
	node lib/cli.js -o json
clean:
	-rm ken_all.zip
	-rm json/*.json
