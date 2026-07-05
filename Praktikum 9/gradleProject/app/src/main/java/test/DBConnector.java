package test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class DBConnector {

    Connection db_con;
    Statement stmt;

    public DBConnector() {

        try {
            // Load jdbc Driver
            Class jdbcDriver = Class.forName("com.mysql.jdbc.Driver");

            // Connect to db
            String db_url = "jdbc:postgresql://localhost:5432/projektverwaltung";
            String username = "projektverwaltung";
            String passwort = "projektverwaltung";
            db_con = DriverManager.getConnection(db_url, username, passwort);
            stmt = db_con.createStatement();
        }
        catch(Exception e){
            System.out.println(e);
        }
    }
    
    public ResultSet query(String entry) throws SQLException {
        try {
            return stmt.executeQuery(entry);
        } catch (SQLException e) {
            System.out.println(e);
            throw e;
        }
    }
}

