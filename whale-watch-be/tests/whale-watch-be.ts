import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { WhaleWatchBe } from '../target/types/whale_watch_be';

// describe('whale-watch-be', () => {

//   // Configure the client to use the local cluster.
//   anchor.setProvider(anchor.Provider.env());

//   const program = anchor.workspace.WhaleWatchBe as Program<WhaleWatchBe>;

//   it('Is initialized!', async () => {
//     // Add your test here.
//     const tx = await program.rpc.initialize({});
//     console.log("Your transaction signature", tx);
//   });
// });

const main = async() => {
  console.log("🚀 Starting test...")

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.WhaleWatchBe as Program<WhaleWatchBe>;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();