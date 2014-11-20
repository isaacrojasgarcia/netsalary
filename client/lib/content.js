if (Meteor.isClient) {
	var mySalary = new MySalary();
	var inputGross = null;

	var gross = 0, result = {};

	var pieChart, chartContext;
	
	// counter starts at 0
	Session.setDefault("counter", 0);

	Template.content.helpers({
		mySalary: function () {
			return;
		}
	});

	Template.content.events({
		'keyup .calculate-input': function (event) {
			gross = inputGross.val();
			mySalary.setSalary(parseInt(gross));
			result = mySalary.calculateSalary();

			$('#gross-salary').html(getFormatedSalary(gross));
			$('#net-salary').html(getFormatedSalary(result.net));
			$('#monthly-salary').html(getFormatedSalary(result.net / 12));

			pieChart.segments[0].value = Math.round(result.net / gross * 100);
			pieChart.segments[1].value = Math.round(result.irpf / gross * 100);
			pieChart.segments[2].value = Math.round(result.ss / gross * 100);
			pieChart.update();
		}
	});

	Template.content.rendered = function() {
		inputGross = $('.calculate-input').focus();

		var data = [
			    {
			        value: 100,
			        color:"#F7464A",
			        highlight: "#FF5A5E",
			        label: "Net Salary"
			    },
			    {
			        value: 0,
			        color: "#46BFBD",
			        highlight: "#5AD3D1",
			        label: "IRPF"
			    },
			    {
			        value: 0,
			        color: "#FDB45C",
			        highlight: "#FFC870",
			        label: "Social Security"
			    }
			];

		var options = {
		    responsive : true
		};

		// Chart
		chartContext = $('#result-chart').get(0).getContext("2d");
		pieChart = new Chart(chartContext).Doughnut(data, options);
	};

	function getFormatedSalary(salary) {
		currencyFormat = '0,0.00';
		return numeral(salary).format(currencyFormat);
	}
}




// var amount = 51000;
	// var mySalary = new MySalary(amount);
	// console.log('Monthly Salary: ' + amount + ' and NOT temporal', mySalary.calculateNetSalary({payments: 12}));

	// console.log($('#calculate'));

	// $(document).ready(function() {
	// 	var gross = $('.calculate-form input').focus().val();

	// 	$('.calculate-form .button').on('click', function() {
	// 		var f = '0,0.00';
	// 		var gross = $('.calculate-form input').val();
	// 		var mySalary = new MySalary(gross);

	// 		$('#gross-salary').html  ( numeral( gross ).format(f) );
	// 		$('#net-salary').html    ( numeral( mySalary.calculateNetSalary() ).format(f) );
	// 		$('#monthly-salary').html( numeral( mySalary.calculateNetSalary({payments:12}) ).format(f) );
	// 	});
	// });