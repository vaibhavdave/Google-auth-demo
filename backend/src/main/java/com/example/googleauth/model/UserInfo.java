package com.example.googleauth.model;

public class UserInfo {
    private String name;
    private String email;
    private String picture;
    private String googleId;

    public UserInfo(String name, String email, String picture, String googleId) {
        this.name = name;
        this.email = email;
        this.picture = picture;
        this.googleId = googleId;
    }

    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPicture() { return picture; }
    public String getGoogleId() { return googleId; }
}
