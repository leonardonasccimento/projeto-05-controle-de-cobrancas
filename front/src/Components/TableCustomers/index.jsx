import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import ChargesIcon from '../../assets/charges-pink.svg';
import OrganizeIcon from '../../assets/organize-icon.svg';
import useGlobalContext from '../../hooks/useGlobalContext';
import api from '../../services/api';
import ModalAddCharge from '../ModalAddCharge';
import './style.css';

export default function TableCustomers({searchValue}) {
  const [openModalAddCharge, setOpenModalAddCharge] = useState(false);
  const [clickedOrganizeCustomers, setClickedOrganizeCustomers] = useState(false);
  
  const { 
    token, 
    customersArray, 
    setCustomersArray, 
    setCurrentCustomer } = useGlobalContext();

  function handleVerifyDataCustomer(row) {
    setCurrentCustomer(row);
  }

  async function handleLoadCustomers() {
    try {
      // let valueAndClick=searchValue&&clickedSearchIcon?
      // searchValue:
      // '';
      
      const response = await api.get(`/cliente?query=${searchValue}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status > 204) {
        return;
      }

      setCustomersArray(
        clickedOrganizeCustomers?
        [...response.data].sort((a,b)=>(b.nome).localeCompare(a.nome)):
        [...response.data].sort((a,b)=>(a.nome).localeCompare(b.nome))
      );
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  useEffect(() => {
    handleLoadCustomers();
  });

  return (
    <TableContainer >
      <Table sx={{ minWidth: '28rem' }} size="medium" aria-label="a dense table">
        <TableHead>
          <TableCell className="title-table">
            <img
              src={OrganizeIcon}
              alt="organize"
              onClick={() =>
                setClickedOrganizeCustomers(!clickedOrganizeCustomers)
              }
            />
            <span>Cliente</span>
          </TableCell>
          <TableCell className="title-table">CPF</TableCell>
          <TableCell className="title-table">E-mail</TableCell>
          <TableCell className="title-table">Telefone</TableCell>
          <TableCell className="title-table">Status</TableCell>
          <TableCell className="title-table">Criar Cobrança</TableCell>
        </TableHead>
        <TableBody>
          {customersArray.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row" className="table-items">
                <span className='resized-text'>{row.nome}</span>
              </TableCell>
              <TableCell className="table-items">{row.cpf}</TableCell>
              <TableCell className="table-items">
                <span className='resized-text'>{row.email}</span>
              </TableCell>
              <TableCell className="table-items">
                <span className='resized-text'>{row.telefone}</span>
              </TableCell>
              <TableCell className="table-items">
                <span
                  className={
                    (row.status === "Em dia" && "status-color in-day") ||
                    (row.status === "Inadimplente" && "status-color defaulter")
                  }
                >
                  {row.status}
                </span>
              </TableCell>
              <TableCell className="table-items">
                <div onClick={() => handleVerifyDataCustomer(row)}>
                  <img
                    className="add-icon"
                    src={ChargesIcon}
                    alt="cobranca"
                    onClick={() => setOpenModalAddCharge(true)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ModalAddCharge
        openModalAddCharge={openModalAddCharge}
        handleClose={() => setOpenModalAddCharge(false)}
      />
    </TableContainer>
  );
}