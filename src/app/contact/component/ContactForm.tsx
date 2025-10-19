"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { toast } from "react-toastify";
import { useState } from "react";

// Updated schema to match Web3Forms expected fields
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().optional(),
  reason: z.string().min(1, "Please select a reason for contacting"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
  agreeToPrivacy: z.boolean().refine(val => val === true, {
    message: "You must agree to the privacy statement"
  })
});

type FormData = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agreeToPrivacy: false
    }
  });

  // Web3Forms submission function
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      
      // Append all form data (Web3Forms expects field values)
      formData.append("access_key", process.env.NEXT_PUBLIC_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE");
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber || "");
      formData.append("reason", data.reason);
      formData.append("message", data.message);
      
      // Additional settings
      formData.append("subject", "New Contact Form Submission from Exel Consultancy");
      formData.append("from_name", "Exel Consultancy Website");
      
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success("Message sent successfully!");
        reset();
      } else {
        console.error("Web3Forms error:", result);
        toast.error("Error sending message. Please try again later.");
      }
    } catch (error: unknown) {
      console.error("Submission error:", error);
      toast.error("Error sending message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-form-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start max-w-7xl mx-auto">
          {/* Your existing image section remains the same */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={`/hero.jpg`} 
                alt="Exel Consultancy - Professional business team working together"
                className="w-full h-[500px] object-cover"
                height={500}
                width={500}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <h3 className="font-bold text-lg mb-1">exel</h3>
                  <p className="text-sm opacity-90">CONSULTANCY</p>
                  <div className="mt-3 bg-white/20 rounded px-3 py-1 text-sm font-medium">
                    HMRC Compliance 100%
                  </div>
                </div>
                <p className="mt-4 text-sm italic">Your Success, Our Priority</p>
              </div>
            </div>
          </div>
          
          {/* Contact Form Section - Updated with Web3Forms integration */}
          <div className="bg-card rounded-2xl shadow-xl p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-3">Get In Touch</h1>
              <p className="text-muted-foreground">
                Whether you need expert consultancy, tailored strategies, or have a 
                quick question, we&apos;re here to help.
              </p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field (combined first + last name) */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-form-label font-medium">
                  Full Name
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="e.g., John Smith"
                  className={`bg-form-input border-border ${errors.name ? 'border-destructive' : ''}`}
                />
                {errors.name && (
                  <p className="text-destructive text-sm">{errors.name.message}</p>
                )}
              </div>
              
              {/* Email and Phone Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-form-label font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="e.g., john.smith@gmail.com"
                    className={`bg-form-input border-border ${errors.email ? 'border-destructive' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm">{errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-form-label font-medium">
                    Phone Number (Optional)
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    {...register("phoneNumber")}
                    placeholder="e.g., +44 700 0000 000"
                    className="bg-form-input border-border"
                  />
                </div>
              </div>
              
              {/* Reason for Contact Dropdown - NEW FIELD */}
              <div className="space-y-2 w-full">
                <Label className="text-form-label font-medium w-full">
                  Reason for Contacting Us
                </Label>
                <Select onValueChange={(value) => setValue("reason", value)}>
                  <SelectTrigger className={`bg-form-input border-border w-full ${errors.reason ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="request-demo">Request a demo</SelectItem>
                    <SelectItem value="get-quote">Get a quote</SelectItem>
                    <SelectItem value="speak-to-expert">Speak to an expert</SelectItem>
                    <SelectItem value="free-consultation">Free consultation</SelectItem>
                  </SelectContent>
                </Select>
                {errors.reason && (
                  <p className="text-destructive text-sm">{errors.reason.message}</p>
                )}
              </div>
              
              {/* Existing Discussion Topic Dropdown - Keep this if you want both */}
              <div className="space-y-2 w-full">
                <Label className="text-form-label font-medium w-full">
                  What would you like to discuss?
                </Label>
                <Select onValueChange={(value) => setValue("message", value)}>
                  <SelectTrigger className="bg-form-input border-border w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consultation">General Consultation</SelectItem>
                    <SelectItem value="hmrc-compliance">HMRC Compliance</SelectItem>
                    <SelectItem value="tax-planning">Tax Planning</SelectItem>
                    <SelectItem value="business-setup">Business Setup</SelectItem>
                    <SelectItem value="accounting">Accounting Services</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Message Textarea */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-form-label font-medium">
                  Leave us a message
                </Label>
                <Textarea
                  id="message"
                  {...register("message")}
                  placeholder="Write your message here..."
                  rows={4}
                  className={`bg-form-input border-border resize-none ${errors.message ? 'border-destructive' : ''}`}
                />
                {errors.message && (
                  <p className="text-destructive text-sm">{errors.message.message}</p>
                )}
              </div>
              
              {/* Privacy Checkbox */}
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="agreeToPrivacy"
                  checked={watch("agreeToPrivacy")}
                  onCheckedChange={(checked) => setValue("agreeToPrivacy", checked as boolean)}
                  className={errors.agreeToPrivacy ? 'border-destructive' : ''}
                />
                <div className="space-y-1">
                  <Label 
                    htmlFor="agreeToPrivacy"
                    className="text-sm text-form-label leading-relaxed cursor-pointer"
                  >
                    By checking this box and clicking &quot;Send Message&quot;, you are agreeing to Exel&apos;s Privacy Statement
                  </Label>
                  {errors.agreeToPrivacy && (
                    <p className="text-destructive text-sm">{errors.agreeToPrivacy.message}</p>
                  )}
                </div>
              </div>
              
              {/* Submit Button */}
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-lg transition-colors"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
        
        {/* Your existing "Other Ways to Reach Us" section remains unchanged */}
        <div className="max-w-7xl mx-auto mt-16">
          {/* ... keep your existing contact information section ... */}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;