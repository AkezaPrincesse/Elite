package com.example.elite.controller;

import com.example.elite.models.User;
import com.example.elite.services.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    @GetMapping("/profile/{username}")
    public String userProfile(@PathVariable String username, Model model) {
        User user = userService.findByUsername(username);
        model.addAttribute("user", user);
        return "user/profile";
    }

    @GetMapping("/edit/{username}")
    public String editUser(@PathVariable String username, Model model) {
        User user = userService.findByUsername(username);
        model.addAttribute("user", user);
        return "user/edit";
    }

    @PostMapping("/update")
    public String updateUser(@ModelAttribute User user) {
        userService.save(user);
        return "redirect:/users/profile/" + user.getUsername();
    }
}
