import React from 'react';
import Table from 'react-bootstrap/Table'

const DataTable = () => {
  return(
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>고도</th>
            <th>최대 속도</th>
            <th>거리</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>234M</td>
            <td>80KM/H</td>
            <td>12KM</td>
          </tr>
          <tr>
            <td>2</td>
            <td>234M</td>
            <td>80KM/H</td>
            <td>12KM</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan="2">없음</td>
            <td>11KM</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default DataTable;
