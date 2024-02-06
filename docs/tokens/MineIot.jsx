import useBaseUrl from '@docusaurus/useBaseUrl'

export const MineIotPage = () => (
  <>
    <div class="container" style={{ padding: 0, marginBottom: 60 }}>
      <div class="row">
        <div class="col col--12">
          <div class="flex">
            <img className="headericon" src={useBaseUrl('img/mine-hnt/minehnticon.png')} />
            <div className="headertext">
              <h2 className="subtitle">
                Helium Hotspots mine $IOT and are built by our growing ecosystem of approved
                manufacturers.
              </h2>
              <div>
                <a href="/network-iot/hotspots-iot/full-hotspots">
                  <span class="badge badge--secondary">Approved Makers</span>
                </a>
                <a href="/hotspot-makers/become-a-maker/maker-approval-auditing">
                  <span class="badge badge--secondary">Maker Approval</span>
                </a>
                <a href="/hotspot-makers">
                  <span class="badge badge--secondary">Maker Apps</span>
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
          <h2>Hotspots</h2>
        </div>
        <div class="col col--6">
          <p>
            Want to help build the largest IoT network in the world? Want to provide coverage to IoT
            devices and earn IOT while you do?
          </p>
          <p style={{ marginBottom: 40 }}>
            Check out some of these quick links for help getting started or join us in the
            #gateway-development channel on <a href="https://discord.gg/helium">our Discord</a>.
          </p>
        </div>
        <div class="col col--5 col--offset-1 " style={{ marginBottom: 100 }}>
          <h5 style={{ marginTop: 0 }}>Quick Links</h5>
          <a className="block" href="/network-iot/hotspots-iot/full-hotspots">
            <img className="docicon" src={useBaseUrl('img/icons/docicon.svg')} /> Approved Makers
          </a>
          <a className="block" href="/hotspot-makers/become-a-maker/maker-approval-auditing">
            <img className="docicon" src={useBaseUrl('img/icons/docicon.svg')} /> Maker Approval and
            Auditing
          </a>
          <a className="block" href="/iot/data-only-hotspots">
            <img className="docicon" src={useBaseUrl('img/icons/docicon.svg')} /> Data Only Hotspots
          </a>
        </div>
      </div>
      <div class="row">
        <div class="col col--6 borderTop">
          <div>
            <h3>Data Only Hotspots</h3>
            <p style={{ marginBottom: 40 }}>
              These Hotspots get rewarded for forwarding Data Packets. Details{' '}
              <a href="/iot/data-only-hotspots">can be found here</a>.
            </p>
          </div>
        </div>
        <div class="col col--6 borderTop">
          <div>
            <h3>Maker Apps</h3>
            <p style={{ marginBottom: 40 }}>
              Makers have their own App to perform Hotspot onboarding, diagnostics, and
              troubleshooting.{' '}
              <a href="/hotspot-makers/become-a-maker/maker-app-requirements">Read more here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
)
