import { AppBar, Box, Button, TextField, Typography, Container, Toolbar, Link, Paper } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../../../api"
import IRestaurante from "../../../interfaces/IRestaurante"
import { Link as RouterLink } from "react-router-dom"

const FormularioRestaurante = () => {
    const parametros = useParams()

    useEffect(() => {
        if (parametros.id) {
            api.get<IRestaurante>(`restaurantes/${parametros.id}/`)
                .then(resposta => setNomeRestaurante(resposta.data.nome))
        }
    }, [parametros])

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if (parametros.id) {
            api.put(`restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert("restaurante atualizado")
                })
        } else {
            api.post('restaurantes/', {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert("restaurante cadastrado")
                })

        }
    }

    return (
        <>
            <Box>
                <Container maxWidth='lg' sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography component="h1" variant="h6" sx={{ flexGrow: 1}}>Formulário de Restaurantes</Typography>
                            <Box component="form" sx={{width: '100%'}} onSubmit={aoSubmeterForm}>
                                <TextField
                                    label="Nome do Restaurante"
                                    variant="standard"
                                    value={nomeRestaurante}
                                    onChange={evento => setNomeRestaurante(evento.target.value)}
                                    required
                                    sx={{width: '100%'}} />
                                <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Box>

        </>
    )
}
export default FormularioRestaurante