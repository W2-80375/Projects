package com.sunbeaminfo.moviereview.api;

import com.google.gson.JsonObject;
import com.sunbeaminfo.moviereview.entity.Booking;
import com.sunbeaminfo.moviereview.entity.Review;
import com.sunbeaminfo.moviereview.entity.Share;
import com.sunbeaminfo.moviereview.entity.User;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface API {
    public static final String BASE_URL="http://192.168.133.26:3000";

    @POST("/user/register")
    public Call<JsonObject> registerUser(@Body User user);

    @POST("/user/login")
    public Call<JsonObject> loginUser(@Body User user);

    @GET("/theater/")
    public Call<JsonObject>
    getTheaters();


    @GET("/theater/{movie_id}")
    public Call<JsonObject> getTheatersId(@Path("movie_id") int movie_id);

    @GET("/user/{id}")
    public Call<JsonObject> getUser(@Path("id") int id);

    @GET("/user/")
    public Call<JsonObject> getAllUsers();

    @GET("/movie/")
    public Call<JsonObject> getAllMovies();



    @GET("/booking/")
    public Call<JsonObject> bookTickets(String yourBookingEndpoint, Booking bookingRequest);
}

