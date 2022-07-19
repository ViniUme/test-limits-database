import Navbar from '../components/navbar';
import FrontCover from '../components/front_cover';
import GymClass from '../components/gym_class';
import Page from '../components/page';
import style from '../styles/index.module.scss';

export default function Index() {

  return(
    <Page title="Academia Limits - Exceda seus limites" description="Compra de produtos">
      <div className={style.container}>
        <Navbar/>
        <FrontCover/>
        <GymClass/>
      </div>
    </Page>
  )
}