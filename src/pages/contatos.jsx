import Page from '../components/page';
import Contacts from '../components/contact';
import Coaches from '../components/coaches';
import { VerifyUser } from '../utils/functions';
import { parseCookies } from 'nookies';
import styles from '../styles/contatos.module.scss';

export async function getServerSideProps(context){
    let cookies = parseCookies(context);
  if(cookies.USER_LOGIN != undefined){
    let data = await VerifyUser(cookies.USER_LOGIN, context.req.rawHeaders[1]);

    return {
        props: {
            cookies: cookies,
            data: data.user
        }
    }
  }
  else{
    return {
      props: {
        cookies: cookies,
        data: {name: null}
      }
    }
  }
}

export default function Contatos(props){
    return(
        <Page title="Contatos Limits Gym" description="Página com todos contatos da Limits Gym" cookies={props.cookies} name={props.data.name} link="contacts">
            <section className={styles.contatos}>
                <Contacts/>
                <Coaches/>
            </section>
        </Page>
    )
}