pragma solidity ^0.4.2;

contract FundraisingOffer {

	struct CompanyContract { //Contract offered by a credit company
		uint contractID;
		uint investmentValue;
		uint ROI;
		uint paybackTime;
	}

	struct Deal { // A contract made between an investor and a company
		uint contractID;
		address companyAddress;
		address investorAddress;
		uint totalValue; // Total value invested
		uint installmentsNumber; // Value to be invested each month
		uint monthlyPayment; // value the investor will receive from the credit company
	}

	CompanyContract[] companyContracts; // Put struct in another contract and make this variable available here

	uint dealID;

	mapping(uint => Deal) dealsConfirmed;

	function invest(uint contractID, address companyAddress, uint totalValue, uint installmentsNumber) returns(uint){ //Args comes from the frontend application

		uint companyContractIndex = getContractIndexByID(contractID);
		CompanyContract companyContract = companyContracts[companyContractIndex];

		uint monthlyPayment = calculateMonthlyPayment(totalValue, companyContract.ROI);

		dealsConfirmed[dealID] = Deal(contractID, companyAddress, msg.sender, totalValue, installmentsNumber, monthlyPayment); //Record from the contract made between an investor and a credit company
		dealID++;
		return dealID;
	}

	function getContractIndexByID(uint contractID) constant returns(uint){

		for(uint i = 0; i < companyContracts.length; i++){
			if(companyContracts[i].contractID == contractID){
				return i;
			}
		}

	}

	function getMonthlyPaymentDealByID(uint dealID) constant returns(uint){

		return dealsConfirmed[dealID].monthlyPayment;
	}

	function calculateMonthlyPayment(uint totalValue, uint ROI) constant returns(uint){

		// Solidity does not have float/double type variables. What's the correct way of doing this type of calculation ?
		// The value of each division operation is going to be truncated which will not generate an accurate value

		return (totalValue * ROI/100)/12;
	}


}