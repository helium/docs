import React from 'react'

const style = {
  width: '720px',
  minHeight: '520px',
  height: '100%',
}

export const TopLedgerEmbed = ({
  title,
  caption,
  client,
  queryId,
  visualizationId,
  apiKey,
  height = style.height,
  width = style.width,
  params = {},
}) => {

  const embedUrl = new URL(`https://analytics.topledger.xyz/${client}/embed/query/${queryId}/visualization/${visualizationId}`)
  embedUrl.search = new URLSearchParams({ api_key: apiKey, hide_header: 'true', hide_timestamp: 'true', ...params }).toString()

  return (
    <figure
      className="screensnippet-wrapper"
      style={{ padding: '1.25em 5vw 1em', marginBottom: '0.5rem', marginTop: '0.5rem' }}
    >
      {title && <p>{title}</p>}
      <iframe
        src={embedUrl.toString()}
        width="720"
        height="391"
        style={{
          ...style,
          height,
          width,
        }}
      ></iframe>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
