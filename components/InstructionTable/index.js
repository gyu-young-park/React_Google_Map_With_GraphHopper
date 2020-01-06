import React, {useState,useEffect} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {navigationPageFlushSelectedInstruction, NAVIGATION_PAGE_FILL_SELECTED_INSTRUCTION} from '../../reducers/googleMap';
import {useDispatch , useSelector} from 'react-redux';
import { blockStatement } from '@babel/types';
const InstructionTable = () => {
    /*
    markerState로 table 다시
    */
    const {jsonResponse, selectedInstruction, markerState} = useSelector(state => state.googleMap);
    const [inst,setInst] = useState([]);

    //react-bootstrap-table option object
    const options = {
      noDataText: 'No route found',
      onRowClick: function(row){
        navigationPageFillSelectedInstruction = {
          type: NAVIGATION_PAGE_FILL_SELECTED_INSTRUCTION,
          data: [row.points[0], row.points[1]]
        }
        //console.log(navigationPageFillSelectedInstruction);
        dispatch(navigationPageFillSelectedInstruction);
      }
    };

    useEffect(()=>{
        if(JSON.stringify(jsonResponse) === JSON.stringify({})){
            console.log("EMPTY\n");
            setInst([]);
        }else{
            let len = jsonResponse.paths["0"].instructions.length;
            let temp = [];
            for(var i=0 ;  i<len; i++){
                let idx = jsonResponse.paths["0"].instructions[i].interval[0];
                temp.push({
                index : i,
                // distance : jsonResponse.paths["0"].instructions[i].distance,
                // sign : jsonResponse.paths["0"].instructions[i].sign,
                // points : jsonResponse.paths["0"].instructions[i].points[idx],
                // street_name : jsonResponse.paths["0"].instructions[i].street_name,
                text : jsonResponse.paths["0"].instructions[i].text,
                time : jsonResponse.paths["0"].instructions[i].time
                });
            }
            setInst(temp);
        }
    },[jsonResponse]);

    useEffect(()=>{
        if(selectedInstruction.length != 0){
            alert(selectedInstruction[0]);
        }
    },[selectedInstruction])

    return(
        <div style={{height:'450px', overflow:'auto'}}>
            <BootstrapTable data={inst} option={options} striped hover condensed>
            <TableHeaderColumn isKey dataField='index'>index</TableHeaderColumn>
            {/* <TableHeaderColumn dataField='distance'>distance</TableHeaderColumn> */}
            {/* <TableHeaderColumn dataField='sign'>sign</TableHeaderColumn> */}
            {/* <TableHeaderColumn dataField='points'>points</TableHeaderColumn> */}
            {/* <TableHeaderColumn dataField='street_name'>street_name</TableHeaderColumn> */}
            <TableHeaderColumn dataField='text'>Instruction</TableHeaderColumn>
            <TableHeaderColumn dataField='time'>time(ms)</TableHeaderColumn>
        </BootstrapTable>
        </div>

     );
}

export default InstructionTable;
