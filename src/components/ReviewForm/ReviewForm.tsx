import { useState, useEffect, useCallback, type ChangeEvent, type FormEvent } from 'react';
import { CommentData } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAddReviewHasError, getOfferId } from '../../store/offers/selectors';
import { addCommentAction } from '../../store/apiActions';
import RatingStars from '../RatingStars';
import { getUserLogged } from '../../store/user/selectors';

const ReviewForm = () => {
  const dispatch = useAppDispatch();

  const userLogged = useAppSelector(getUserLogged);
  const offerId = useAppSelector(getOfferId);
  const hasError = useAppSelector(getAddReviewHasError);

  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [isValidReview, setIsValidReview] = useState(false);

  const validateForm = useCallback(() => setIsValidReview(newRating > 0 && (newComment.length >= 50 && newComment.length < 300)), [newRating, newComment]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  const handleRatingChange = useCallback((rating: number) => {
    setNewRating(rating);
  }, []);

  const handleCommentChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(event.target.value);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (offerId) {
      const commentData: CommentData = {
        placeId: offerId,
        comment: {
          comment: newComment,
          rating: newRating
        }
      };

      setIsValidReview(false);

      dispatch(addCommentAction(commentData)).then(() => {
        validateForm();
      });
    }
  };

  useEffect(() => {
    if (!hasError) {
      // Сброс формы
      setNewComment('');
      setNewRating(0);
    }
  }, [hasError]);

  if (!userLogged){
    return null;
  }

  return (
    <form
      className="reviews__form form"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <RatingStars rating={newRating} onRatingChange={handleRatingChange} />
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleCommentChange}
        value={newComment}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <span className="reviews__text-amount">50 characters</span>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValidReview}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
