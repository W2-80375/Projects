package com.sunbeaminfo.moviereview.entity;

import java.io.Serializable;

public class Theatre implements Serializable {

    private String theatre_name;
    private int movie_id;
    private String address;

    private int total_seats;
    private float rating;

    private String title ;

    public Theatre() {
    }

    public Theatre(String theatre_name, int movie_id, String address, int total_seats, float rating, String title) {
        this.theatre_name = theatre_name;
        this.movie_id = movie_id;
        this.address = address;
        this.total_seats = total_seats;
        this.rating = rating;
        this.title = title;
    }

    public String getTheatre_name() {
        return theatre_name;
    }

    public void setTheatre_name(String theatre_name) {
        this.theatre_name = theatre_name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getTotal_seats() {
        return total_seats;
    }

    public void setTotal_seats(int total_seats) {
        this.total_seats = total_seats;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getMovie_id() {
        return movie_id;
    }

    public void setMovie_id(int movie_id) {
        this.movie_id = movie_id;
    }

    @Override
    public String toString() {
        return "Theatre{" +
                "theatre_name='" + theatre_name + '\'' +
                ", movie_id=" + movie_id +
                ", address='" + address + '\'' +
                ", total_seats=" + total_seats +
                ", rating=" + rating +
                ", title='" + title + '\'' +
                '}';
    }

    public String getId() {
        return theatre_name;
    }
}
