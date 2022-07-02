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
import ModalCharges from '../ModalCharges';
import './style.css';

export default function TableCustomers() {
  const [openModalAddCharges, setOpenModalAddCharges] = useState("");
  const { token, customers, setCustomers, setCurrentCustomer } = useGlobalContext();

  function handleVerifyDataCustomer(row) {
    setCurrentCustomer(row);
  }

  useEffect(() => {
    async function loadCustomers() {
      try {
        const response = await api.get("/cliente", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status > 204) {
          return;
        }

        setCustomers([...response.data]);
      } catch (error) {
        console.log(error);
      }
    }
    loadCustomers();
  }, []);

  return (
    <TableContainer>
      <Table sx={{ minWidth: 280 }} size="medium" aria-label="a dense table">
        <TableHead>
          <TableCell className="title-table">
            <img src={OrganizeIcon} alt="organize" />
            <span>Cliente</span>
          </TableCell>
          <TableCell className="title-table">CPF</TableCell>
          <TableCell className="title-table">E-mail</TableCell>
          <TableCell className="title-table">Telefone</TableCell>
          <TableCell className="title-table">Status</TableCell>
          <TableCell className="title-table">Criar Cobrança</TableCell>
        </TableHead>
        <TableBody>
          {customers.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row" className="table-items">
                {row.nome}
              </TableCell>
              <TableCell className="table-items">{row.cpf}</TableCell>
              <TableCell className="table-items">{row.email}</TableCell>
              <TableCell className="table-items">{row.telefone}</TableCell>
              <TableCell className="table-items">{row.status}</TableCell>
              <TableCell className="table-items">
                <div onClick={() => handleVerifyDataCustomer(row)}>
                  <img
                    src={ChargesIcon}
                    alt="cobranca"
                    onClick={() => setOpenModalAddCharges(true)}
                    // onClick={() => handleOpenChargesAdd()}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ModalCharges
        open={openModalAddCharges}
        handleClose={() => setOpenModalAddCharges(false)}
      />
    </TableContainer>
  );
}