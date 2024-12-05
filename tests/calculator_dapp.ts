const assert = require('assert');
const anchor = require('@coral-xyz/anchor');
const { SystemProgram } = anchor.web3;

describe('calculator', () => {
  // Configure the provider
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);

  // Generate keypair and fetch program
  const calculator = anchor.web3.Keypair.generate();
  const calculatorProgram = anchor.workspace.calculator_dapp;

  it('CREATE A CALCULATOR', async () => {
    // Call the create method
    await calculatorProgram.rpc.create("Welcome to solana", {
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [calculator],
    });

    // Fetch the account and validate
    const account = await calculatorProgram.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.greeting === "Welcome to solana");
  });

  it('ADD TWO NUMBERS', async () => {
    // Call the add method
    await calculatorProgram.rpc.add(new anchor.BN(10), new anchor.BN(2), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });
    
    // Fetch the account and validate
    const account = await calculatorProgram.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(12)));
  })


  it ('SUBTRACT TWO NUMBERS', async () => { 
    // Call the subtract method
    await calculatorProgram.rpc.subtract(new anchor.BN(10), new anchor.BN(2), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });

    // Fetch the account and validate
    const account = await calculatorProgram.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(8)));
  })

  it ('MULTIPLY TWO NUMBERS', async () => {  
    // Call the multiply method
    await calculatorProgram.rpc.multiply(new anchor.BN(10), new anchor.BN(2), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });

    // Fetch the account and validate
    const account = await calculatorProgram.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(20)));
  })
  
  it('DIVIDE TWO NUMBERS', async () => {
  // Call the divide method
  await calculatorProgram.rpc.divide(new anchor.BN(10), new anchor.BN(2), {
    accounts: {
      calculator: calculator.publicKey,
    },
  });

  // Fetch the account and validate
  const account = await calculatorProgram.account.calculator.fetch(calculator.publicKey);
  assert.ok(account.result.eq(new anchor.BN(5)));
  assert.ok(account.remainder.eq(new anchor.BN(0)));
});

});
