package com.mountbirch.clientmanager.das;

import com.mountbirch.clientmanager.model.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class ClientDataAccessService {

    private final JdbcTemplate jdbcTemplate;

    private RowMapper<Client> mapClientFromDb() {
        return (resultSet, i) -> {
            String clientIdStr = resultSet.getString("client_id");
            UUID clientId = UUID.fromString((clientIdStr));

            String name = resultSet.getString("name");
            String address = resultSet.getString("address");
            String city = resultSet.getString("city");
            String countryCode = resultSet.getString("country_code");
            Double loanAmount = resultSet.getDouble("loan_amount");

            return new Client(
                    clientId,
                    name,
                    address,
                    city,
                    countryCode,
                    loanAmount
            );
        };
    }

    @Autowired
    public ClientDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public int getClientsTableSize() {
        String sql = "SELECT COUNT(*) FROM client";
        return jdbcTemplate.queryForObject(
                sql,
                new Object[]{}, Integer.class);
    }

    public List<Client> selectAllClients() {
        String sql = "SELECT client_id, name, address, city, country_code, loan_amount FROM client";
        return jdbcTemplate.query(sql, mapClientFromDb());
    }

    public int insertClient(UUID clientId, Client client) {
        String sql = "" +
                "INSERT INTO client (" +
                "client_id," +
                "name," +
                "address," +
                "city," +
                "country_code," +
                "loan_amount) " +
                "VALUES (?, ?, ?, ?, ?, ?)";
        return jdbcTemplate.update(
                sql,
                clientId,
                client.getName(),
                client.getAddress(),
                client.getCity(),
                client.getCountryCode().toUpperCase(),
                client.getLoanAmount()
        );
    }

    public int updateClient(Client client) {
        String sql = "" +
                "UPDATE client SET " +
                "name = ?, " +
                "address = ?, " +
                "city = ?, " +
                "country_code = ?, " +
                "loan_amount = ? " +
                "WHERE client_id = ?";
        return jdbcTemplate.update(
                sql,
                client.getName(),
                client.getAddress(),
                client.getCity(),
                client.getCountryCode(),
                client.getLoanAmount(),
                client.getClientId()
        );
    }

    public int deleteClient(UUID uuid) {
        String sql = "" +
                "DELETE FROM client " +
                "WHERE client_id = ?";
        return jdbcTemplate.update(
                sql,
                uuid
        );
    }
}
