# ↕ sidescroll.js

Accessible Sidebar with Smart Scroll.

## About

There is different cases when you are using sidebar and often CSS just not enough to make it user friendly.
What scenarios you should be considered to make sidebar always accessible.

- ![Window color](/proto/window.png) W - Window
- ![Sidebar color](/proto/sidebar.png) S - Sidebar
- ![Content color](/proto/content.png) C - Content

| S >= C, S <= W, C <= W | S > C, S >= W, C <= W |
| ------------- | ------------- |
| Simplest scenario when Sidebar greater or equal Content height and less than Window height. For this case is nothing be worried about, static position is pretty enough.![case 1](/proto/case1.png)  | Another static scenario is when Sidebar is greater than Content height and they both can be greater than window size. Scroll will be determinated by Sidebar height. ![case 2](/proto/case2.png)  |

| S < C, S <= W, C > W | S < C, S > W, C > W |
| ------------- | ------------- |
| Sidebar is less than Content and Window heights. In this cases static position is not enough. Sidebar should be fixed to be always visible. ![case 3](/proto/case3.png) | And most complicated scenario is when Sidebar less than Content height and greater with Content than window size. In this case fixed position is not enough. Sidebar should be scrollable. ![Case 4](/proto/case4.png) |

To make it happen was created sidescroll.js plugin.

## Demo

To checkout all scenarios [try live demo](http://godban.com.ua/projects/sidescroll/ "slidescroll.js demo").


## Installation

    bower install sidescroll

or grab the [source version](https://raw.githubusercontent.com/godban/sidescroll/master/dist/jquery.sidescroll.js) or [minified version](https://raw.githubusercontent.com/godban/sidescroll/master/dist/jquery.sidescroll.min.js) and put it right before closing body tag or into head after jQuery.

```html
	...
	<script src="pathto/jquery.min.js"></script>
	<script src="pathto/jquery.sidescroll.min.js"></script>
	<script>
		$('.sidebar').sideScroll();
	</script>
	</body>
</html>
```

## Usage

### Default

Init sideScroll method to your sidebar

```javascript
$('.sidebar').sideScroll();
```

add a line of CSS to your styles

```css
.sidebar.is-fixed {
	position: fixed;
	top: 0;
}
```

### With options

```javascript
$('.sidebar').sideScroll({
	content: '.content',
	fixedClass: 'is-fixed'
});
```

#### Options

##### content
Type: `String`  
Default: `'.container'`

This overrides container class name selector. Can be any jQuery selector.

##### fixedClass
Type: `String`  
Default: `'is-fixed'`

This overrides fixed class name, which applying to sidebar

## Browser support

Chrome, Firefox, Safari, Opera, IE9+/Edge, iOs Safari*, Opera Mini*, Chrome for Android*

\* <small>Little bit buggy in rendering as all fixed elements in mobile browsers</small>

## Contributing

I'll check out your contribution if you:

* Provide a comprehensive suite of tests for your fork.
* Have a clear and documented rationale for your changes.
* Package these up in a pull request.

## License

MIT
