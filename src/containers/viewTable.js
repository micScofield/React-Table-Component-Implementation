import { useMemo, useState } from 'react'
import { useTable, useSortBy, useColumnOrder, usePagination, useResizeColumns, useFlexLayout } from 'react-table'

const ViewTable = ({ apiData, COLUMNS, columnOrder, setOrdered }) => {

    const [order, setOrder] = useState(false)

    console.log(apiData)

    // Memoizing table contents
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => apiData, [apiData])
    const defaultColumn = useMemo(() => ({
        width: 175,
        minWidth: 100,
        maxWidth: 400,
    }), [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        setColumnOrder,
        page,
        nextPage,
        canNextPage,
        previousPage,
        canPreviousPage,
        pageOptions,
        state,
        gotoPage,
        pageCount
    } = useTable({
        columns,
        data,
        defaultColumn
    },
        useSortBy,
        useColumnOrder,
        usePagination,
        useResizeColumns,
        useFlexLayout
    )

    const { pageIndex } = state

    const changeColumnOrderHandler = e => {
        setOrder(prevState => !prevState)
        //console.log(order) //is still false due to batch updates
        setOrdered(!order) //passing true because of patch updates
        setColumnOrder(columnOrder)
    }

    return <div>
        <div>
            <button className='btn btn-danger btn-large my-bottom' onClick={() => changeColumnOrderHandler()}>Toggle Column Order {order ? <i className="fas fa-toggle-on"></i> : <i className='fas fa-toggle-off'></i>}
            </button>

        </div>
        <table className="table" {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {
                            headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                                    <span>{' '}
                                        {column.isSorted ? (column.isSortedDesc ? <i class="fa fa-sort-down" aria-hidden="true"></i>
                                            : <i className='fa fa-sort-up'></i>) : null}
                                    </span>
                                    <div {...column.getResizerProps()} className={`resizer ${column.isResizing ? 'isResizing' : ''}`}></div>
                                </th>
                            ))
                        }
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {page.map(row => {
                    prepareRow(row)
                    return <tr {...row.getRowProps()}>
                        {row.cells.map(cell => <td {...cell.getCellProps()}>
                            {cell.render('Cell')}
                        </td>)}
                    </tr>
                })}
            </tbody>
        </table>

        <div className='page-navigation-buttons my-top-1'>
            <span className='pxy-1 my-top'>
                Page{' '}<strong>{pageIndex + 1} of {pageOptions.length} </strong>
            </span>

            <span>
                <button className='btn btn-transparent' onClick={() => gotoPage(0)} disabled={!canPreviousPage}><i className="fas fa-angle-double-left"></i></button>

                <button className='btn btn-dark btn-large' disabled={!canPreviousPage} onClick={() => previousPage()}>Previous</button>

                <button className='btn btn-dark btn-large' disabled={!canNextPage} onClick={() => nextPage()}>Next</button>

                <button className='btn btn-transparent' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}><i className="fas fa-angle-double-right"></i></button>
            </span>

        </div>

        <div className='center my-top'>
            Go to Page: <input type='number' className='goto-input' defaultValue={pageIndex + 1} onChange={e => {
                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(pageNumber)
            }} />
        </div>
    </div>
}

export default ViewTable