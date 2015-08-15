# AutoScrollspy v 0.0.3
by Michael A Smith @psalmody

jQuery plugin to dynamically generate a `.nav` outline and setup Bootstrap scrollspy.

## Installation

Include [Bootstrap 3+](http://getbootstrap.com) and [jQuery 1.11+ or 2.0+](http://jquery.com).

Download from [GitHub Project Page](https://github.com/psalmody/dynamic-scrollspy).

Include:

```html
<script type="text/javascript" src="dynamicscrollspy.min.js"></script>
```

## Usage

Basic usage: setup a div or nav area to put the auto-generated nav outline in.

```js
$('#somediv').DynamicScrollspy();
```

### Options

Options may be specified at time of initiation:

```js
$('#somediv').DynamicScrollspy({
  tH: 2, //lowest-level header to be included (H2)
  bH: 6, //highest-level header to be included (H6)
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

### CSS

Some example CSS for styling a right-side list (like on [Bootstrap's docs pages](http://getbootstrap.com/css/)) is available in `/tests/basic.html`. Also provided here:

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

## Contributing

Feel free! Fork it, create a branch, etc.
