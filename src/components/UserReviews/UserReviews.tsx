import { useState, useEffect, Fragment } from 'react';
import { type ChangeEvent, type FormEvent } from 'react';
import {AuthorizationStatus} from '../../const';
import { IReview } from '../../types/types';

import { useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/user/selectors';
import { getOffer } from '../../store/offers/selectors';

import {User} from '../../mocks/User';


type ReviewsProps = {
  review: IReview;
}

const getDefaultReview = (): IReview => ({
  id: '',
  comment: '',
  date: '',
  rating: 0,
  user: User
});

const Review = ({ review }: ReviewsProps) => {
  const date = new Date(review.date);
  const dateTime = date.toISOString();
  const formattedDate = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="Аватар пользователя"/>
        </div>
        <span className="reviews__user-name">
          {review.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span className={`raiting-${Math.round(review.rating)}-star`}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={dateTime}>{formattedDate}</time>
      </div>
    </li>
  );
};

const UserReviews = () => {

  const authStatus = useAppSelector(getAuthStatus);
  const userLogged = authStatus === AuthorizationStatus.Auth;

  const { reviews } = useAppSelector(getOffer);

  const [newReview, setNewReview] = useState<IReview>(getDefaultReview());
  const [isValidReview, setIsValidReview] = useState<boolean>(false);

  useEffect(() => {
    let isValid = true;

    if (newReview.rating === 0) {
      isValid = false;
    }

    if (newReview.comment.length < 50) {
      isValid = false;
    }

    setIsValidReview(isValid);
  }, [newReview]);

  const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setNewReview({...newReview, rating: value});
  };

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const {value} = event.target;
    setNewReview({...newReview, comment: value});
  };

  const handleClickSubmit = (e: FormEvent) => {
    e.preventDefault();
    setNewReview(getDefaultReview());
  };

  const mapRatingStars = () => [1, 2, 3, 4, 5].reverse().map((rating) => {
    let title = '';
    switch (rating) {
      case 1:
        title = 'terribly';
        break;
      case 2:
        title = 'badly';
        break;
      case 3:
        title = 'not bad';
        break;
      case 4:
        title = 'good';
        break;
      case 5:
        title = 'perfect';
        break;
    }

    return (
      <Fragment key={rating}>
        <input className="form__rating-input visually-hidden" name="rating" value={rating} id={`${rating}-stars`} type="radio" onChange={handleRatingChange} checked={newReview.rating === rating}/>
        <label htmlFor={`${rating}-stars`} className="reviews__rating-label form__rating-label" title={title}>
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </Fragment>
    );
  });

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => <Review key={review.id} review={review}></Review>)}
      </ul>
      {userLogged &&
        <form className="reviews__form form" action="#" method="post">
          <label className="reviews__label form__label" htmlFor="review">Your review</label>
          <div className="reviews__rating-form form__rating">
            {mapRatingStars()}
          </div>
          <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" onChange={handleCommentChange} value={newReview.comment}></textarea>
          <div className="reviews__button-wrapper">
            <p className="reviews__help">
              To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <span className="reviews__text-amount">50 characters</span>.
            </p>
            <button className="reviews__submit form__submit button" type="submit" disabled={!isValidReview} onClick={handleClickSubmit}>Submit</button>
          </div>
        </form>}
    </section>
  );
};

export default UserReviews;
