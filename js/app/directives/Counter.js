function Counter() {
	return {
		template: [
			'<div>',
				'<h3>Counter</h3>',
				'<div>Click anywhere to increment the counter!</div>',
				'<div>Current count: {{ some.count }}</div>',
			'</div>'
		].join(''),
		controller: function () {
			this.count = 0;
		},
		//use require and controllerAs to eliminate '$scope' from controller
		require:'counter',
		controllerAs: 'some',
		link: function(scope, elem, attrs, ctrl) {
			//add listener to 'document' object to permit clicking anywhere, not just directive
			document.addEventListener('click', function() {
				ctrl.count += 1;
				//call $apply to trigger re-$digest of DOM
				scope.$apply();
			});
			//destroy listener before unmounted from DOM
			scope.$on('$destroy', function() {
				elem.off();
			});
		}
	}
}

angular
	.module('app')
	.directive('counter', Counter);