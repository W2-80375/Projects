package com.sunbeaminfo.moviereview.entity;

import java.io.Serializable;

public class Movie implements Serializable {
    private  int movie_id;
    private String title;
    private String image;
    private String release_date;
    private float rating;
    private String description;
    private String duration;
    private String language;

    public Movie() {
    }

    public Movie(int movie_id, String title, String image, String release_date, float rating, String description, String duration, String language) {
        this.movie_id = movie_id;
        this.title = title;
        this.image = image;
        this.release_date = release_date;
        this.rating = rating;
        this.description = description;
        this.duration = duration;
        this.language = language;
    }

    public int getMovie_id() {
        return movie_id;
    }

    public void setMovie_id(int movie_id) {
        this.movie_id = movie_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getRelease_date() {
        return release_date;
    }

    public void setRelease_date(String release_date) {
        this.release_date = release_date;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    @Override
    public String toString() {
        return "Movie{" +
                "movie_id=" + movie_id +
                ", title='" + title + '\'' +
                ", image='" + image + '\'' +
                ", release_date='" + release_date + '\'' +
                ", rating=" + rating +
                ", description='" + description + '\'' +
                ", duration='" + duration + '\'' +
                ", language='" + language + '\'' +
                '}';
    }
}
