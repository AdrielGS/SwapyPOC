// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// import "bootstrap/dist/css/bootstrap.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract';

// Import our contract artifacts and turn them into usable abstractions.
import FundraisingOffer_artifact from '../../build/contracts/FundraisingOffer.json'

// Wallet is our usable abstraction, which we'll use through the code below.
var FundraisingOffer = contract(FundraisingOffer_artifact);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var investor;
var creditCompany;

window.App = {
	start: function() {
		var self = this;

		// Bootstrap the MetaCoin abstraction for Use.
		FundraisingOffer.setProvider(web3.currentProvider);

		//Get static aacount for test
		web3.eth.getAccounts(function(err, accs) {
			if (err != null) {
				alert("There was an error fetching your accounts.");
				return;
			}

			if (accs.length == 0) {
				alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
				return;
			}

			investor = accounts[0]; //Static accounts
			creditCompany = accounts[1];  //Static accounts

		});

		FundraisingOffer.deployed.then(function(instance){

			return instance.start(1, 25000, 10, 6); // Adding static example to the application

		});.then(function(result) {

	    }).catch(function(err) {

	    });


	},	

	invest: function(){

		var contractID = ; // It would come from the frontend application
		var investmentValue = ; // It would come from the frontend application
		var installmentsNumber = ; // It would come from the frontend application


		FundraisingOffer.deployed.then(function(instance){

			return instance.invest(contractID, totalValue, installmentsNumber);

		});.then(function(result) {

			var assetValue = totalValue / installmentsNumber;
  		 	var monthlyPayment = instance.getMonthlyPaymentDealByID();

  		 	sendAssetToCreditCompany(investor, creditCompany, assetValue);
  		 	
  		 	sendMonthlyPaymentToInvestor(creditCompany, investor, monthlyPayment);

	    }).catch(function(err) {

	    });
	},

	sendAssetToCreditCompany: function(investor, creditCompany, assetValue){

		// Send value from investment from Investor to the Credit Company
		// How to call this function 'installmentsNumber' times every month ? Should it be done in the contract (in Solidity) or here ? 
		instance.sendTransaction({from: investor, to: creditCompany, value: assetValue}); //Currently this asset value is given in not-digital currency (e.g., USD). How to convert it in digital currency(Ether)? 

	},

	sendMonthlyPaymentToInvestor: function(creditCompany, investor, monthlyPayment){

		// Credit company send monthly value to Investor from its investment
		// How to call this function every month ? Should it be done in the contract (in Solidity) or here ? 
		instance.sendTransaction({from: creditCompany, to: investor, value: monthlyPayment}); //Currently this monthyPayment is given in not-digital currency (e.g., USD). How to convert it in digital currency(Ether)? 

	},
}