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
});
