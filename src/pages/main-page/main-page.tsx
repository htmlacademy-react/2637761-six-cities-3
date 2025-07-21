import OfferCard from '../../components/offer-card/offer-card';
import {City, IOffer} from '../../types/types';
import Header from '../../components/header/header';
import {cityData} from '../../store/city-data/city-data';
import {offerData} from '../../store/offer-data/offer-data';

export type MainPageProps = {
  selectedCityId: number;
}

const mapOffers = (offers: IOffer[]) => offers.map((offer) => OfferCard(offer));

const emptyCityOffers = (cityName: string) => (
  <section className="cities__no-places">
    <div className="cities__status-wrapper tabs__content">
      <b className="cities__status">No places to stay available</b>
      <p className="cities__status-description">We could not find any property available at the moment in {cityName}</p>
    </div>
  </section>
);

const existingCityOffers = (cityName: string, offers: IOffer[]) => (
  <section className="cities__places places">
    <h2 className="visually-hidden">Places</h2>
    <b className="places__found">{offers.length} places to stay in {cityName}</b>
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        <li className="places__option places__option--active" tabIndex={0}>Popular</li>
        <li className="places__option" tabIndex={0}>Price: low to high</li>
        <li className="places__option" tabIndex={0}>Price: high to low</li>
        <li className="places__option" tabIndex={0}>Top rated first</li>
      </ul>
    </form>
    <div className="cities__places-list places__list tabs__content">{mapOffers(offers)}</div>
  </section>
);


function MainPage({ selectedCityId }: MainPageProps) {

  const userLogged = false;

  const selectedCity: City = cityData.find((r) => r.cityId === selectedCityId)!;
  const cityOffers = offerData.filter((r) => r.cityId === selectedCityId);

  const cityOffersEmpty = cityOffers.length === 0;

  const mapCities = (city: City[]) => city.map((item) => (
    <li key={item.cityId} className="locations__item">
      <a className={`locations__item-link tabs__item ${(item.cityId === selectedCityId ? 'tabs__item tabs__item--active' : '')}`} href="#">
        <span>{item.cityName}</span>
      </a>
    </li>
  ));

  return (
    <div className="page page--gray page--main">
      <Header userLogged={userLogged}/>

      <main className={`page__main page__main--index ${cityOffersEmpty ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">{mapCities(cityData)}</ul>
          </section>
        </div>
        <div className="cities">
          <div className={`cities__places-container ${cityOffersEmpty ? 'cities__places-container--empty' : ''} container`}>
            {cityOffersEmpty ? emptyCityOffers(selectedCity.cityName) : existingCityOffers(selectedCity.cityName, cityOffers)}
            <div className="cities__right-section">
              {cityOffersEmpty ? null : <section className="cities__map map"></section>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
