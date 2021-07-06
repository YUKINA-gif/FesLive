<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
Vue.component("font-awesome-icon", FontAwesomeIcon);
export default {
  data() {
    return {};
  },
};
</script>

<style>
/* ===============
   リセットCSS
=============== */
html,
body,
div,
span,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
abbr,
address,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
samp,
small,
strong,
sub,
sup,
var,
b,
i,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
}

body {
  line-height: 1;
}

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

nav ul {
  list-style: none;
}

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}

a {
  margin: 0;
  padding: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
}
h2 {
  font-size: 18px;
}

/* change colours to suit your needs */
ins {
  background-color: #ff9;
  color: #000;
  text-decoration: none;
}

/* change colours to suit your needs */
mark {
  background-color: #ff9;
  color: #000;
  font-style: italic;
  font-weight: bold;
}

del {
  text-decoration: line-through;
}

abbr[title],
dfn[title] {
  border-bottom: 1px dotted;
  cursor: help;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

li {
  list-style: none;
}

/* change border colour to suit your needs */
hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #cccccc;
  margin: 1em 0;
  padding: 0;
}

input,
select {
  vertical-align: middle;
  outline: none;
  border-radius: 2px;
  border: 1px solid #c2c2c2;
}

.flex {
  display: flex;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.title {
  color: gray;
  border-bottom: 2px solid rgb(194, 104, 194);
  border-left: 5px solid rgb(194, 104, 194);
  width: 120px;
  margin: 10px;
  padding: 0 0 2px 2px;
}
</style>
