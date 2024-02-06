import useBaseUrl from '@docusaurus/useBaseUrl'

export const DevicesPage = () => (
  <div class="container" style={{ padding: 0 }}>
    <div class="row">
      <div class="col col--9" style={{ marginBottom: 50, marginTop: 50 }}>
        <h3>Complete Device Solutions</h3>
        <p>
          Please visit the Users section of the Helium Ecosystem catalog for companies offering
          complete end-to-end device solutions.
        </p>
        <a href="https://www.helium.com/ecosystem">
          Learn More <img className="quicklinkarrow" src={useBaseUrl('img/icons/linkarrow.svg')} />
        </a>
      </div>
      <div class="col col--9" style={{ marginBottom: 50 }}>
        <h3>Ready to Use Devices</h3>
        <p>
          For those looking to create a solution with purpose-built end devices, our ready-to-use
          section provides device references and onboarding guides for some of the most well-known
          manufactures.
        </p>
        <h5>Quick Links</h5>
        <a className="block" href="/network-iot/devices/ready-to-use">
          <img className="docicon" src={useBaseUrl('img/icons/docicon.svg')} /> Browse Devices
        </a>
      </div>
      <div class="col col--9" style={{ marginBottom: 50 }}>
        <h3>Development Devices</h3>
        <p>
          If you are looking to develop a device for a new application, then our development section
          provides references and onboarding guides for some of the most popular development boards
          and modules available.
        </p>
        <h5>Quick Links</h5>
        <a className="block" href="/network-iot/devices/development">
          <img className="docicon" src={useBaseUrl('img/icons/docicon.svg')} /> Browse Devices
        </a>
        <a className="block" href="/network-iot/devices/development/quickstart-guides">
          <img className="docicon" src={useBaseUrl('img/icons/docicon.svg')} /> Quickstart Guides
        </a>
      </div>
    </div>
  </div>
)
