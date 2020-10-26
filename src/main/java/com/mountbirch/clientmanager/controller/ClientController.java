package com.mountbirch.clientmanager.controller;

import com.mountbirch.clientmanager.model.Client;
import com.mountbirch.clientmanager.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("api/clients")
public class ClientController {

    private final ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping
    public int getClientsTableSize() {
        return clientService.getClientsTableSize();
    }

    @GetMapping(path = "{startIndex}/{endIndex}")
    public List<Client> getAllClients(
            @PathVariable("startIndex") Integer startIndex,
            @PathVariable("endIndex") Integer endIndex) {
        if (startIndex < 0) {
            startIndex = 0;
        } else if (startIndex > endIndex) {
            startIndex = endIndex;
        }

        return clientService.getAllClients().subList(
                Math.min(startIndex, clientService.getAllClients().size()),
                Math.min(endIndex, clientService.getAllClients().size()));
    }

    @PostMapping
    public void addNewClient(@RequestBody @Valid Client client) { clientService.addNewClient(client); }

    @PutMapping
    public void updateClient(@RequestBody @Valid Client client) {
        clientService.updateClient(client);
    }

    @DeleteMapping(path = "{clientId}")
    public void deleteClient(@PathVariable("clientId") UUID clientId) {
        clientService.deleteClient(clientId);
    }
}
