pragma solidity ^0.4.18;

library ConvertLib{
	function convert(uint256 amount,uint256 conversionRate) returns (uint256 convertedAmount)
	{
		return amount * conversionRate;
	}
}
