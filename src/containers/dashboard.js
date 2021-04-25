import { Fragment, useState, useEffect } from 'react'

import Viewtable from './viewTable'
import { formatAmount } from '../utility/formatAmount'
import Spinner from '../UI/spinner/spinner'

const Dashboard = ({ history }) => {

    const [apiData, setApiData] = useState([])

    //for column re-ordering functionality
    const [isOrdered, setIsOrdered] = useState(false)

    //for showing spinner until data is fetched from the API
    const [loading, setLoading] = useState(false)

    //fetch holdings sample data from API
    const fetchData = () => {
        setLoading(true)
        fetch('https://canopy-frontend-task.now.sh/api/holdings')
            .then(res => res.json())
            .then(data => {
                setLoading(false)
                setApiData(data.payload)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    //Props for table rendering
    let COLUMNS, columnOrder

    COLUMNS = [
        {
            Header: 'Name',
            accessor: 'name',
            Cell: props => props.value ? <div>{props.value}</div> : <div>-</div>,
        },
        {
            Header: 'Ticker',
            accessor: 'ticker',
            Cell: props => props.value ? <div>{props.value}</div> : <div>-</div>,
        },
        {
            Header: 'Asset Class',
            accessor: 'asset_class',
            Cell: props => props.value ? <div>{props.value}</div> : <div>-</div>,
        },
        {
            // Header: 'Avg Price',
            Header: <span>Avg Price</span>,
            accessor: 'avg_price',
            Cell: props => props.value ? <div>{formatAmount.format(props.value)}</div> : <div>-</div>,
        },
        {
            Header: 'Market Price',
            accessor: 'market_price',
            Cell: props => props.value ? <div>{formatAmount.format(props.value)}</div> : <div>-</div>,
        },
        {
            Header: 'Latest Change %',
            accessor: 'latest_chg_pct',
            Cell: props => props.value ? <div>{props.value}%</div> : <div>-</div>,
        },
        {
            Header: <span>Market Value in Base CCY</span>,
            accessor: 'market_value_ccy',
            Cell: props => props.value ? <div>{formatAmount.format(props.value)}</div> : <div>-</div>,
        }
    ]

    // On loading/refreshing, the application decides the screen size and handles columns appropriately
    if (window.screen.width < 800) {
        COLUMNS = COLUMNS.slice(0, 3)
        columnOrder = isOrdered ? ['name', 'ticker', 'asset_class'] : ['asset_class', 'name', 'ticker']
    } else {
        columnOrder = isOrdered ? ['name', 'ticker', 'asset_class', 'avg_price', 'market_price', 'latest_chg_pct', 'market_value_ccy'] : ['ticker', 'asset_class', 'name', 'market_value_ccy', 'market_price', 'avg_price', 'latest_chg_pct']
    }

    const setOrdered = (order) => {
        setIsOrdered(order)
    }

    return <Fragment>
        <div className='container'>
            <h1 className='center brand'>Juvoxa</h1>

            <button onClick={() => history.push('/transactions')} className='btn btn-large btn-light'>View Transactions <i className='fas fa-exchange-alt'></i></button>

            <div className='table-container'>
                {apiData.length !== 0 && <Viewtable
                    apiData={apiData}
                    COLUMNS={COLUMNS}
                    columnOrder={columnOrder}
                    setOrdered={setOrdered}
                />}

                {loading && <Spinner />}

            </div>
        </div>
    </Fragment>
}

export default Dashboard