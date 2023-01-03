import { Box, Button, TextField, Typography, Container, Paper, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../../../api"
import IPrato from "../../../interfaces/IPrato"
import IRestaurante from "../../../interfaces/IRestaurante"
import ITag from "../../../interfaces/ITag"

const FormularioPrato = () => {

    useEffect(() => {
        api.get<{ tags: ITag[] }>('tags/')
        .then(resposta => setTag(resposta.data.tags))
        api.get<IRestaurante[]>('restaurantes/')
        .then(resposta => setRestaurantes(resposta.data))
    }, [])

    const [nomePrato, setNomePrato] = useState('')
    const [descricao, setDescricao] = useState('')
    const [tag, setTag] = useState<ITag[]>([])
    const [tags, setTags] = useState('');
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
    const [restaurante, setRestaurante] = useState('')
    const [imagem, setImagem] = useState<File | null>(null)

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        const formData = new FormData()
        formData.append('nome', nomePrato)
        formData.append('descricao', descricao)
        formData.append('tag', tags)
        formData.append('restaurante', restaurante)
        if(imagem) {
            formData.append('imagem', imagem)
        }
        api.request({
            url: 'pratos/',
            method: 'POST',
            headers: {
                'Content-type': 'multipart/form-data'
            },
            data: formData
        })
        .then(() => {
            setNomePrato('')
            setDescricao('')
            setTags('')
            setRestaurante('')
             alert('Prato cadastrado com sucesso!')
            })
             .catch(erro => console.log(erro))
    }

    const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
        if (evento.target.files?.length) {
            setImagem(evento.target.files[0])
        } else {
            setImagem(null)
        }
    }

    return (
        <>
            <Box>
                <Container maxWidth='lg' sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography component="h1" variant="h6" sx={{ flexGrow: 1}}>Formulário de Pratos</Typography>
                            <Box component="form" sx={{width: '100%'}} onSubmit={aoSubmeterForm}>
                                <TextField
                                    label="Nome do Prato"
                                    variant="standard"
                                    value={nomePrato}
                                    onChange={evento => setNomePrato(evento.target.value)}
                                    required
                                    margin="dense"
                                    sx={{width: '100%'}} />
                                <TextField
                                    label="Descrição"
                                    variant="standard"
                                    value={descricao}
                                    onChange={evento => setDescricao(evento.target.value)}
                                    required
                                    margin="dense"
                                    sx={{width: '100%'}} />

                                    <FormControl margin="dense" fullWidth>
                                        <InputLabel id="select-tag">Tag</InputLabel>
                                        <Select labelId="select-tag" value={tags} onChange={evento => setTags(evento.target.value)}>
                                            {tag.map(tag => <MenuItem value={tag.value} key={tag.id}>
                                                {tag.value}
                                            </MenuItem>)}
                                        </Select>
                                    </FormControl>
                                    <FormControl margin="dense" fullWidth>
                                        <InputLabel id="select-restaurante">Restaurante</InputLabel>
                                        <Select labelId="select-restaurante" value={restaurante} onChange={evento => setRestaurante(evento.target.value)}>
                                            {restaurantes.map(restaurante => <MenuItem value={restaurante.id} key={restaurante.id}>
                                                {restaurante.nome}
                                            </MenuItem>)}
                                        </Select>
                                    </FormControl>
                                    <input type="file" onChange={selecionarArquivo}></input>
                                <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Box>

        </>
    )
}
export default FormularioPrato