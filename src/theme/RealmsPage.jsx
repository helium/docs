import useBaseUrl from '@docusaurus/useBaseUrl'

export const TestVoteImg = () => (
  <figure className="screensnippet-wrapper">
    <div style={{ display: 'flex' }}>
      <img
        src={useBaseUrl('/img/realms/realmsui.png')}
        style={{ maxHeight: 350, minWidth: 0, flex: '1 1 auto' }}
      />
      <img
        src={useBaseUrl('/img/realms/realmsui_mobile.png')}
        style={{ maxHeight: 350, minWidth: 0, flex: '1 1 auto' }}
      />
    </div>
    <figcaption>
      The <a href="https://realms.heliumvote.com/dao/hnt">Helium DAO</a> in Realms with an active
      test vote. Shown on desktop and mobile.
    </figcaption>
  </figure>
)

export const ConnectImg = () => (
  <figure className="screensnippet-wrapper">
    <img src={useBaseUrl('/img/realms/connectaccount.png')} />
    <figcaption>
      This user is logged in with their <code>4qPt5...</code> account.
    </figcaption>
  </figure>
)
