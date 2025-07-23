import MainPage from '../../pages/MainPage/MainPage';
import { MainPageProps } from '../../pages/MainPage/MainPage';

type Props = {
  data: MainPageProps;
}

function App({ data }: Props) {
  return (
    <MainPage {...data}/>
  );
}

export default App;
