import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { assert } from "chai";

describe("calculator_dapp", () => {
  // Configure the client to use the local provider.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.CalculatorDapp as Program<any>;
  const calculator = anchor.web3.Keypair.generate();

  it("Creates a calculator", async () => {
    // Call the create method
    await program.methods
      .create("Welcome to Solana")
      .accounts({
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([calculator])
      .rpc();

    // Fetch the account and validate
    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.strictEqual(account.greeting, "Welcome to Solana");
  });

  it("Adds two numbers", async () => {
    await program.methods
      .add(new anchor.BN(10), new anchor.BN(20))
      .accounts({
        calculator: calculator.publicKey,
      })
      .rpc();

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.strictEqual(account.result.toNumber(), 30);
  });

  it("Subtracts two numbers", async () => {
    await program.methods
      .subtract(new anchor.BN(15), new anchor.BN(5))
      .accounts({
        calculator: calculator.publicKey,
      })
      .rpc();

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.strictEqual(account.result.toNumber(), 10);
  });

  it("Multiplies two numbers", async () => {
    await program.methods
      .multiply(new anchor.BN(3), new anchor.BN(4))
      .accounts({
        calculator: calculator.publicKey,
      })
      .rpc();

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.strictEqual(account.result.toNumber(), 12);
  });

  it("Divides two numbers", async () => {
    await program.methods
      .divide(new anchor.BN(20), new anchor.BN(4))
      .accounts({
        calculator: calculator.publicKey,
      })
      .rpc();

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.strictEqual(account.result.toNumber(), 5);
    assert.strictEqual(account.remainder.toNumber(), 0);
  });

  it("Handles division by zero", async () => {
    try {
      await program.methods
        .divide(new anchor.BN(10), new anchor.BN(0))
        .accounts({
          calculator: calculator.publicKey,
        })
        .rpc();

      assert.fail("Division by zero should throw an error");
    } catch (err) {
      assert.strictEqual(err.error.errorCode.number, 6000); // DivisionByZero error code
      assert.strictEqual(err.error.errorMessage, "Division by zero is not allowed.");
    }
  });
});
