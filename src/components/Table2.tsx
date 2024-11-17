import React from "react";
import { Table } from "@mantine/core";
import { CropAverage } from "../types";
import '../style.css'

interface Props {
  data: CropAverage[];
}

const Table2: React.FC<Props> = ({ data }) => {
  return (
    <Table className="custom-table" striped highlightOnHover withRowBorders withColumnBorders>
      <thead>
        <tr>
          <th>Crop</th>
          <th>Average Yield (Kg/Ha)</th>
          <th>Average Cultivation Area (Ha)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.crop}>
            <td>{row.crop}</td>
            <td>{row.avgYield.toFixed(3)}</td>
            <td>{row.avgCultivationArea.toFixed(3)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Table2;
