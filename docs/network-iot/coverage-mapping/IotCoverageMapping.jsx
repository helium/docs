import useBaseUrl from '@docusaurus/useBaseUrl'

export const MapperWebsite = () => (
  <figure className="screensnippet-wrapper">
    <img
      src={useBaseUrl('img/network-iot/coverage-mapping/mappers-visualizer.png')}
      style={{ maxHeight: 350, minWidth: 0, flex: '1 1 auto' }}
    />
    <figcaption>
      The <a href="http://mappers.helium.com">Mapper Website</a> shown on desktop.
    </figcaption>
  </figure>
)
