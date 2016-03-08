var selectedSession;
var selectedSessionNumber;

$(function() {
	$(".session-choice").click(function(e) {
		$(".session-choice").removeClass("focus");
		var clickedSession = $(e.target);
		clickedSession.addClass("focus");
		selectedSession = clickedSession.html();
		selectedSessionNumber = clickedSession.data("number")
	})

	var handler = StripeCheckout.configure({
	    key: 'pk_live_KEOmKcPh5aQq39FAOTGjNLfh',
	    // key: 'pk_test_BxqisMyL0ZKapZjhgfNpzHhr',
	    image: '/img/rocket.svg',
	    name: "Launch Camp",
	    locale: 'auto',
	    token: submitInfo
	  });

	  // Close Checkout on page navigation
	  $(window).on('popstate', function() {
	    handler.close();
	  });

	$(".submit-application").click(function() {	
		// first validate all the inputs

		console.log("validating!");
		
		if (!selectedSession) {
			$(".no-session").show();
		} else if (!$(".application-form").valid()) {
			$(".info-error").show();
		} else {
			var price;
			if (crunchTimeSelected()) {
				price = 119900;
			} else {
				price = 99900
			}

			handler.open({	     
		      description: selectedSession,
		      amount: price,
		      email: $("#email").val(),
		      allowRememberMe: false
		    });	
		}	
	})

	function crunchTimeSelected() {
		return $(".crunch-time-checkbox")[0].checked
	}

	function submitInfo(token) {
		var application = $(".application-form")
		$(".submit-application").addClass("btn-warning").html("Sending...");

		var enrollmentData = {};

		$(".application-form input").each(function(i, el) {
			enrollmentData[el.name] = $(el).val();
		})

		enrollmentData["session-number"] = selectedSessionNumber;
		enrollmentData["crunch-time"] = crunchTimeSelected();

		$.ajax({
			url: "/enroll",
			method: "POST",			
			data: {enrollment_data: enrollmentData, token: token}
		}).then(function() {
			// lock the height
			application.css({height: application.height()});

			// keeps the footer from being overlaid
			$(".success-text").css("padding-bottom", "80px");

			// then bring up the curtain
			$(".curtain").animate({"height": 0}, {
				duration: 500,
				complete: function() {
					$(".success-text").show();
					$(".submit-application").addClass("btn-success").html("Success");
				} 
			})				
			return
		}).fail(function(resp) {
			$(".submit-application").removeClass("btn-warning").addClass("btn-primary").val("Proceed to Payment");	
			console.log(resp);
			$(".payment-error").html(resp.responseJSON.message + " Please try again.");
			$(".payment-error").show();
		})		
	}	
})
