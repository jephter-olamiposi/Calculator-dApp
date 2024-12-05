use anchor_lang::prelude::*;

declare_id!("4LSZiXMKLkGeAmX6NMwWmoNn3Nna19HMT6i8iuxo8c76");

#[program]
pub mod calculator_dapp {
    use anchor_lang::solana_program::entrypoint::ProgramResult;

    use super::*;
    pub fn create(ctx: Context<Create>, init_message: String) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        calculator.greeting = init_message;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer = user, space = 256)]
    pub calculator: Account<'info, Calculator>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Calculator {
    pub greeting: String,
    pub result: i32,
    pub remainder: i32,
}
