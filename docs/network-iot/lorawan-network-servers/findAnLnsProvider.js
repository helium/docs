import React, { useMemo, useState, useEffect } from 'react'
import { useTable, useSortBy } from 'react-table'

const LnsProvidersTable = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/helium/well-known/main/lists/lns-providers/providers.json',
    )
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error))
  }, [])

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        Cell: ({ row }) => (
          <a href={row.original.url} target="_blank" rel="noopener noreferrer">
            {row.values.name}
          </a>
        ),
      },
      {
        Header: 'Service Region',
        accessor: (provider) => provider.serviceRegion.join(', '),
      },
      {
        Header: 'Offering',
        accessor: (provider) => provider.serverType.join(', '),
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
    ],
    [],
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data },
    useSortBy,
  )

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span style={{ color: 'grey', fontSize: 'smaller' }}>
                  {column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default LnsProvidersTable
