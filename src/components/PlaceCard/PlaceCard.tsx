import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {PlaceCardProps, PlaceViewType} from '../../types/types.ts';
import '../../styles/main.css';

const PlaceCard = ({ viewType, place, onHover }: PlaceCardProps) => {
  const { id, isPremium, isFavorite, rating, previewImage, price, type, title } = place;

  const linkRoute = AppRoute.Offer.replace(':id', id.toString());

  const handleMouseEnter = () => {
    if (onHover) {
      onHover(place);
    }
  };

  const handleMouseLeave = () => {
    if (onHover) {
      onHover();
    }
  };

  return (
    <article className={`${viewType}__card place-card`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={`${viewType}__image-wrapper place-card__image-wrapper`}>
        <Link to={linkRoute}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Фото отеля"/>
        </Link>
      </div>
      <div className={`${viewType === PlaceViewType.Favorite ? 'favorites__card-info' : ''} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <span className="place-card__price-value">&euro;{price}</span>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">${isFavorite ? 'In' : 'To'}To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span className={`raiting-${Math.round(rating)}-star`}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={linkRoute}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

export default PlaceCard;
