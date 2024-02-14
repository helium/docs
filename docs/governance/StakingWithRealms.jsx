import useBaseUrl from '@docusaurus/useBaseUrl'

export const RealmsBrower = () => (
  <figure className="screensnippet-wrapper">
    <img src={useBaseUrl('/img/realms/realmsbrowser.png')} />
    <figcaption>
      veHNT can be managed via <code>https://realms.heliumvote.com/dao/hnt</code>
    </figcaption>
  </figure>
)

export const ConnectAccount = () => (
  <figure className="screensnippet-wrapper">
    <img src={useBaseUrl('/img/realms/connectaccount.png')} />
    <figcaption>
      This user is logged in with their <code>4qPt5...</code> account.
    </figcaption>
  </figure>
)

export const GovernancePower = () => (
  <figure className="screensnippet-wrapper">
    <img src={useBaseUrl('/img/realms/availabletokens.png')} />
    <figcaption>
      Stake positions can be made in the "My governance power" section of Realms
    </figcaption>
  </figure>
)

export const Decaying = () => (
  <figure className="screensnippet-wrapper">
    <img
      src={useBaseUrl('/img/realms/cliffgraph.png')}
      style={{ maxHeight: 'initial', padding: '0 0 8px 0' }}
    />
    <figcaption>
      You lock 10.000 tokens with a lockup duration of one year. They are then unavailable for the
      next one year. After this time, you can withdraw them again.
    </figcaption>
  </figure>
)

export const Constant = () => (
  <figure className="screensnippet-wrapper">
    <img
      src={useBaseUrl('/img/realms/constantgraph.png')}
      style={{ maxHeight: 'initial', padding: '0 0 8px 0' }}
    />
    <figcaption>
      You lock 10.000 tokens with a lockup duration of one year. After three years you decide to
      start the unlocking process. Another year after that, you can withdraw the tokens.
    </figcaption>
  </figure>
)

export const StakeMultipler = () => (
  <figure className="screensnippet-wrapper">
    <img
      src={useBaseUrl('/img/realms/multiplier.gif')}
      style={{ maxHeight: 250, borderRadius: '40px', padding: '14px 16px 20px' }}
    />
    <figcaption>
      The multiplier affects a position's voting and delegation power but does not mean more HNT is
      returned.
    </figcaption>
  </figure>
)

export const ConfirmStake = () => (
  <figure className="screensnippet-wrapper">
    <img src={useBaseUrl('/img/realms/issuestake.png')} style={{ maxHeight: 300 }} />
    <figcaption>
      After pressing, "Lock Tokens", a Solana transaction is issued to create the stake.
    </figcaption>
  </figure>
)

export const StakeLockup = () => (
  <figure className="screensnippet-wrapper">
    <img src={useBaseUrl('/img/realms/stakewlockup.png')} style={{ maxHeight: 300 }} />
    <figcaption>
      This position will unlock over the period of 2 years once the unlock has been initiated.
    </figcaption>
  </figure>
)

export const LandRush = () => (
  <figure className="screensnippet-wrapper">
    <img src={useBaseUrl('/img/realms/landrush.png')} />
    <figcaption>
      The 'landrush' banner indicates a position created within the first 10 days of the Solana
      migration.
    </figcaption>
  </figure>
)

export const ValidatorStake = () => (
  <figure className="screensnippet-wrapper">
    <img src={useBaseUrl('/img/realms/validatorstake.png')} />
    <figcaption>
      A veHNT position representing two migrated validators (20,000 HNT) under one account.
    </figcaption>
  </figure>
)
