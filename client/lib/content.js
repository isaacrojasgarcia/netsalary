if (Meteor.isClient) {
	var mySalary = new MySalary();
	var inputGross = null;
	var result = {
		gross: 0,
		net: 0
	};


	// counter starts at 0
	Session.setDefault("counter", 0);

	Template.content.helpers({
		mySalary: function () {
			return;
		}
	});

	Template.content.events({
		'keyup .calculate-input': function (event) {
			result.gross = inputGross.val();
			mySalary.setSalary(parseInt(result.gross));
			result.net = mySalary.calculateNetSalary();

			$('#gross-salary').html(getFormatedSalary(result.gross));
			$('#net-salary').html(getFormatedSalary(result.net));
			$('#monthly-salary').html(getFormatedSalary(result.net / 12));
		}
	});

	Template.content.rendered = function() {
		inputGross = $('.calculate-input').focus();
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