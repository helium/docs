import useBaseUrl from '@docusaurus/useBaseUrl'

export const Fork = () => (
  <figure className="screensnippet-wrapper">
    <img
      src={useBaseUrl('/img/hip/fork-step-1.png')}
      style={{ maxHeight: 800, borderRadius: '40px', padding: '14px 16px 20px' }}
    />
    <figcaption>
      A copy of the Helium HIP repository will be made in the user's GitHub account and should open
      automatically.
    </figcaption>
  </figure>
)

export const NewHip = () => (
  <figure className="screensnippet-wrapper">
    <img
      src={useBaseUrl('/img/hip/write-step-2.png')}
      style={{ maxHeight: 800, borderRadius: '40px', padding: '14px 16px 20px' }}
    />
    <figcaption>
      This example creates a proposal to never give up on the Helium Network and never let it down
      and is named `0000-astley-incentive.md`
    </figcaption>
  </figure>
)

export const FileName = () => (
  <figure className="screensnippet-wrapper">
    <img
      src={useBaseUrl('/img/hip/write-step-3.png')}
      style={{ maxHeight: 800, borderRadius: '40px', padding: '14px 16px 20px' }}
    />
    <figcaption>
      If you have been authoring a proposal in another location, copy and paste it here, adjusting
      to fit the template structure.
    </figcaption>
  </figure>
)

export const TitleDescription = () => (
  <figure className="screensnippet-wrapper">
    <img
      src={useBaseUrl('/img/hip/write-step-9.png')}
      style={{ maxHeight: 800, borderRadius: '40px', padding: '14px 16px 20px' }}
    />
    <figcaption>
      Copy and pasting the Summary from the proposal itself is a good `Description` filler.
    </figcaption>
  </figure>
)
