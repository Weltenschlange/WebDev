package test;

import java.sql.ResultSet;
import java.sql.SQLException;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.ResponseBuilder;

import java.sql.*;

// http://localhost:8080/app/db/hello
@Path("/db")
public class HelloResource {

    DBConnector db = new DBConnector();

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String hello() {
        return "Hello from Jakarta REST on Payara";
    }

    @GET
    @Path("/min/{table}/{column}")
    public Response APIMin(@PathParam("table") String table, @PathParam("column") String column){

        return min(table, column);
    }
    @GET
    @Path("/max/{table}/{column}")
    public float APIMax(@PathParam("table") String table, @PathParam("column") String column){
        
        return max(table, column);
    }
    // @GET
    // @Path("/span/{table}/{column}")
    // public float APISpan(@PathParam("table") String table, @PathParam("column") String column){
        
    //     return max(table, column) - min(table, column);
    // }

    public Response min(String table, String column){
        String query = "SELECT MIN(" + column + ") FROM \"" + table + "\"";

        try {
            ResultSet rs = db.query(query);
            if (rs.next()){
                ResponseBuilder rb = Response.status(200);
                rb.entity("{\"value\": " + rs.getFloat(1) + "}");
                return rb.build();
            }
        } catch (SQLException e) {
            System.out.println(e);
            ResponseBuilder rb = Response.status(500);
            rb.entity("{\"error\": " + e + "}");
            return rb.build();
        }

        ResponseBuilder rb = Response.status(500);
        rb.entity("{\"error\": \"This should not appear\"}");
        return rb.build();
    }

    public float max(String table, String column){
        String query = "SELECT MAX(" + column + ") FROM " + table;

        try {
            ResultSet rs = db.query(query);
            if (rs.next()){
                return rs.getFloat(1);
            }
        } catch (SQLException e) {
            System.out.println(e);
        }
        return -169.0f;
    }
}