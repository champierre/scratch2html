# Scratch2HTML

Scratch2HTML is [ScratchX](http://scratchx.org/) extension that enable to build HTML page using Scratch blocks.

![Scratch2HTML Demo](http://champierre.github.io/scratch2html/images/scratch2html.gif)

## Install Helper App

To use Scratch2HTML, you need to install Helper App. You need Ruby to run it.

```
% cd workdir
% wget https://champierre.github.com/scratch2html/scratch2html.rb
```

## Run Scratch2HTML

1. Open [ScratchX](http://scratchx.org/) page.
2. Click "Open Extension URL" and paste the following URL, then click "Open".

	```
	http://champierre.github.io/scratch2html/scratch2html.js
	```
3. On Warning dialog, click "I understand, continue" if you trust Scratch2HTML.
4. Run the Helper App:

	```
	cd workdir
	ruby scratch2html.rb
	```

5. Build HTML page using Scratch blocks, and click it to send to the Helper App.

	![blocks](http://champierre.github.io/scratch2html/images/blocks.png)

6. From a browser, access to http://localhost:5678/.
