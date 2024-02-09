import useBaseUrl from '@docusaurus/useBaseUrl'

export const IOTPage = () => (
  <>
    <div class="container" style={{ padding: 0, marginBottom: 60 }}>
      <div class="row">
        <div class="col col--12">
          <div class="flex" style={{ border: 'none' }}>
            <img className="headericon" src={useBaseUrl('img/network-iot/useheader.png')} />
            <div className="headertext">
              <h2 className="subtitle">
                The Helium IoT Network uses the LoRaWAN protocol to provide internet connectivity to
                "Internet of Things" devices and is the original sub-network in the Helium
                ecosystem.
              </h2>
              <h2 className="subtitle">
                Developers and companies around the world rely on the Helium IoT Network for
                connectivity.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container" style={{ padding: 0 }}>
      <div class="row">
        <div class="col col--6" style={{ marginBottom: 100 }}>
          <img
            className="homeicon"
            style={{ maxWidth: 85 }}
            src={useBaseUrl('img/network-iot/use2.png')}
          />
          <h3>LoRaWAN Network Servers</h3>
          <p className="podtext">
            The OpenLNS initiative allows anyone looking to deploy devices on the Helium Network to
            use any LoRaWAN Network Server.
          </p>
          <a href="/iot/lorawan-network-servers">
            Learn More{' '}
            <img className="quicklinkarrow" src={useBaseUrl('img/icons/linkarrow.svg')} />
          </a>
          <h5>Quick Links</h5>
          <a className="block" href="/iot/find-a-lns-provider">
            <img className="docicon" src={useBaseUrl('img/icons/docicon.svg')} /> Find an LNS
            Provider
          </a>
          <a className="block" href="/iot/run-an-lns">
            <img className="docicon" src={useBaseUrl('img/icons/docicon.svg')} /> Host Your Own LNS
          </a>
        </div>
        <div class="col col--6" style={{ marginBottom: 100 }}>
          <img
            className="homeicon"
            style={{ maxWidth: 85 }}
            src={useBaseUrl('img/network-iot/use1.svg')}
          />
          <h3>Devices</h3>
          <p className="podtext">
            Purchase and customize Helium-enabled devices or prototypes and build your own.
          </p>
          <a href="/iot/devices">
            Learn More{' '}
            <img className="quicklinkarrow" src={useBaseUrl('img/icons/linkarrow.svg')} />
          </a>
          <h5>Quick Links</h5>
          <a className="block" href="https://www.helium.com/ecosystem">
            <img className="docicon" src={useBaseUrl('img/icons/docicon.svg')} /> Preconfigured
            Devices
          </a>
          <a className="block" href="/network-iot/devices/ready-to-use">
            <img className="docicon" src={useBaseUrl('img/icons/docicon.svg')} /> Ready To Use
            Devices
          </a>
          <a className="block" href="/network-iot/devices/development">
            <img className="docicon" src={useBaseUrl('img/icons/docicon.svg')} /> Development
            Devices
          </a>
        </div>
        <div class="col col--6" style={{ marginBottom: 100 }}>
          <img
            className="homeicon"
            style={{ maxWidth: 85 }}
            src={useBaseUrl('img/network-iot/use5.svg')}
          />
          <h3>Explore Coverage</h3>
          <p className="podtext">
            Check out the coverage in your area, and learn about extending the range of the Helium
            Network.
          </p>
          <a href="https://explorer.helium.com">
            See the Map{' '}
            <img className="quicklinkarrow" src={useBaseUrl('img/icons/linkarrow.svg')} />
          </a>
          <h5>Quick Links</h5>
          <a className="block" href="/tokens/mine-iot/">
            <img className="docicon" src={useBaseUrl('img/icons/docicon.svg')} /> Mine IOT
          </a>
          <a className="block" href="/iot/hotspots">
            <img className="docicon" src={useBaseUrl('img/icons/docicon.svg')} /> Learn about IoT
            Hotspots
          </a>
        </div>
        <div class="col col--6" style={{ marginBottom: 100 }}>
          <img
            className="homeicon"
            style={{ maxWidth: 85 }}
            src={useBaseUrl('img/network-iot/use4.svg')}
          />
          <h3>Coverage Mapping</h3>
          <p className="podtext">
            Mappers is a community-led effort to actively survey the signal intensity of the Helium
            Network, using configured trackers.
          </p>
          <a href="https://mappers.helium.com">
            See the Map{' '}
            <img className="quicklinkarrow" src={useBaseUrl('img/icons/linkarrow.svg')} />
          </a>
          <h5>Quick Links</h5>
          <a className="block" href="/iot/coverage-mapping">
            <img className="docicon" src={useBaseUrl('img/icons/docicon.svg')} /> Intro to Coverage
            Mappers
          </a>
          <a className="block" href="/iot/coverage-mapping/quickstart">
            <img className="docicon" src={useBaseUrl('img/icons/docicon.svg')} /> Mappers Quickstart
          </a>
        </div>
      </div>
    </div>
  </>
)
