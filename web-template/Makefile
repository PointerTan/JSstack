.PHONY: css
css:
	mkdir -p bundle
	postcss --watch --use autoprefixer --use postcss-import ./original-app.css --output css/app.css

.PHONY: server
server:
	browser-sync start --server --files='index.html,css/*.css,js/*.js'


.PHONY: clean
clean:
	rm -r css/app.css