import useBaseUrl from '@docusaurus/useBaseUrl'
import React from 'react'

export const Home = () => (
  <>
    <div class="container" style={{ padding: 0 }}>
      <div class="row">
        <div class="col col--12" style={{ paddingTop: 60 }}>
          <img className="homeicon" src={useBaseUrl('img/home/docsheader.png')} />
          <div class="row">
            <div class="col col--6">
              <h1 style={{ padding: '0 1rem 0 0' }}>
                Get Started <br />
                with Helium
              </h1>
              <p className="podtext" style={{ padding: '0 1rem 0 0' }}>
                Build amazing connected solutions on the world's largest decentralized wireless
                network.
              </p>
            </div>
            <div class="col col--6">
              <a className="quicklink quicklinkorange" href="/tokens/mine-iot">
                Learn about Mining IOT{' '}
                <img className="quicklinkarrow" src={useBaseUrl('img/quicklinkarrow.svg')} />
              </a>
              <a className="quicklink quicklinkgreen" href="/iot">
                Use the Network{' '}
                <img className="quicklinkarrow" src={useBaseUrl('img/quicklinkarrow.svg')} />
              </a>
              <a className="quicklink quicklinkred" href="/governance/hip">
                Submit a Helium Improvement Proposal{' '}
                <img className="quicklinkarrow" src={useBaseUrl('img/quicklinkarrow.svg')} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container" style={{ padding: 0, paddingTop: 60 }}>
      <div class="row">
        <div class="col col--12">
          <h2>Introduction</h2>
        </div>
        <div class="col col--12">
          <p>
            Helium is a global, distributed network of Hotspots that create public, long-range
            wireless coverage for LoRaWAN-enabled IoT devices and cellular devices. LoRaWAN&trade;
            Hotspots produce and are compensated in IOT, the native cryptocurrency of the Helium
            blockchain. The Helium blockchain is a new, open-source, public blockchain created
            entirely to incentivize the creation of physical, decentralized wireless networks.
            Today, the Helium IoT Network, and its{' '}
            <a href="https://explorer.helium.com/">hundreds of thousands of Hotspots</a>, provide
            access to the largest LoRaWAN Network in the world.
          </p>
          <p>
            If, at any time, you don't find what you need, join us in{' '}
            <a href="https://discord.gg/helium">our Discord</a>.
          </p>
        </div>
      </div>
    </div>

    <div class="container" style={{ padding: 0 }}>
      <hr />
    </div>

    <div class="container" style={{ padding: 0, paddingTop: 100 }}>
      <div class="row">
        <div class="col col--6" style={{ marginBottom: 100 }}>
          <img className="homeicon" src={useBaseUrl('img/home/blockchainicon.png')} />
          <h3>Helium Network</h3>
          <p className="podtext">
            Helium is a token-incentivization model that connects devices and applications using
            distributed nodes, including LoRaWAN&trade; and cellular networks.
          </p>
          <a href="/archive/blockchain">
            Learn More{' '}
            <img className="quicklinkarrow" src={useBaseUrl('img/icons/linkarrow.svg')} />
          </a>
          <h5>Quick Links</h5>
          <a className="block" href="/tokens/hnt-token">
            <img className="docicon" src={useBaseUrl('img/icons/docicon.svg')} /> Helium Tokens
          </a>
          <a className="block" href="/archive/blockchain/mining">
            <img className="docicon" src={useBaseUrl('img/icons/docicon.svg')} /> Mining IOT
          </a>
          <a className="block" href="/iot/proof-of-coverage">
            <img className="docicon" src={useBaseUrl('img/icons/docicon.svg')} /> Proof of Coverage
          </a>
          <a className="block" href="/iot/transaction-fees">
            <img className="docicon" src={useBaseUrl('img/icons/docicon.svg')} /> Transaction Fees
          </a>
        </div>
        <div class="col col--6 blockblue" style={{ marginBottom: 100 }}>
          <img className="homeicon" src={useBaseUrl('img/home/mineicon.png')} />
          <h3>Mine $IOT</h3>
          <p className="podtext">
            Hotspots create The People’s Network, a long-range wireless coverage for very low power
            and inexpensive IoT devices and are rewarded $IOT for doing so.
          </p>
          <a href="/tokens/mine-iot">
            Learn More{' '}
            <img className="quicklinkarrow" src={useBaseUrl('img/icons/linkarrowblue.svg')} />
          </a>
          <h5>Quick Links</h5>
          <a className="block" href="/tokens/mine-iot">
            <img className="docicon" src={useBaseUrl('img/icons/dociconblue.svg')} /> What is a
            Helium Miner?
          </a>
          <a className="block" href="https://helium.com/mine">
            <img className="docicon" src={useBaseUrl('img/icons/dociconblue.svg')} /> Approved
            Hotspots
          </a>
          <a className="block" href="/network-iot/hotspots-iot/full-hotspots#becoming-a-maker">
            <img className="docicon" src={useBaseUrl('img/icons/dociconblue.svg')} /> Become a Maker
          </a>
          <a className="block" href="/iot/setup-a-packet-forwarder">
            <img className="docicon" src={useBaseUrl('img/icons/dociconblue.svg')} /> Build a Packet
            Forwarder
          </a>
        </div>
        <div class="col col--6 blockgreen" style={{ marginBottom: 100 }}>
          <img className="homeicon" src={useBaseUrl('img/home/useicon.png')} />
          <h3>Use the Helium Network</h3>
          <p className="podtext">
            The Helium Ecosystem includes thousands of ready-to-use devices, powerful integrations,
            and robust developer tools.
          </p>
          <a href="/iot">
            Learn More{' '}
            <img className="quicklinkarrow" src={useBaseUrl('img/icons/linkarrowgreen.svg')} />
          </a>
          <h5>Quick Links</h5>
          <a className="block" href="/iot/devices">
            <img className="docicon" src={useBaseUrl('img/icons/docicongreen.svg')} /> Devices
          </a>
          <a className="block" href="/iot/lorawan-network-servers">
            <img className="docicon" src={useBaseUrl('img/icons/docicongreen.svg')} /> OpenLNS
          </a>
          <a className="block" href="/iot/lorawan-on-helium">
            <img className="docicon" src={useBaseUrl('img/icons/docicongreen.svg')} /> LoRaWAN on
            Helium
          </a>
        </div>
        <div class="col col--6 blockred" style={{ marginBottom: 100 }}>
          <img className="homeicon" src={useBaseUrl('img/home/communityicon.png')} />
          <h3>Community, Governance, & Open Source</h3>
          <p className="podtext">
            Helium’s decentralized ‘People’s Network’ relies on a community of supporters,
            developers and advisors.
          </p>
          <a href="/governance">
            Learn More{' '}
            <img className="quicklinkarrow" src={useBaseUrl('img/icons/linkarrowred.svg')} />
          </a>
          <h5>Quick Links</h5>
          <a className="block" href="/governance#participate">
            <img className="docicon" src={useBaseUrl('img/icons/dociconred.svg')} /> Discord
            Community Chat
          </a>
          <a className="block" href="/governance/hip">
            <img className="docicon" src={useBaseUrl('img/icons/dociconred.svg')} /> Helium
            Improvement Proposals
          </a>
          <a className="block" href="/faq/open-source">
            <img className="docicon" src={useBaseUrl('img/icons/dociconred.svg')} /> Open Source
            Software
          </a>
        </div>
      </div>
    </div>

    <div class="container" style={{ padding: 0 }}>
      <hr />
    </div>

    <div class="container" style={{ padding: 0, paddingTop: 100, paddingBottom: 100 }}>
      <div class="row">
        <div class="col col--12" style={{ marginBottom: 50 }}>
          <h2>Tools, Technologies & Initatives</h2>
        </div>
        <div class="col col--6">
          <div className="tech--item">
            <img className="techicon" src={useBaseUrl('img/home/explorer.svg')} />
            <div className="tech--item_text">
              <a href="https://explorer.helium.com">
                <h4>Explorer</h4>
              </a>
              <p>Helium Network Explorer</p>
            </div>
          </div>
          <div className="tech--item">
            <img className="techicon" src={useBaseUrl('img/home/mappers.svg')} />
            <div className="tech--item_text">
              <a href="https://mappers.helium.com">
                <h4>Mappers</h4>
              </a>
              <p>Community-driven Coverage Mapping</p>
            </div>
          </div>
        </div>
        <div class="col col--6">
          <div className="tech--item">
            <img className="techicon" src={useBaseUrl('img/home/longfi.svg')} />
            <div className="tech--item_text">
              <a href="https://github.com/helium/gateway-rs">
                <h4>Helium Hotspot Software</h4>
              </a>
              <p>Packet forwarder for Helium-enabled Gateways.</p>
            </div>
          </div>
          <div className="tech--item">
            <img className="techicon" src={useBaseUrl('img/home/walletapp.svg')} />
            <div className="tech--item_text">
              <a href="/wallets">
                <h4>Wallet App</h4>
              </a>
              <p>iOS & Android Helium Wallet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
)
