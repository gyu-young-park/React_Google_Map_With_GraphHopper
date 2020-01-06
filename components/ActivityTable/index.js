import React, { useState } from 'react'
import Link from 'next/link';
import * as ROUTES from '../../constants/routes'
import { Table } from 'antd';
import { useSelector, useDispatch } from "react-redux"

const columns = [
  {
    title: "End Time",
    dataIndex: "endTimeInDate",
    render: function endTime (value) {
      return (
        <Link href={ROUTES.HISTORY}>
          <a>
            {value}
          </a>
        </Link>
      )
    }
  },
  {
    title: "Distance",
    dataIndex: "distance",
    render: function distance (value) {
      if (value < 1000)
        value = `${value} m`
      else
        value = `${(value / 1000).toFixed(2)} km`
      return (
        <a>
          {value}
        </a>
      )
    }
  },
  {
    title: "Ascented Altitude",
    dataIndex: "ascentAltitude"
  },
  {
    title: "Descented Altitude",
    dataIndex: "descentAltitude"
  },
  {
    title: "Riding Time",
    dataIndex: "ridingTime"
  }
]

const INITIAL_STATE = {
  selectedRowKeys: []
}

const ActivityTable = () => {
  const [state, setState] = useState(INITIAL_STATE)
  const activityStorage = useSelector(state => (state.Activity))

  const onSelectChange = (selectedRowKeys) => {
    setState({ selectedRowKeys });
  };

  const rowSelection = {
    selectedRowKeys: state.selectedRowKeys,
    onChange: onSelectChange,
    hideDefaultSelections: true,
    selections: [
      {
        key: 'all-data',
        text: 'Select All Data',
        onSelect: () => {
          setState({
            selectedRowKeys: [...activityStorage.sttList.keys()], // 0...45
          });
        },
      }
    ]
  };


  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={activityStorage.sttList}
    />
  )
}

export default ActivityTable
