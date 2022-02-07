
export{}
import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { WhaleWatchBe } from '../target/types/whale_watch_be';

const main = async () => {
  console.log("🚀 Starting test...");

  anchor.setProvider(anchor.Provider.env());
  const program = anchor.workspace.WhaleWatchBe as Program<WhaleWatchBe>;
  //   console.log(anchor.workspace.WhaleWatchBe);
  const tx = await program.rpc.initialize({});

  console.log("📝 Your transaction signature", tx);
};

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
