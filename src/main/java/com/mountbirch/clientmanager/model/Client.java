package com.mountbirch.clientmanager.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.format.annotation.NumberFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.UUID;

@Entity
@Table(name = "Client")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private UUID clientId;

    @NotBlank
    @Size(max=255)
    private String name;

    @NotBlank
    @Size(max=255)
    private String address;

    @NotBlank
    @Size(max=255)
    private String city;

    @NotBlank
    @Size(max=3)
    private String countryCode;

    @NotNull
    @NumberFormat
    private Double loanAmount;

    public Client() {
    }

    public Client(
            @JsonProperty("clientId") UUID clientId,
            @JsonProperty("name") String name,
            @JsonProperty("address") String address,
            @JsonProperty("city") String city,
            @JsonProperty("countryCode") String countryCode,
            @JsonProperty("loanAmount") Double loanAmount) {
        this.clientId = clientId;
        this.name = name;
        this.address = address;
        this.city = city;
        this.countryCode = countryCode;
        this.loanAmount = loanAmount;
    }

    public UUID getClientId() {
        return clientId;
    }

    public String getName() {
        return name;
    }

    public String getAddress() {
        return address;
    }

    public String getCity() {
        return city;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public Double getLoanAmount() {
        return loanAmount;
    }
}
