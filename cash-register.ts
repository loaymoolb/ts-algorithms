// Cash Register

// Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

// cid is a 2D array listing available currency.

// The checkCashRegister() function should always return an object with a status key and a change key.

// Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

// Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

// Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

// Currency Unit	Amount
// Penny	$0.01 (PENNY)
// Nickel	$0.05 (NICKEL)
// ...
// See below for an example of a cash-in-drawer array:

// [
//   ["PENNY", 1.01],
//   ["NICKEL", 2.05],
//   ...
// ]

type CurrencyType = 'PENNY' | 'NICKEL' | 'DIME' | 'QUARTER' | 'ONE' | 'FIVE' | 'TEN' | 'TWENTY' | 'ONE HUNDRED';
type CurrencyUnit = [CurrencyType, number];
type CashRegisterResponse = {status: string, change: CurrencyUnit[]};

function checkCashRegister(price: number, cash: number, cid: CurrencyUnit[]): CashRegisterResponse {
  // Calculate the change due and round it to 2 decimal places
  let changeDue = Math.round((cash - price) * 100) / 100;

  // Calculate the total cash in the drawer
  let totalCid = cid.reduce((total, [_, amount]) => total + amount, 0);

  // Create an array of currency units in descending order of value
  const currencyValues: Record<CurrencyType, number> = {
    'PENNY': 0.01,
    'NICKEL': 0.05,
    'DIME': 0.1,
    'QUARTER': 0.25,
    'ONE': 1,
    'FIVE': 5,
    'TEN': 10,
    'TWENTY': 20,
    'ONE HUNDRED': 100,
  };
  const currencyUnits: CurrencyType[] = ['ONE HUNDRED', 'TWENTY', 'TEN', 'FIVE', 'ONE', 'QUARTER', 'DIME', 'NICKEL', 'PENNY'];

  // Initialize the change array
  const change: CurrencyUnit[] = [];

  // Loop through the currency units and calculate the amount of each currency to return
  for (const currencyUnit of currencyUnits) {
    const unitValue = currencyValues[currencyUnit];
    if (changeDue >= unitValue) {
      const maxAmount = Math.floor(cid[currencyUnits.indexOf(currencyUnit)][1] / unitValue) * unitValue;
      let amount = 0;
      while (changeDue >= unitValue && maxAmount > amount) {
        changeDue = Math.round((changeDue - unitValue) * 100) / 100;
        amount = Math.round((amount + unitValue) * 100) / 100;
      }
      if (amount > 0) {
        change.push([currencyUnit, amount]);
      }
    }
  }

  // Check if the change due is zero and if the cash in the drawer equals the change due
  if (changeDue === 0 && totalCid === cash - price) {
    return {status: 'CLOSED', change: cid};
  }

  // Check if the change due is zero and if there is sufficient cash in the drawer
  if (changeDue === 0) {
    return {status: 'OPEN', change};
  }

  // Return insufficient funds if the change due is greater than the total cash in the drawer
  return {status: 'INSUFFICIENT_FUNDS', change: []};
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);