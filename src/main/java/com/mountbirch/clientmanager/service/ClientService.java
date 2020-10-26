package com.mountbirch.clientmanager.service;

import com.mountbirch.clientmanager.model.Client;
import com.mountbirch.clientmanager.das.ClientDataAccessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ClientService {

    private final ClientDataAccessService clientDataAccessService;

    @Autowired
    public ClientService(ClientDataAccessService clientDataAccessService) {
        this.clientDataAccessService = clientDataAccessService;
    }

    public int getClientsTableSize() { return clientDataAccessService.selectAllClients().size(); }

    public List<Client> getAllClients() {
        return clientDataAccessService.selectAllClients();
    }

    public void addNewClient(Client client) {
        clientDataAccessService.insertClient(UUID.randomUUID(), client);
    }

    public void updateClient(Client client) { clientDataAccessService.updateClient(client); }

    public void deleteClient(UUID uuid) { clientDataAccessService.deleteClient(uuid); }
}
