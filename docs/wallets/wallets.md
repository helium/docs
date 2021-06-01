---
id: wallets
hide_title: true
sidebar_label: Overview
slug: /wallets
---

import useBaseUrl from "@docusaurus/useBaseUrl";

<img className="docsheader" src={useBaseUrl("img/wallets/header.png")} />

# Wallets

In blockchain projects, various wallet applications exist to help users manage
their own private keys, enabling them to sign transactions and transfer assets.

For the Helium Network, a wallet maintains ownership of Hotspots themselves, the
Helium Network Tokens (HNT), and/or Data Credits (DC).

Depending on your situation, one of the wallets here may be the best fit.

### App Wallet

The Helium App wallet is by far the easiest to use. It may be downloaded for
[iOS](https://apps.apple.com/us/app/helium-hotspot/id1450463605) or
[Android](https://play.google.com/store/apps/details?id=com.helium.wallet)
phones and provides simple pairing and setup with
[Hotspots](/mine-hnt/hotspot-makers).

Generally, this wallet focuses on people who want to send or receive HNT or
manage hotspots. Other activities, such as managing end-devices and OUIs (i.e.
users of the network) are generally best suited for the command line wallet.

To learn more about the wallet, please visit
[our help website here](https://intercom.help/heliumnetwork/en/articles/3287804-app-overview).

### Command Line Interface Wallet

The Helium Command Line Interface (CLI) wallet is the most flexible but it also
requires more technical knowledge. As such, it is suitable for all types of
transactions, but requires more caution on behalf of its users.

If you wish to proceed with using it, please follow the documentation
[from the GitHub repository](https://github.com/helium/helium-wallet-rs).

### Ledger Wallet

The Helium Ledger Wallet is an application that runs on the Ledger Hardware
wallet. The Ledger Hardware wallet is the most secure way to send and receive
the Helium Network Token (HNT), but currently supports no other transactions.

Learn more about usage [here](/wallets/ledger). Source code is 
available on [Github](https://github.com/helium/helium-ledger-app).
