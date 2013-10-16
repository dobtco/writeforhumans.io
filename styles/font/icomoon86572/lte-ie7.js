/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-file' : '&#xe000;',
			'icon-plus' : '&#xe001;',
			'icon-info' : '&#xe002;',
			'icon-book' : '&#xe003;',
			'icon-aid' : '&#xe004;',
			'icon-heart' : '&#xe005;',
			'icon-remove' : '&#xe006;',
			'icon-pen' : '&#xe007;',
			'icon-music' : '&#xe008;',
			'icon-bold' : '&#xe009;',
			'icon-underline' : '&#xe00a;',
			'icon-italic' : '&#xe00b;',
			'icon-indent-increase' : '&#xe00c;',
			'icon-indent-decrease' : '&#xe00d;',
			'icon-plus-2' : '&#xe00e;',
			'icon-happy' : '&#xe00f;',
			'icon-smiley' : '&#xe010;',
			'icon-shocked' : '&#xe011;',
			'icon-sad' : '&#xe012;',
			'icon-confused' : '&#xe013;',
			'icon-angry' : '&#xe014;',
			'icon-cog' : '&#xe015;',
			'icon-numbered-list' : '&#xe016;',
			'icon-list' : '&#xe017;',
			'icon-list-2' : '&#xe018;',
			'icon-link' : '&#xe019;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};