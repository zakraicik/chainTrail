import React from 'react'
import Chart from 'react-apexcharts'
import { Utils } from 'alchemy-sdk'
import { RiseLoader } from 'react-spinners'

import '../css/transactionSummary.css'

const TransactionSummary = ({ transactionDetails }) => {
  if (!transactionDetails) {
    return (
      <div className='transaction-summary-loading-container'>
        <div>
          <RiseLoader color='#72f491' size='20' />
          <p className='h1'>Loading transaction details</p>
        </div>
      </div>
    )
  }

  const valueData = transactionDetails.map(transaction =>
    Utils.formatUnits(transaction.value, 'ether').toLocaleString()
  )

  const transactionIndexData = transactionDetails.map(transaction =>
    Number(transaction.transactionIndex)
  )

  const gasPriceData = transactionDetails.map(transaction =>
    Utils.formatUnits(transaction.gasPrice, 'gwei').toLocaleString()
  )

  // const toAddresses = transactionDetails.map(transaction => transaction.to)

  // const fromAddresses = transactionDetails.map(transaction => transaction.from)

  // const transactionHashes = transactionDetails.map(
  //   transaction => transaction.hash
  // )

  const chartOptions = {
    chart: {
      type: 'line'
    },
    series: [
      {
        name: 'Transaction Value',
        data: valueData
      },
      {
        name: 'Gas Price',
        data: gasPriceData
      }
    ],
    xaxis: {
      type: 'numeric',
      stepSize: 1,

      axisBorder: {
        show: true,
        color: '#6A6A6A'
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: '#6A6A6A'
        },
        rotate: -90
      },
      title: {
        text: 'Transaction Index (Ordered Chronologically)',
        style: {
          color: '#6A6A6A',
          fontSize: '14px',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 600
        }
      }
    },
    stroke: {
      curve: 'smooth'
    },
    grid: {
      show: false
    },
    colors: ['#72f491', '#DE6E51'],
    yaxis: [
      {
        axisBorder: {
          show: true,
          color: '#6A6A6A'
        },
        labels: {
          style: {
            colors: '#6A6A6A'
          },
          formatter: value => Math.round(value)
        },
        title: {
          text: 'Transaction Value (Ether)',
          style: {
            color: '#6A6A6A',
            fontSize: '14px',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 600
          }
        }
      },
      {
        opposite: true,
        axisBorder: {
          show: true,
          color: '#6A6A6A'
        },
        labels: {
          style: {
            colors: '#6A6A6A'
          },
          formatter: value => Math.round(value)
        },
        title: {
          text: 'Gas Price (Gwei)',
          style: {
            color: '#6A6A6A',
            fontSize: '14px',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 600
          }
        }
      }
    ],
    legend: {
      show: true,
      labels: {
        colors: ['#6A6A6A', '#6A6A6A']
      }
    }
    // tooltip: {
    //   custom: function ({ series, seriesIndex, dataPointIndex, w }) {
    //     const to = toAddresses[dataPointIndex]
    //     const from = fromAddresses[dataPointIndex]
    //     const transactionHash = transactionHashes[dataPointIndex]
    //     const gasPrice = series[seriesIndex][dataPointIndex]

    //     return (
    //       '<div class="tooltip-container">' +
    //       '<div><strong>Transaction Index:</strong> ' +
    //       transactionIndexData[dataPointIndex] +
    //       '</div>' +
    //       '<div><strong>Gas Price:</strong> ' +
    //       gasPrice +
    //       ' Gwei</div>' +
    //       '<div><strong>From:</strong> ' +
    //       from +
    //       '</div>' +
    //       '<div><strong>To:</strong> ' +
    //       to +
    //       '</div>' +
    //       '<div><strong>Transaction Hash:</strong> ' +
    //       transactionHash +
    //       '</div>' +
    //       '</div>'
    //     )
    //   }
    // }
  }

  return (
    <div className='transaction-summary-information-container'>
      <>
        <div className='h1'>Transaction Details</div>
        <div className='apex-chart'>
          <Chart
            options={chartOptions}
            series={chartOptions.series}
            type='line'
            height='250'
          />
        </div>
      </>
    </div>
  )
}

export default TransactionSummary
