use anchor_lang::prelude::*;

declare_id!("4LSZiXMKLkGeAmX6NMwWmoNn3Nna19HMT6i8iuxo8c76");

#[program]
pub mod calculator_dapp {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
