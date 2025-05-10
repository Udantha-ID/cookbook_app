//package com.example.backend.config;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//import java.io.File;
//
//@Configuration
//public class WebConfig implements WebMvcConfigurer {
//
//    @Value("${file.upload-dir}")
//    private String uploadDir;
//
//    @Override
//    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        // Get absolute path
//        File directory = new File(uploadDir);
//        String absolutePath = directory.getAbsolutePath();
//
//        // Ensure directory exists
//        if (!directory.exists()) {
//            boolean created = directory.mkdirs();
//            System.out.println("Creating upload directory: " + absolutePath + " - Success: " + created);
//        }
//
//        // Log configuration
//        System.out.println("Configuring resource handler for /uploads/**");
//        System.out.println("Upload directory absolute path: " + absolutePath);
//
//        // Configure the resource handler with file: protocol
//        String location = "file:" + absolutePath + File.separator;
//        System.out.println("Resource location: " + location);
//
//        registry.addResourceHandler("/uploads/**")
//               .addResourceLocations(location)
//               .setCachePeriod(3600)
//               .resourceChain(true);
//    }
//
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOrigins("http://localhost:5173") // Your React app's URL
//                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//                .allowedHeaders("*")
//                .allowCredentials(true)
//                .maxAge(3600);
//    }
//}