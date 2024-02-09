export const PayloadSize = () => (
  <figure className="screensnippet-wrapper" style={{ padding: '1.25em 5vw 1em' }}>
    <p>Message Payload Size</p>
    <table className="dc-calc-table" style={{ marginBottom: '1em' }}>
      <thead>
        <tr>
          <th>0-24 bytes</th>
          <th>25-48 bytes</th>
          <th>... 241 bytes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1 DC</td>
          <td>2 DC</td>
          <td>... 11 DC</td>
        </tr>
      </tbody>
    </table>
    <figcaption>
      Data transfer is accounted for in 24-byte increments per message on the LoRaWAN network.
    </figcaption>
  </figure>
)
