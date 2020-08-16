#!/usr/bin/env node

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(`
  <!DOCTYPE html>
    <head>
    </head>
    <body>
      <div class="outer">
        <div class="select">
          <div class="inner">
          </div>
        </div>
      </div>

      <section>
        <p>Hello world</p>
      </section>

      <section>
        <section>
          <p>another helloworld</p>
        </section>
      </section>

    </body>
  </html>
`);

// console.log(dom.window.document.querySelectorAll("body section").length);
// console.log(dom.window.document.querySelectorAll("body section")[2].innerHTML)

const ele_body = dom.window.document.querySelector('body')
const sections = ele_body.querySelectorAll(':scope>section')
console.log(sections[1].innerHTML)
