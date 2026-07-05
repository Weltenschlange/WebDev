package test;

import java.sql.ResultSet;
import java.sql.SQLException;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

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
    public float APIMin(@PathParam("table") String table, @PathParam("column") String column){

        return min(table, column);
    }
    @GET
    @Path("/max/{table}/{column}")
    public float APIMax(@PathParam("table") String table, @PathParam("column") String column){
        
        return max(table, column);
    }
    @GET
    @Path("/span/{table}/{column}")
    public float APISpan(@PathParam("table") String table, @PathParam("column") String column){
        
        return max(table, column) - min(table, column);
    }

    public float min(String table, String column){
        String query = "SELECT MIN(" + column + ") FROM " + table;

        try {
            ResultSet rs = db.query(query);
            if (rs.next()){
                return rs.getFloat(1);
            }
        } catch (SQLException e) {
            System.out.println(e);
        }

        return 0.0f;
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
        return 0.0f;
    }
}