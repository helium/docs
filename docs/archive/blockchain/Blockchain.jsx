import useBaseUrl from '@docusaurus/useBaseUrl'

export const BlockchainPage = () => (
  <>
    <div class="container" style={{ padding: 0, marginBottom: 60 }}>
      <div class="row">
        <div class="col col--12">
          <div class="flex">
            <img className="headericon" src={useBaseUrl('img/blockchain/blockchainicon.png')} />
            <div className="headertext">
              <h1 style={{ marginTop: 0 }}>The Helium Blockchain</h1>
              <h2 className="subtitle">
                The Helium Blockchain is a new blockchain built from the ground up to incentivize
                the creation of decentralized, public wireless networks.
              </h2>
              <div>
                <a href="/archive/blockchain/blockchain-primitives">
                  <span class="badge badge--secondary">Blockchain Primitives</span>
                </a>
                <a href="/archive/blockchain/mining">
                  <span class="badge badge--secondary">Mining</span>
                </a>
                <a href="/iot/proof-of-coverage">
                  <span class="badge badge--secondary">Proof of Coverage</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container" style={{ padding: 0 }}>
      <div class="row">
        <div class="col col--12">
          <h2>Introduction</h2>
        </div>
        <div class="col col--6">
          <p>
            The Helium Blockchain is based on a new, novel work algorithm called Proof of Coverage
            (PoC), and rewards miners in $HNT, the native token of the Helium blockchain. Officially
            launched on July 29, 2019, the Helium Blockchain powers{' '}
            <a href="https://explorer.helium.com">
              the largest, public, decentralized LoRaWAN Network in the world
            </a>
            .
          </p>
          <p style={{ marginBottom: 50 }}>
            If you are a developer and interested in contributing, or simply just interested in
            learning more, join us in the #blockchain-development channel on{' '}
            <a href="https://discord.gg/helium">our Discord</a>.
          </p>
        </div>
        <div class="col col--5 col--offset-1 " style={{ marginBottom: 100 }}>
          <h5 style={{ marginTop: 0 }}>Quick Links</h5>
          <a className="block" href="/archive/blockchain/blockchain-primitives">
            <img className="docicon" src={useBaseUrl('img/icons/docicon.svg')} /> Blockchain
            Primitives
          </a>
          <a className="block" href="/archive/blockchain/mining">
            <img className="docicon" src={useBaseUrl('img/icons/docicon.svg')} /> Mining and Rewards
          </a>
          <a className="block" href="/iot/proof-of-coverage">
            <img className="docicon" src={useBaseUrl('img/icons/docicon.svg')} /> Proof of Coverage
          </a>
          <a className="block" href="/archive/blockchain/packet-purchasing">
            <img className="docicon" src={useBaseUrl('img/icons/docicon.svg')} /> Packet Purchasing
          </a>
          <a className="block" href="/tokens/hnt-token">
            <img className="docicon" src={useBaseUrl('img/icons/docicon.svg')} /> The Helium Token
            ($HNT)
          </a>
          <a className="block" href="/tokens/iot-token">
            <img className="docicon" src={useBaseUrl('img/icons/docicon.svg')} /> The IOT Network
            Token ($IOT)
          </a>
          <a className="block" href="/tokens/mobile-token">
            <img className="docicon" src={useBaseUrl('img/icons/docicon.svg')} /> The Mobile Network
            Token ($MOBILE)
          </a>
          <a className="block" href="/iot/transaction-fees">
            <img className="docicon" src={useBaseUrl('img/icons/docicon.svg')} /> Transaction Fees
          </a>
        </div>
      </div>
    </div>
  </>
)
