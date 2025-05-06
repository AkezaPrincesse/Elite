package com.example.elite.controller;

import com.example.elite.models.Property;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import com.example.elite.services.PropertyServiceImpl;

@Controller
@RequestMapping("/admin/properties")
public class AdminPropertyController {
    @Autowired
    private PropertyServiceImpl propertyService;

    @GetMapping
    public String viewProperties(Model model) {
        model.addAttribute("properties", propertyService.findAll());
        return "admin/properties";
    }

    @GetMapping("/add")
    public String addPropertyForm(Model model) {
        model.addAttribute("property", new Property());
        return "admin/add_property";
    }

    @PostMapping("/add")
    public String saveProperty(@ModelAttribute Property property, RedirectAttributes redirectAttributes) {
        propertyService.save(property);
        redirectAttributes.addFlashAttribute("success", "Property added successfully!");
        return "redirect:/admin/properties";
    }
}
