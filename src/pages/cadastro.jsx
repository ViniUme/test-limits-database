import Page from '../components/page';
import { useState } from 'react';

export default function SignRoute(){

    const info = [
        ['nome', 'Nome'],
        ['cid', 'Cidade'],
        ['rua', 'Rua'],
        ['email', 'E-mail'],
        ['tel', 'Telefone/Celular'],
        ['bair', 'Bairro'],
        ['rg', 'RG'],
        ['senha', 'Senha'],
        ['senha', 'Comfirmar senha']
    ]
    const json = {
        "nome": "",
        "cid": "",
        "rua": "",
        "email": "",
        "tel": "",
        "bair": "",
        "rg": "",
        "senha": ""
    }
    const [data, setData] = useState(json);

    return(
        <Page title="Faça seu cadastro na Limits Gym" context="Tela para criação de usuário e efetuação do seu cadastro no banco de dados">
            <section>
                <form>
                    {info && info.map((item, key) => {
                        return(
                            <div key={key}>
                                <label htmlFor={info[0]}>{item[1]}</label>
                                <input type="text" id={item[0]} value={eval(`data.${item[0]}`)} />
                            </div>
                        )
                    })}
                </form>
            </section>
        </Page>
    )
}