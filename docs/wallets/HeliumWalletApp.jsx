import useBaseUrl from '@docusaurus/useBaseUrl'

export const FakeHivemapper = () => (
  <figure className="screensnippet-wrapper">
    <div>
      <img src={useBaseUrl('img/wallet-app/hivemapper_fake.png')} style={{ maxHeight: '400px' }} />
    </div>
    <figcaption style={{ paddingTop: 0 }}>
      Lookalike websites like this one offering an airdrop for the{' '}
      <a href="https://hivemapper.com">Hivemapper</a> project are a common means for scammers to
      trick users. Note the additional `p` in the URL and the manufactured urgency around connecting
      the Wallet.
    </figcaption>
  </figure>
)
