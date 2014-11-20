(function() {
	'use strict';
	window.MySalary = MySalary;

	function MySalary(grossSalary) {
		this.grossSalary = grossSalary || 0;
		this.SS = {
			temporal: 6.4,
			permanent: 6.35
		};

		this.DEDUCTIONS = {
			general: 2652,
			// taxpayer: 5151
		};
	}

	MySalary.prototype.setSalary = function(salary) {
		this.grossSalary = salary;
	};

	MySalary.prototype.ss = function (temporal) {
		return (temporal ? this.SS.temporal : this.SS.permanent) / 100;
	};

	MySalary.prototype.irpf = function () {
		var ranges = [
			{ min: 0, max: 17707, percent: 24, extra: .75 },
			{ min: 17707, max: 33007, percent: 28, extra: 2 },
			{ min: 33007, max: 53407, percent: 37, extra: 3 },
			{ min: 53407, max: 120000, percent: 43, extra: 4 },
			{ min: 120000, max: 175000, percent: 44, extra: 5 },
			{ min: 175000, max: 300000, percent: 45, extra: 6 },
			{ min: 300000, percent: 45, extra: 7 }
		];

		var ranges2015 = [
			{ min: 0, max: 12450, percent: 24, extra: 0 },
			{ min: 12450, max: 20200, percent: 28, extra: 0 },
			{ min: 20200, max: 35200, percent: 37, extra: 0 },
			{ min: 35200, max: 60000, percent: 43, extra: 0 },
			{ min: 60000, percent: 45, extra: 7 }
		];

		var base = this.grossSalary, total = 0;
		for(var i = 0; i < ranges.length; i++) {
			var range = ranges[i];
			if(this.grossSalary > range.min) {
				if(this.grossSalary < range.max || !range.max) {
					total += (base * (range.percent + range.extra) / 100);
					break;
				}
				else {
					var dif = range.max - range.min;
					total += (dif * (range.percent + range.extra) / 100);
					base -= dif;
				}
			}
			else {
				break;
			}
		}

		// Law: Deducción general por rendimiento del trabajo 2.652,00
		// for(var i in this.DEDUCTIONS) {
		// 	total -= this.DEDUCTIONS[i];
		// }

		// console.log('IRPF', total);

		// TODO: Add IRPF deductions
		return total;
	};

	MySalary.prototype.calculateSalary = function () {
		var temporal = false;
		if (typeof props !== 'undefined') {
			temporal = props.temporal || false;	
		}
		
		var ss = this.grossSalary * this.ss(temporal);
		var irpf = this.irpf();
		var total = this.grossSalary - ss - irpf;

		return {
			net: total,
			irpf: irpf,
			ss: ss
		};
	}

	MySalary.prototype.calculateNetSalary = function (props) {
		var temporal = false, split = 1;
		if (typeof props !== 'undefined') {
			temporal = props.temporal || false;	
			split = props.payments || 1;
		}
		
		var total = this.grossSalary - this.grossSalary * this.ss(temporal) - this.irpf();
		return total / split;
	}
}());