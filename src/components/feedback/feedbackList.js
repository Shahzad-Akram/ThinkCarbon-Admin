import React from 'react';
import { Feedback } from '../../views/feedback';

export default function FeedbackList({ feedbacks }) {
  return (
    <>
      {feedbacks.map((feedback) => (
        <Feedback feedback={feedback} />
      ))}
    </>
  );
}
