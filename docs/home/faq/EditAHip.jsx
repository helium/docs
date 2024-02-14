import useBaseUrl from '@docusaurus/useBaseUrl'

export const CreateFork = () => (
  <figure className="screensnippet-wrapper">
    <img
      src={useBaseUrl('/img/hip/fork-step-1.png')}
      style={{ maxHeight: 800 }}
      className="add-shadow-margin"
    />
    <figcaption>
      A copy of the Helium HIP repository will be made in the user's GitHub account and should open
      automatically.
    </figcaption>
  </figure>
)

export const PullRequest = () => (
  <figure className="screensnippet-wrapper">
    <img
      src={useBaseUrl('/img/hip/pull-request-step-0.png')}
      style={{ maxHeight: 800 }}
      className="add-shadow-margin"
    />
    <figcaption>
      The number may be more than 1, depending on how many edits ahead the forked repository is from
      the main HIP repository.
    </figcaption>
  </figure>
)
