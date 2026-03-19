package com.example.googleauth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats(@AuthenticationPrincipal OAuth2User principal) {
        return ResponseEntity.ok(Map.of(
            "user", principal.getAttribute("name"),
            "stats", Map.of(
                "loginMethod", "Google OAuth2",
                "sessionActive", true,
                "features", List.of("Google SSO", "Secure Sessions", "REST API")
            )
        ));
    }

    @GetMapping("/messages")
    public ResponseEntity<List<Map<String, String>>> getMessages(@AuthenticationPrincipal OAuth2User principal) {
        String userName = principal.getAttribute("name");
        return ResponseEntity.ok(List.of(
            Map.of("id", "1", "text", "Welcome, " + userName + "! You've signed in with Google."),
            Map.of("id", "2", "text", "Your account is verified via Google OAuth2."),
            Map.of("id", "3", "text", "No need to manage passwords — Google handles authentication.")
        ));
    }
}
