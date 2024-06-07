package com.sunbeaminfo.moviereview.entity;

import java.io.Serializable;

public class Review implements Serializable {
    private int review_id;
    private int movie_id;
    private String review;
    private int rating;
    private int id;

    public Review() {
    }

    public Review(int review_id, int movie_id, String review, int rating, int id) {
        this.review_id = review_id;
        this.movie_id = movie_id;
        this.review = review;
        this.rating = rating;
        this.id = id;
    }

    public int getReview_id() {
        return review_id;
    }

    public void setReview_id(int review_id) {
        this.review_id = review_id;
    }

    public int getMovie_id() {
        return movie_id;
    }

    public void setMovie_id(int movie_id) {
        this.movie_id = movie_id;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Review{" +
                "review_id=" + review_id +
                ", movie_id=" + movie_id +
                ", review='" + review + '\'' +
                ", rating=" + rating +
                ", id=" + id +
                '}';
    }
}
