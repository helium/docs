import React from 'react'

import styles from './TopLedgerEmbed.module.css'

export const TopLedgerEmbed = ({
  title,
  caption,
  client,
  queryId,
  visualizationId,
  apiKey,
  params = {},
  style = {},
}) => {
  const embedUrl = new URL(
    `https://analytics.topledger.xyz/${client}/embed/query/${queryId}/visualization/${visualizationId}`,
  )
  embedUrl.search = new URLSearchParams({
    api_key: apiKey,
    hide_header: 'true',
    hide_timestamp: 'true',
    iframe: 'true',
    ...params,
  }).toString()

  return (
    <figure className={`screensnippet-wrapper ${styles.tlembedWrapper}`}>
      {title && <p>{title}</p>}
      <iframe src={embedUrl.toString()} className={styles.tlembed} style={style}></iframe>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
