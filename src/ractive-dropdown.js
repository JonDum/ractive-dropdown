
require('./styles.styl');

var doc = document, win = window;
var id = 'ractive-dropdown-container';

module.exports = Ractive.extend({

	template: require('./template.html'),

	data: function() {
		return {
            mode: 'click',
			open: false,
		}
	},

	events: {
		hover: require('ractive-events-hover')
	},

	onrender: function() {

		var self = this;

		//hoist the dropdowns into a container on the body
		var dropdown = self.find('.dropdown');

		if(!dropdown)
			return;

		var container = doc.getElementById(id);

		if (!container) {
			container = doc.createElement('div');
			container.id = id;
			container.className = 'ractive-dropdown';
			doc.body.appendChild(container);
		}

		container.appendChild(dropdown);

	},

	oncomplete: function() {

		var self = this;

		var el = self.find('*');
		var dropdown = self.find('.dropdown');

		self.docClickHandler = function(e) {

			if(el.contains(e.target) || dropdown.contains(e.target)) {
				return;
			}

			// block clicks to self
			if( event.target.matches('.ractive-dropdown .dropdown')
			   || event.target.matches('.dropdown *') // for other 'dropdowns' like .ractive-select inside this dropdown
			   || !doc.body.contains(event.target))
				return;

			if(el && !el.contains(event.target)) {
				self.set('open', false);
			}

		}


		// update position on scroll
		self.updatePos = function(e) {
			requestAnimationFrame(function() {
				self.updatePosition();
			});
		};

		self.on('click hover', function(details) {
			var event = details.original;
			var mode = self.get('mode');

			// block clicks to self
			if( event.target.matches('.ractive-dropdown .dropdown')
			   || event.target.matches('.ractive-dropdown .dropdown *')
			   || !document.body.contains(event.target))
				return;

			if(details.name == 'hover' && mode == 'hover') {
				self.set('open', details.hover);
			} else if(details.name == 'click') {
				self.toggle('open');
			}

		});

		self.observe('open', function(open) {

			if(open) {

				dropdown.classList.add('open');

				doc.addEventListener('mousedown', self.docClickHandler);
				win.addEventListener('scroll', self.updatePos, true);
				win.addEventListener('resize', self.updatePos, true);

			} else {

				dropdown.classList.remove('open');

				doc.removeEventListener('mousedown', self.docClickHandler);
				win.removeEventListener('scroll', self.updatePos, true);
				win.removeEventListener('resize', self.updatePos, true);

			}

			self.updatePosition();

		}, {init: false});


	},

	updatePosition: function () {

		var self = this;
		var el = self.find('*');
		var dropdown = self.find('.dropdown');

		//TODO different positions like left, top, right, bottom

		var bounds = el.getBoundingClientRect();
		var dropdownBounds = dropdown.getBoundingClientRect();

		var open = self.get('open');

		var left = bounds.left,
			top = bounds.bottom; // default to below
		
		if(left + dropdownBounds.width > win.innerWidth)
			left -= dropdownBounds.width - bounds.width - 5;

		if(top + dropdownBounds.height > win.innerHeight)
			top -= dropdownBounds.height - bounds.height - 5;

		if(!open)
			left = '-9999';

		dropdown.style.left = left + 'px';
		dropdown.style.top = top + 'px';

	},

	open: function(details) {

		//if(details) {
			//var event = details.original;
			//if (event.target.matches('.ractive-select .dropdown *'))
				//return;
		//}

		this.set('open', true);
	},

	close: function(details) {

		this.set('open', false);

	},

	toggle: function(details) {

		var open = this.get('open');

		this.set('open', !open);
	},

	onteardown: function() {

		doc.removeEventListener('mousedown', self.docClickHandler);
		win.removeEventListener('scroll', self.scrollHandler, true);
		win.removeEventListener('resize', self.updatePos, true);

		// have to manually clean this up since we hoisted it from under ractive's nose
		var dropdown = this.find('.dropdown');

		if(dropdown) {
			dropdown.parentNode.removeChild(dropdown);
		}

		var container = doc.getElementById(id);

		if(container && container.childNodes.length == 0) {
			container.parentNode.removeChild(container);
		}

	},


});
