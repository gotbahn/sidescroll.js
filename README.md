# ↕ sidescroll.js

Accessible fixed Sidebar with Smart Scroll.

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

#### Options

| Name | Type | Default value | Description |
| --- | --- | --- | --- |
| **content** | `selector` | `'.container'` | container selector |
| **fixedClass** | `string` | `'is-fixed'` | sidebar fixed class name |

```javascript
$('.sidebar').sideScroll({
	content: '.my-content',
	fixedClass: 'my-fixed'
});
```

#### Commands

| Name | Description |
| --- | --- |
| **start** | plugin initialize, also can be used as continue after stop |
| **stop** | plugin stops working, but saved current position |
| **clear** | plugin stops working and reset sidebar position |

```javascript
$('.sidebar').sideScroll('start');
$('.sidebar').sideScroll('stop');
$('.sidebar').sideScroll('clear');
```

This overrides fixed class name, which applying to sidebar

## Browsers support

| <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png" alt="IE / Edge" width="16px" height="16px" /></br>IE / Edge | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="16px" height="16px" /></br>Firefox | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="16px" height="16px" /></br>Chrome | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png" alt="Safari" width="16px" height="16px" /></br>Safari | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/opera.png" alt="Opera" width="16px" height="16px" /></br>Opera | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari-ios.png" alt="iOS Safari" width="16px" height="16px" /></br>iOS Safari | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/opera-mini.png" alt="Opera Mini" width="16px" height="16px" /></br>Opera Mini | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome-android.png" alt="Chrome for Android" width="16px" height="16px" /></br>Chrome for Android |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| IE9, IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions

## Contributing

I'll check out your contribution if you:

* Have a clear and comprehensive description for your changes in pull request.

## License

MIT
