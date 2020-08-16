#!/usr/bin/env node

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(`
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Hello Bulma!</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css">
    <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
</head>

<body>
    <section class="section">
        <div class="container">
            <h1 class="title">
                Hello World
            </h1>
            <p class="subtitle">
                My first website with <strong>Bulma</strong>!
            </p>
        </div>
    </section>
</body>

</html>
`)

// const dom = new JSDOM(`
//   <!DOCTYPE html>
//     <head>
//     </head>
//     <body>
//       <div class="outer">
//         <div class="select">
//           <div class="inner">
//           </div>
//         </div>
//       </div>

//       <section>
//         <p>Hello world</p>
//       </section>

//       <section>
//         <section>
//           <p>another helloworld</p>
//         </section>
//       </section>

//     </body>
//   </html>
// `);

// console.log(dom.window.document.querySelectorAll("body section").length);
// console.log(dom.window.document.querySelectorAll("body section")[2].innerHTML)

const ele_body = dom.window.document.querySelector('body')
const sections = ele_body.querySelectorAll(':scope>section')
console.log(sections[0].innerHTML)
