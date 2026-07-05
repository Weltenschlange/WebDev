package test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class DBConnector {

    Connection db_con;
    Statement stmt;

    String db_url;
    String username;
    String passwort;

    public DBConnector() {

        try {
            // Load jdbc Driver
            Class jdbcDriver = Class.forName("org.postgresql.Driver");

            // Connect to db
            db_url = "jdbc:postgresql://localhost:5432/projektverwaltung";
            username = "projektverwaltung";
            passwort = "projektverwaltung";
        }
        catch(Exception e){
            System.out.println(e);
        }
    }
    
    public ResultSet query(String entry) throws SQLException {
        try {
            db_con = DriverManager.getConnection(db_url, username, passwort);
            stmt = db_con.createStatement();
            ResultSet rs = stmt.executeQuery(entry);
            db_con.close();
            return rs;
        } catch (SQLException e) {
            System.out.println(e);
            throw e;
        }
    }
}

