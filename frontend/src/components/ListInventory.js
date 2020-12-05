import React from "react";
//material core
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";

import orderStyle from "../style/orderStyle.js";
import { MenuItem, Select } from "@material-ui/core";

const useStyles = makeStyles(orderStyle);

const columns = [
  {
    field: "id",
    headerName: "Product ID",
    width: 250,
    headerClassName: "header",
  },
  {
    field: "description",
    flex: 1,
    headerName: "Description",
    headerClassName: "header",
  },
  {
    field: "totalStock",
    headerName: "Stock",
    width: 150,
    headerClassName: "header",
  },
  {
    field: "location",
    headerName: "Zone",
    sortable: false,
    disableClickEventBubbling: true,
    width: 150,
    headerClassName: "header",
    renderCell: (params) => {
      function handleChange(event) {
        // update the underlying data for the row
        params.api.updateRowData([{
          id: params.getValue('id'),
          selectedWarehouse: event.target.value,
        }]);
      }

      return (
        <Select
          onChange={handleChange}
          defaultValue={0}
          style={{ width: "100%" }}>
          {params.data.warehouses.map(({ location }, index) => {
            return (
              <MenuItem
                key={index}
                value={index}>
                {location}
              </MenuItem>);
          })}
        </Select>
      );
    },
  },
  {
    field: "quantity",
    description: "Stock per location",
    headerName: "Quantity",
    width: 150,
    headerClassName: "header",
    valueGetter: (params) => {
      const { selectedWarehouse, warehouses } = params.data
      return warehouses[selectedWarehouse].stock;
    },
    sortComparator: (v1, v2, cellParams1, cellParams2) => {
      const data1 = cellParams1.data;
      const data2 = cellParams2.data;

      const stock1 = data1.warehouses[data1.selectedWarehouse].stock;
      const stock2 = data2.warehouses[data2.selectedWarehouse].stock;

      return stock1 - stock2;
    }
  },
];

function ListInventory({data}) {
  const classes = useStyles();

  return (
    <div className={classes.table}>
      <DataGrid
        onClick={(ev) => { ev.preventDefault() }}
        autoHeight
        className={classes.tables}
        rows={data}
        columns={columns.map((column) => ({
          ...column,
          disableClickEventBubbling: true,
        }))}
        pageSize={10}
        disableSelectionOnClick
      />
    </div>
  );
}

export default ListInventory;
