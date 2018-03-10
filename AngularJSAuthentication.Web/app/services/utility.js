'use strict';
app.service('UtilityObject', [function () {



    //250	$15 	$25 	$35 
    //500	$20 	$50 	$70 
    //750	$50 	$75 	$105 
    //1000	$75 	$100 	$150 
    //2000	$100 	$150 	$300 
    //3000	$200 	$350 	$450 
    //5000	$250 	$450 	$700 
    //10, 000	$500 	$800 	$1, 400
    //15, 000	$750 	$1, 350 	$2, 100
    //20, 000	$1, 000 	$1, 650 	$2, 800 

    this.pricingAmount = function (wordCount, deliveryType) {
        var amount = 0;
        if (wordCount > 250 && deliveryType == "Express") {
            amount = 15;
            return amount
        }
        else {

        }

    };


}]);
