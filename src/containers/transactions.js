import { Fragment, useEffect, useState } from 'react'

import ViewTable from './viewTable'
import Spinner from '../UI/spinner/spinner'

const Transactions = ({ history }) => {

    const [transactionApiData, setTransactionApiData] = useState([])

    //for column - reordering functionality
    const [isOrdered, setIsOrdered] = useState(false)

    //for showing spinner until data is fetched from the API
    const [loading, setLoading] = useState(false)

    // Fetching transactions sample data
    useEffect(() => {
        setLoading(true)
        fetch('https://canopy-frontend-task.now.sh/api/transactions')
            .then(res => res.json())
            .then(data => {
                setTransactionApiData(data.transactions)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }, [])

    const setOrdered = (order) => {
        setIsOrdered(order)
    }

    let COLUMNS, columnOrder
    COLUMNS = [
        {
            Header: 'Name',
            accessor: 'name',
            Cell: props => props.value ? <div>{props.value}</div> : <div>-</div>,
        },
        {
            Header: 'Ticket Ref',
            accessor: 'ticketref',
            Cell: props => props.value ? <div>{props.value}</div> : <div>-</div>,
        },
        {
            Header: 'Trade Date',
            accessor: 'traded_on',
            Cell: props => props.value ? <div>{props.value}</div> : <div>-</div>,
        },
        {
            Header: 'QTY',
            accessor: 'quantity',
            Cell: props => props.value ? <div>{props.value}</div> : <div>-</div>,
        },
        {
            Header: 'CCY',
            accessor: 'currency',
            Cell: props => props.value ? <div>{props.value}</div> : <div>-</div>,
        }
    ]

    // On loading/refreshing, the application decides the screen size and handles columns appropriately
    if (window.screen.width < 800) {
        COLUMNS = COLUMNS.slice(0, 3)
        columnOrder = isOrdered ? ['name', 'ticketref', 'traded_on'] : ['ticketref', 'name', 'traded_on']
    } else {
        columnOrder = isOrdered ? ['name', 'ticketref', 'traded_on', 'quantity', 'currency'] : ['ticketref', 'name', 'currency', 'quantity', 'traded_on']
    }

    return <Fragment>
        <div className='container'>
            <h1 className='center brand'>Juvoxa</h1>

            <button onClick={() => history.goBack()} className='btn btn-large btn-light'>
            <i className="fa fa-arrow-circle-left"></i> Go Back
            </button>

            <div className='table-container'>
                {transactionApiData.length !== 0 && <ViewTable
                    apiData={transactionApiData}
                    COLUMNS={COLUMNS}
                    columnOrder={columnOrder}
                    setOrdered={setOrdered}
                />}

                {loading && <Spinner />}
            </div>
        </div>
    </Fragment>
}

export default Transactions