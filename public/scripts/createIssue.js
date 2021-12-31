
let pW = document.getElementById("preview-viewer");
let tA = document.getElementById("md-description-area");

let converter = new showdown.Converter();
converter.setOption("headerLevelStart", 3);
converter.setOption("strikethrough", true);
converter.setOption("smoothLivePreview", true);
converter.setFlavor("github");

tA.addEventListener("input", () => {
    let md = tA.value;
    let html = converter.makeHtml(md);
    pW.innerHTML = html;
    

    document.querySelectorAll('code').forEach(el => {
        // then highlight each
        hljs.highlightElement(el);
    });

});

tA.addEventListener('keydown', function(e) {
    if (e.key == 'Tab') {
      e.preventDefault();
      var start = this.selectionStart;
      var end = this.selectionEnd;
  
      // set textarea value to: text before caret + tab + text after caret
      this.value = this.value.substring(0, start) +
        "\t" + this.value.substring(end);
  
      // put caret at right position again
      this.selectionStart =
        this.selectionEnd = start + 1;
    }
  });