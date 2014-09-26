(function() {
	var ID_CLOSED = 5, ID_REJECTED = 6;
	if (window.jQuery) {
		// redmine uses jQuery so use it.
		jQuery(document).ready(function() {
			var $ = jQuery;
			var s = $('#issue_status_id');
			if (s.length === 0) {
				return;
			}
			var options = s.get(0).childNodes;
			var needCloseButton = false;
			for (var i = options.length - 1; i >= 0; i--) {
				var option = options[i];
				var v = parseInt(option.value, 10);
				if (v === ID_REJECTED) {
					if (option.selected) {
						needCloseButton = false;
						break;
					}
				}
				if (v === ID_CLOSED) {
					if (option.selected) {
						needCloseButton = false;
						break;
					} else {
						needCloseButton = true;
					}
				}
			}
			
			
			
			var f = $('#issue-form');
			var areas = $('div#content>div.contextual:has(a.icon)');
			if (f.length === 0 || areas.length === 0) {
				return;
			}
			var done_ratio = $('#issue_done_ratio');
			var closer = function(e) {
				s.val(ID_CLOSED);
				done_ratio.val(100);
				f.submit();
			};
			
			var printer = function(e) {
				
			};
			
			var closeButtonTemplate = $('a.redmine-close-button');
			var printButtonTemplate = $('a.redmine-print-button');
			areas.each(function() {
				var closeButton = closeButtonTemplate
					.clone()
					.css('display', 'inline')
					.click(closer);
				var printButton = printButtonTemplate
					.clone()
					.css('display', 'inline')
					.click(printer);

				var delButton = $(this).find('a.icon-del');
				if (delButton.length > 0) {
					if (needCloseButton) {
					closeButton.insertBefore(delButton);
					}
					printButton.insertBefore(delButton);
					
				} else {
					if (needCloseButton) {
					$(this).append(closeButton);
					printButton.insertBefore(closeButton);
					} else {
					$(this).append(printButton);
					}
				}
			});
		});
	} else {
		// redmine uses prototype so use it.
		document.observe('dom:loaded', function() {
			var s = $('issue_status_id');
			if (s === null) {
				return;
			}
			var options = s.childNodes;
			var needCloseButton = false;
			for (var i = options.length - 1; i >= 0; i--) {
				var option = options[i];
				var v = parseInt(option.value, 10);
				if (v === ID_REJECTED) {
					if (option.selected) {
						needCloseButton = false;
						break;
					}
				}
				if (v === ID_CLOSED) {
					if (option.selected) {
						needCloseButton = false;
						break;
					} else {
						needCloseButton = true;
					}
				}
			}
			
			var f = $('issue-form');
			var all_areas = $$('div#content>div.contextual');
			var areas = [];
			for (var ai = 0; ai < all_areas.length; ai++) {
				if (all_areas[ai].select('a.icon').length > 0) {
					areas.push(all_areas[ai]);
				}
			}
			all_areas = null;
			if (f === null || areas.length === 0) {
				return;
			}
			var done_ratio = $('issue_done_ratio');
			var closer = function(e) {
				s.value = ID_CLOSED;
				if (done_ratio) {
					done_ratio.value = 100;
				}
				f.submit();
			};
			var printer = function(e) {
				
			};
			var closeButtonTemplate = $$('a.redmine-close-button')[0];
			var printButtonTemplate = $$('a.redmine-print-button')[0];
			for (ai = 0; ai < areas.length; ai++) {
				var area = areas[ai];
				var closeButton = closeButtonTemplate.cloneNode(true);
				closeButton.style.display = 'inline';
				closeButton.observe('click', closer);
				var printButton = printButtonTemplate.cloneNode(true);
				printButton.style.display = 'inline';
				printButton.observe('click', closer);
				var delButton = area.select('a.icon-del');
				if (delButton.length > 0) {
					if (needCloseButton) {
					delButton[0].insert({ before: closeButton });
					delButton[0].insert({ before: printerButton });			
					}
					
				} else {
					if (needCloseButton) {
					area.appendChild(closeButton);
					}
					area.appendChild(printButton);
				}
			}
		});
	}
})();

