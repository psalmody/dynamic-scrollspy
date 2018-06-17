# Dynamic-Scrollspy
by Michael Tallino @psalmody

[![NPM version](http://img.shields.io/npm/v/dynamic-scrollspy.svg)](https://www.npmjs.com/package/dynamic-scrollspy)
[![Downloads](https://img.shields.io/npm/dm/dynamic-scrollspy.svg)](https://www.npmjs.com/package/dynamic-scrollspy)
[![Join the chat at https://gitter.im/node-schedule/node-schedule](https://img.shields.io/badge/gitter-chat-green.svg)](https://gitter.im/psalmody/dynamic-scrollspy?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

jQuery plugin to dynamically generate a `.nav` outline and setup Bootstrap scrollspy.

Bootstrap 4 works now - see notes at the end on how to use it.

## Installation

Include [Bootstrap 3+ or 4+](http://getbootstrap.com) and [jQuery 1.11+ or 2.0+ or 3.0+](http://jquery.com).

Download from [GitHub Project Page](https://github.com/psalmody/dynamic-scrollspy) or:

Bower:
```
bower install dynamic-scrollspy
```

NPM:
```
npm install dynamic-scrollspy
```

Include:

```html
<script type="text/javascript" src="build/dynamicscrollspy.min.js"></script>
```

## Usage

Basic usage: setup a div or nav area to put the auto-generated nav outline in.

> Requires all H1 - H6 tags live at the same DOM level.

```js
$('#somediv').DynamicScrollspy();
```

### Options

Options may be specified at time of initiation:

```js
$('#somediv').DynamicScrollspy({
  affix: true, //affix by default, doesn't work on Bootstrap 4
  tH: 2, //lowest-level header to be included (H2)
  bH: 6, //highest-level header to be included (H6)
  exclude: false, //exclude from the tree/outline any H tags matching this jquery selector
  genIDs: false, //generate random IDs for headers?
  offset: 100, //offset from viewport top for scrollspy
  ulClassNames: 'hidden-print', //add this class to top-most UL
  activeClass: '', //active class (besides .active) to add to LI
  testing: false //if testing, append heading tagName and ID to each heading
})
```

### Destroy / Rebuild

Destroy with:

```js
$('#somediv').DynamicScrollspy('destroy');
```

Or just refresh by calling again. Settings will be saved from first call unless
overriden at this time:

```js
$('#somediv').DynamicScrollspy();
```

### Horizontal Nav scrollspy

It is possible to use this package for a top/bottom navbar style scrollspy.

See `/tests/horizontal.html` for an example. Mainly, settings would require changes:

```javascript
$('#somediv').DynamicScrollspy({
  affix: false, //needs to be false, instead setup navbar with affix if needed
  ulClassNames: 'navbar-nav', //the #somediv should be the navbar-collapse div
  tH: 2, //this is the default anyway
  bH: 2 //likely need to limit to one level of H* tags so the nav isn't unweildy
})
```

### CSS - Bootstrap 3

Some example CSS for styling a right-side list (like on [Bootstrap's docs pages](http://getbootstrap.com/css/)) Also see `/tests/basic.html`.

```css
/* nav */
.nav {
  padding-left: 0px;
}
/* all anchors */
.nav > li > a {
  padding: 3px;
  border-left: 0px rgba(0,0,0,0);
}
/* first level */
.nav li >  a {
  padding-left: 10px;
}
/* second */
.nav .nav li >  a {
  padding-left: 20px;
  font-size:.9em;
}
/* third */
.nav .nav .nav li >  a {
  padding-left: 30px;
  font-size:.8em;
}
/* fourth */
.nav .nav .nav .nav li >  a {
  padding-left: 40px;
}
/* fifth */
.nav .nav .nav .nav .nav li >  a {
  padding-left: 50px;
}
/* active link */
li.active > a {
  font-weight:bold;
  border-left: 2px solid gray;
}
/* hide second level lists */
.nav .nav {
  display:none;
}
/* show second-level when active */
.nav > .active > .nav {
  display: block;
}
```

## Bootstrap 4

Affix doesn't exist in Bootstrap 4. You'll need some extra CSS to make things work:

```CSS
/* Bootstrap 4 Differences */
#scrollspy>ul.nav {
  /* for affix if wanted */
  position: fixed;
  /* vertical orientation */
  flex-direction: column;
}
/* bootstrap 4 puts the scrollspy .active on
     the <a> instead of the <li> item */
.nav>li>a.active {
    font-weight: bold;
    border-left: 2px solid gray;
}
/* need to see the child <ul> */
.nav-link.active+ul.nav.child {
    display: block;
}
```

## Contributing

Feel free! Fork it, create a branch, etc.
