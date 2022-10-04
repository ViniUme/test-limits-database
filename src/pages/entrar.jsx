import Page from '../components/page';
import Loading from '../components/loading';
import { LoginUser, VerifyUser } from '../utils/functions';
import Link from 'next/link';
import { parseCookies, setCookie } from 'nookies';
import { useState, useEffect } from 'react';
import styles from '../styles/entrar.module.scss';

export async function getServerSideProps(context){
    let cookies = parseCookies(context);
    const data = await VerifyUser(cookies.USER_LOGIN, context.req.rawHeaders[1]);

    return {
        props: {
            cookies: cookies,
            data: data
        }
    }
}

export default function Login(props){

    const json = {
        email: '',
        pass: ''
    }
    const [data, setData] = useState(json);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const url_var = new URLSearchParams(window.location.search);
        const msg = url_var.get('created');
        
        if(msg == 'true'){
            setMessage('usuario criado com sucesso')
        }
    }, [])


    function InputEdit(e){
        const {id, value} = e.target;
        setData({...data, [id]: value});
    }

    async function Submit(e){
        e.preventDefault();
        
        setMessage('loading');
        const response = await LoginUser(data);
        
        if(response.message == true){
            setCookie(null, 'USER_LOGIN', `${response.user}`, {
                maxAge: 86400 * 365,
                path: '/'
            });
            window.location.href = '/';
        }
        else{
            setMessage('seu e-mail ou senha estão incorretos');
        }
    }

    if((message != 'loading') && (props.cookies.USER_LOGIN == undefined)){
        return(
            <Page title='Entre com sua conta na Limits Gym' description='Tela para acessar a conta do cliente da academia' cookies={props.cookies} name={props.data.name}>
                <form className={styles.login} onSubmit={(e) => Submit(e)}>
                    <h1 className={styles.title}>entre com seu email</h1>
                    <div className={styles.input_div}>
                        <input className={styles.input} placeholder=' ' id='email' type='text' value={data.email} onChange={(e) => InputEdit(e)} autoComplete='off' />
                        <label className={styles.label} htmlFor='email'>E-mail</label>
                        <span className={styles.line} />
                    </div>
                    <div className={styles.input_div}>
                        <input className={styles.input} placeholder=' ' id='pass' type='text' value={data.pass} onChange={(e) => InputEdit(e)} autoComplete='off' />
                        <label className={styles.label} htmlFor='pass'>Senha</label>
                        <span className={styles.line} />
                    </div>

                    <span className={styles.message}>{message}</span>

                    <input className={styles.button} type='submit' value="entrar" />

                    <Link href='/cadastro'><a className={styles.sign_on}>Cadastrar-se na Limits Gym</a></Link>
                </form>               
            </Page>
        )
    }
    if(message == 'loading'){
        return(
            <>
                {Loading()}
            </>
        )
    }
    if(props.cookies.USER_LOGIN != undefined){
        return(
            <Page title='Acesso Concebido' description='' cookies={props.cookies}>
                <section className={styles.user_loged}>
                    <h1 className={styles.main}>Parabens, seu acesso foi concebido, o quê gostaria de fazer agora ?</h1>
                    <div className={styles.input_div}>
                        <Link href='#'><a className={styles.link}>ir para o início</a></Link>
                        <Link href='#'><a className={styles.link}>ver produtos</a></Link>
                        <Link href='#'><a className={styles.link}>ver planos</a></Link>
                        <Link href='#'><a className={styles.link}>ver perfil</a></Link>
                    </div>
                </section>
            </Page>
        )
    }
    
    return<></>
    
}