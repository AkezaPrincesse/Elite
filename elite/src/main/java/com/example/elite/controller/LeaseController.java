package com.example.elite.controller;

import com.example.elite.models.Lease;
import com.example.elite.services.LeaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/leases")
public class LeaseController {

    @Autowired
    private LeaseServiceImpl leaseService;

    @GetMapping
    public String listLeases(Model model) {
        List<Lease> leases = leaseService.findAll();
        model.addAttribute("leases", leases);
        return "lease/list";
    }

    @GetMapping("/add")
    public String showAddForm(Model model) {
        model.addAttribute("lease", new Lease());
        return "lease/add";
    }

    @PostMapping("/save")
    public String saveLease(@ModelAttribute Lease lease) {
        leaseService.save(lease);
        return "redirect:/leases";
    }

    @GetMapping("/edit/{id}")
    public String editLease(@PathVariable Long id, Model model) {
        Lease lease = leaseService.findById(id);
        model.addAttribute("lease", lease);
        return "lease/edit";
    }

    @PostMapping("/update")
    public String updateLease(@ModelAttribute Lease lease) {
        leaseService.save(lease);
        return "redirect:/leases";
    }

    @GetMapping("/delete/{id}")
    public String deleteLease(@PathVariable Long id) {
        leaseService.deleteById(id);
        return "redirect:/leases";
    }
}
