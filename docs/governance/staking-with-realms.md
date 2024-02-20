---
id: staking-with-realms
title: Staking on Helium Vote
pagination_label: Helium Vote
sidebar_label: Staking on Helium Vote
description: Helium on Helium Vote Documentation
image: https://docs.helium.com/img/link-image.png
slug: /governance/staking-with-realms
---

import useBaseUrl from '@docusaurus/useBaseUrl'
import {
  RealmsBrower,
  ConnectAccount,
  GovernancePower,
  Decaying,
  Constant,
  StakeMultipler,
  ConfirmStake,
  StakeLockup,
  LandRush,
  ValidatorStake,
} from './StakingWithRealms'

Helium utilizes [Helium Vote](https://heliumvote.com), a native application built by the Helium 
Foundation to organize and manage vote escrow tokens, delegation, and more. Stakes can be created 
and later managed within Helium Vote at any time at https://heliumvote.com.

## Creating a Stake

Anyone with HNT, MOBILE, or IOT in their Helium Wallet App or Solana-compatible browser wallet
(such as Phantom orBackpack) can stake.

While staking IOT or MOBILE tokens is possible through their respective subDAOs, those positions are
only eligible for voting power and cannot currently be delegated for the purposes of earning
rewards.

This guide outlines using Helium Vote with the [Helium Wallet App](/wallets/helium-wallet-app). To use
Helium Vote on a desktop browser, a Solana-compatible browser wallet can be used (such as Phantom or
Backpack) by navagating to https://heliumvote.com.


### Staking in the Helium Wallet App

Staking in the Helium Wallet App can be done by navigating to the "Governance" tab within the Helium Wallet.
Ensure you select the token you want to stake (HNT, MOBILE or IOT) at the top.

<figure className="screensnippet-wrapper">
  <img src={useBaseUrl('/img/modular-governance/Governance-tab-on-HW.jpg')}
  style={{ maxHeight: 325, borderRadius: '40px', padding: '14px 16px 20px' }}
  /> 
  <figcaption>
      The Governance tab is the fourth tab from the left. The HNT stake button at the top is the default selection.
  </figcaption>
</figure>
<br />

Once in the "Governance" tab, you will see "Your Voting Power". Click "Your Voting Power"
to see your total voting power, and for the ability to lock HNT/MOBILE/IOT.



Once your wallet has been connected to Realms, your token balances (or existing positions) will be
displayed in the governance section of the DAO.

<figure className="screensnippet-wrapper">
  <img src={useBaseUrl('/img/modular-governance/Your-voting-power.jpg')}
  style={{ maxHeight: 400, borderRadius: '40px', padding: '14px 16px 20px' }}
  /> 
  <figcaption>
    Stake positions can be made and viewed in the "Your Voting Power" section of Helium Vote
  </figcaption>
</figure>
<br />

As long as HNT, MOBILE or IOT is available in your linked account, new stakes can be created by tapping on the
"Lock Tokens" button within the governance view.


### Lockup Period

To build a secure voting system, Helium only allows votes from token holders willing to align
themselves with the long-term health of the Helium Network. This is done by allowing holders to
receive veHNT/veMOBILE/veIOT in proportion to the amount of time that the tokens are staked for.


<figure className="screensnippet-wrapper">
  <img src={useBaseUrl('/img/modular-governance/lockup-type.jpeg')}
  style={{ maxHeight: 300, borderRadius: '40px', padding: '14px 16px 20px' }}
  /> 
  <figcaption>
    Selecting your lockup type, Decaying or Constant.
  </figcaption>
</figure>
<br />



#### Decaying

Tokens are locked for a fixed duration and are released in full at the end of the defined lockup
period. Vote weight declines linearly until release. This effectively starts the cooldown at the
moment of staking.

You will be required to close the position to return the staked HNT to your wallet after the
cooldown period has ended.

<Decaying />

#### Constant

Tokens are locked indefinitely. At any time you can start the unlock process which lasts for the
initially chosen lockup duration. Vote weight stays constant until you start the unlock process,
then it declines linearly until release.

<figure className="screensnippet-wrapper">
  <img
    src={useBaseUrl('mg/modular-governance/constant-lockup.jpg')}
    style={{ maxHeight: 'initial', padding: '0 0 8px 0' }}
  />
   <figcaption>
    You lock 10.000 tokens with a lockup duration of one year. After three years you decide to start
    the unlocking process. Another year after that, you can withdraw the tokens.
  </figcaption>
</figure>

### Duration

The duration of your cooldown is set in units of days. The longer your tokens are staked, the more
veHNT/veMOBILE/veIOT will be issued. If you chose the 'Constant' lockup period, this duration takes effect after
the 'Unlock' action is executed.

While it is possible to set a higher duration than 4 years, no additional vote weight multiplier
will be added.


### Stake Multiplier

veHNT/veMOBILE/veIOT positions can be strengthened by increasing the duration that they are locked for. The
resulting multiplier designates the amount of vote and delegation power (delegate power only applicable to veHNT)
of the position. It is not indicative of an investment return.

In other words, if you staked 10 HNT for 6 months, you'd get the same 10 HNT back 6 months later.
During this time you would be able to [delegate](#delegating-stakes) your position to a network to
get a return in that network's tokens.

Positions created during the [landrush](#landrush) period received an additional 3x multiplier on
the overall lockup multiplier.

<StakeMultipler />

### Delegating to a subDAO (veHNT Only)

Once you select how much HNT you want to lock up, an interface will appear to allow you to delegate 
your veHNT to a subDAO for rewards. A position will not earn any token return until it is delegated to 
a subnetwork. A stake without delegation earns voting rights, but no token return. You can delegate an 
active stake within the Helium Vote interface.

<figure className="screensnippet-wrapper">
  <img
    src={useBaseUrl('/img/modular-governance/delegate-to-subdao.jpeg')}
    style={{ maxHeight: 350, borderRadius: '40px', padding: '14px 16px 20px' }}
  />
  <figcaption>
    You may choose to delegate your stake to either the MOBILE or IOT subDAO.
  </figcaption>
</figure>


### Confirming your Stake

Once parameters are settled in the Helium Vote UI, you are now ready to create your veHNT position.

The Helium Wallet App will ask for confirmation before issuing the Solana transaction that creates
the veHNT/veMOBILE/veIOT position.

<figure className="screensnippet-wrapper">
  <img
    src={useBaseUrl('/img/modular-governance/estimated-changes.jpeg')}
  style={{ maxHeight: 375, borderRadius: '40px', padding: '14px 16px 20px' }}
      />
  <figcaption>
    After pressing "Lock Tokens", a Solana transaction is issued to create the stake.
  </figcaption>
</figure>

## Managing Stakes

With Helium Vote, it's a sizzling experience to take control of your HNT stakes, ensuring they're grilled
to perfection. Chew through stake delegation, transfers, splitting, and cooldowns like a master
chef. <span className="🥩">🥩</span>

### UnDelegating veHNT
Once a stake has been delegated, it can be undelegated in the same interface. Delegations can be
changed at any time, however, it will take one epoch for the position to be available for
redelegation. The stake must be delegated for the entire epoch to receive rewards for that epoch.
Received rewards need to be claimed manually. Only then will they be sent to the wallet the veHNT
position is in. A delegated position can only be undelegated after all accrued rewards have been
claimed.

<figure className="screensnippet-wrapper">
  <img
    src={useBaseUrl('/img/modular-governance/undelegate.jpeg')}
  style={{ maxHeight: 375, borderRadius: '40px', padding: '14px 16px 20px' }}
      />
  <figcaption>
    You will be required to approve a transaction in your wallet when you undelegate your veHNT.
  </figcaption>
</figure>

### Splitting a Stake

A stake can be divided among multiple positions. This can be helpful if you wish to delegate your
veHNT position to multiple networks (IOT or MOBILE) or set different lockup times to different
positions.

Be warned, splitting a [landrush](#landrush) position after the initial 10 day period will result in
losing the multiplier for the position being split or transferred off the position.

You must undelegate before splitting a stake (veHNT only). You can redelegate after the split is complete.

Positions that are in any active votes cannot be split. To change a position during a vote it must
be relinquished from the active vote.

### Transfer a Stake

Staked positions cannot be transferred from one account to another. Stakes can only be transferred
from one position to another within the same account. Positions can only transfer to positions of
greater or equal duration. This functionality is useful for consolidating positions. Landrush
positions cannot have more locked tokens transferred into them after the landrush period. Any veHNT
transferred out of a landrush position will lose the 3x multiplier bonus.

You must undelegate both positions before transferring a stake between positions (veHNT only). Once you've 
undelegated your stake, you can click on your locked position to delegate your stake to a new
subDAO.

<figure className="screensnippet-wrapper">
  <img
    src={useBaseUrl('/img/modular-governance/Split-Menu.jpg')}
  style={{ maxHeight: 300, borderRadius: '40px', padding: '14px 16px 20px' }}
      />
   <figcaption>Once your position is undelegated, click on the position to transfer it.</figcaption>
</figure>

### Extending a Stake

Extending a stake will lengthen the time it will take to unstake. Position holders may extend a
stake to gain a larger multiplier for voting power or delegation purposes. Extending a staking
period does not add additional time to the stake, it instead updates the existing stake period to
the new selection.

### Unlocking a Stake (Cooldown)

Before a stake can become unlocked, you must first undelegate any delegations you have to existing subDAOs.
If a stake was created with a 'constant' [lockup period](#lockup-period), the ability to 'Unlock'
the position will be visible in the position as long as the unlock has not yet been initiated. A
constant lockup position will first need to be unlocked before the cooldown period begins.

Unlocking the position will begin the cooldown decay process. The time this takes is the lockup
duration set during the creation of the position. And your veHNT/veMOBILE/veIOT value will decay to 0 during
this cooldown period.

You will be required to close the position to return the staked HNT/MOBILE/IOT to your wallet after the
cooldown period has ended. You must claim all tokens from the position and undelegate the position
before the Close Position button is available as an option.


## Landrush

For the first 10 days following the Solana migration, HNT holders were eligible to stake their HNT
for a 'landrush' bonus of 3x the locked amount.<sup>(</sup>[^1]<sup>,</sup>[^2]<sup>)</sup>

If a landrush stake is moved or split out of its original position after the first 10 days have
lapsed, the landrush bonus is forfeited.

<LandRush />

[^1]:
    [HIP 70: Scaling the Helium Network](https://github.com/helium/HIP/blob/main/0070-scaling-helium.md)

[^2]:
    [HIP 77: Launch Parameters for Solana Migration](https://github.com/helium/HIP/blob/main/0077-solana-parameters.md)

## Automatically Created Validator Stakes

For existing validators, a veHNT position is automatically created based on the existing staked
position previously tied to Validators. The
[Validator migration guide](/solana/migration/validator-operator) is a valuable reference in
understanding specific details for former Validator operators.

These positions are not automatically delegated to a subDAO and are set with a constant
[lockup period](#lockup-period) by default.

## Possible Errors

### Insufficient SOL Balance

Creating new veHNT/veMOBILE/veIOT positions requires more SOL than standard token claims or account-to-account
transfers. To stake your HNT you will need approximately 0.006 SOL in your account to create the
position. If you do not have enough SOL and proceed with the transaction, an error notification
will appear and allow you to swap your existing HNT/MOBILE/IOT to SOL to proceed with the transaction.

<figure className="screensnippet-wrapper">
  <img src={useBaseUrl('/img/modular-governance/no-sol-error.jpg')}
  style={{ maxHeight: 500, borderRadius: '40px', padding: '14px 16px 20px' }}
 />
  <figcaption>Transaction warning noting the user does not have enough $SOL in order to continue.</figcaption>
</figure>

