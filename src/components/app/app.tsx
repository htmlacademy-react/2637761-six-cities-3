import MainPage from '../../pages/main-page/main-page';
import { MainPageProps } from '../../pages/main-page/main-page';

type Props = {
  data: MainPageProps;
}

function App({ data }: Props) {
  return (
    <MainPage {...data}/>
  );
}

export default App;
