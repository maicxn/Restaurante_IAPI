import { Button, Paper, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"
import Table from "@mui/material/Table"
import TableHead from "@mui/material/TableHead"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../../../api"
import IPrato from "../../../interfaces/IPrato"


const AdministracaoPratos = () => {
    const [pratos, setPratos] = useState<  IPrato[]>([])

    useEffect(() => {
        api.get<   IPrato[]>('pratos/')
        .then(resposta => setPratos(resposta.data))
    }, [])

    const excluir = (pratosExcluido:  IPrato) => {
        api.delete(`pratos/${pratosExcluido.id}/`)
        .then(() => {
                const listaPratos = pratos.filter(pratos => pratos.id !== pratosExcluido.id)
                setPratos([...listaPratos])
        })
    }
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Tag
                        </TableCell>
                        <TableCell>
                            Imagem
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pratos.map((prato) =>
                        <TableRow key={prato.id}>
                            <TableCell>
                                {prato.nome}
                            </TableCell>
                            <TableCell>
                                <a href={prato.imagem} target="_blank" rel="noreferrer">Ver Imagem</a>
                            </TableCell>
                            <TableCell>
                                {prato.tag}
                            </TableCell>
                            <TableCell>
                                [ <Link to={`/admin/pratos/${prato.id}`}>Editar</Link> ]
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" color="error" onClick={() => excluir(prato)}>Excluir</Button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>

            </Table>
        </TableContainer>
    )
}

export default AdministracaoPratos