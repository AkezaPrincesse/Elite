package com.example.elite.controller;

import com.example.elite.models.Property;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import com.example.elite.services.PropertyServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/properties")
public class PropertyController {

    @Autowired
    private PropertyServiceImpl propertyService;

    @GetMapping
    public String listProperties(Model model) {
        List<Property> properties = propertyService.findAll();
        model.addAttribute("properties", properties);
        return "property/list";
    }

    @GetMapping("/add")
    public String showAddForm(Model model) {
        model.addAttribute("property", new Property());
        return "property/add";
    }

    @PostMapping("/save")
    public String saveProperty(@ModelAttribute Property property, RedirectAttributes redirectAttributes) {
        propertyService.save(property);
        redirectAttributes.addFlashAttribute("message", "Property saved successfully!");
        return "redirect:/properties";
    }


    @GetMapping("/edit/{id}")
    public String editProperty(@PathVariable Long id, Model model) {
        Property property = propertyService.findById(id);
        model.addAttribute("property", property);
        return "property/edit";
    }

    @PostMapping("/update")
    public String updateProperty(@ModelAttribute Property property) {
        propertyService.save(property);
        return "redirect:/properties";
    }

    @GetMapping("/delete/{id}")
    public String deleteProperty(@PathVariable Long id) {
        propertyService.deleteById(id);
        return "redirect:/properties";
    }
}
