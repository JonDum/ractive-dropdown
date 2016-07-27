# ractive-dropdown

A ractive component to disable child elements in a dropdown on click.

### Demo

[Live Demo](http://jondum.github.com/ractive-dropdown/demo/)

### Install


```
npm install ractive-dropdown --save
```

### Usage

Add the dropdown to your Ractive instance:

```js
Ractive.extend({
    ...
    components: {
        dropdown: require('ractive-dropdown')
    },
    ...
});
```

Use it.

```html
<dropdown>
	<button>Show dropdown</button>
	<div class='dropdown'>
		Dropdown content goes here.
	</div>
</dropdown>
```

The component looks for an element with the `.dropdown` class between the component tags and hoists it to a container that is added to the body.
Everything else in the component becomes the hitarea to open/close the dropdown
The dropdown is then positioned below the hitarea (TODO more positions?)


### Attributes


#### `mode`

Set to `hover` to show/hide the dropdown on hover instead of click. Default: `click`.
