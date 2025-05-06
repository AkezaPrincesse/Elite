package com.example.elite.controller;

import com.example.elite.models.Payment;
import com.example.elite.services.PaymentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private PaymentServiceImpl paymentService;

    @GetMapping
    public String listPayments(Model model) {
        List<Payment> payments = paymentService.findAll();
        model.addAttribute("payments", payments);
        return "payment/list";
    }

    @GetMapping("/add")
    public String showAddForm(Model model) {
        model.addAttribute("payment", new Payment());
        return "payment/add";
    }

    @PostMapping("/save")
    public String savePayment(@ModelAttribute Payment payment) {
        paymentService.save(payment);
        return "redirect:/payments";
    }

    @GetMapping("/edit/{id}")
    public String editPayment(@PathVariable Long id, Model model) {
        Payment payment = paymentService.findById(id);
        model.addAttribute("payment", payment);
        return "payment/edit";
    }

    @PostMapping("/update")
    public String updatePayment(@ModelAttribute Payment payment) {
        paymentService.save(payment);
        return "redirect:/payments";
    }

    @GetMapping("/delete/{id}")
    public String deletePayment(@PathVariable Long id) {
        paymentService.deleteById(id);
        return "redirect:/payments";
    }
}
