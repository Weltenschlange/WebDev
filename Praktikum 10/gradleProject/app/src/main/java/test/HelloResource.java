package test;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
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

        try{
            ResultSet rs = min(table, column);
            
            if (rs.next()){
                ResponseBuilder rb = Response.status(200);
                rb.entity("{\"value\": " + rs.getFloat(1) + "}");
                return rb.build();
            }
            else{
                ResponseBuilder rb = Response.status(500);
                rb.entity("{\"error\": " + "no min value found" + "}");
                return rb.build();
            }
        }
        catch (Exception e){
            ResponseBuilder rb = Response.status(500);
            rb.entity("{\"error\": " + e.getMessage() + "}");
            return rb.build();
        }
    }
    @GET
    @Path("/max/{table}/{column}")
    public Response APIMax(@PathParam("table") String table, @PathParam("column") String column){
        try{
            ResultSet rs = max(table, column);
            
            if (rs.next()){
                ResponseBuilder rb = Response.status(200);
                rb.entity("{\"value\": " + rs.getFloat(1) + "}");
                return rb.build();
            }
            else{
                ResponseBuilder rb = Response.status(500);
                rb.entity("{\"error\": " + "no max value found" + "}");
                return rb.build();
            }
        }
        catch (Exception e){
            ResponseBuilder rb = Response.status(500);
            rb.entity("{\"error\": " + e.getMessage() + "}");
            return rb.build();
        }
    }
    @GET
    @Path("/minmaxspan/{table}/{column}")
    public Response minmaxspan(@PathParam("table") String table, @PathParam("column") String column){
        float min;
        float max;
        try{
            ResultSet rsMax = max(table, column);
            ResultSet rsMin = min(table, column);
            
            if (rsMin.next()){
                min = rsMin.getFloat(1);
            }
            else{
                ResponseBuilder rb = Response.status(500);
                rb.entity("{\"error\": " + "no max value found" + "}");
                return rb.build();
            }
            
            if (rsMax.next()){
                max = rsMax.getFloat(1);
            }
            else{
                ResponseBuilder rb = Response.status(500);
                rb.entity("{\"error\": " + "no max value found" + "}");
                return rb.build();
            }

        }
        catch (Exception e){
            ResponseBuilder rb = Response.status(500);
            rb.entity("{\"error\": " + e.getMessage() + "}");
            return rb.build();
        }

        ResponseBuilder rb = Response.status(200);
        Map<String, Float> body = Map.of(
        "min", min,
        "max", max,
        "span", max - min);
        rb.entity(body);

        return rb.build();

    }

    @GET
    @Path("/Projects/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response ProjectsID(@PathParam("id") String projectId) {
        try {
            JsonArrayBuilder projectsArray = Json.createArrayBuilder();

            ResultSet projectRS = db.query("SELECT * FROM \"Projekt\" WHERE id = " + projectId);

            while (projectRS.next()) {
                int id = projectRS.getInt(1);
                String title = projectRS.getString(2);
                String logo = projectRS.getString(3);
                String startdatum = projectRS.getString(4);
                String kurzbeschreibung = projectRS.getString(5);

                JsonArrayBuilder artefactsArray = Json.createArrayBuilder();

                ResultSet artefactRS = db.query(
                    "SELECT a.*, pa.arbeits_zeit FROM \"Artefakt\" a " +
                    "JOIN \"Projekt_Artefakt\" pa ON a.id = pa.artefakt_id " +
                    "WHERE pa.projekt_id = " + id
                );

                while (artefactRS.next()) {
                    int artId = artefactRS.getInt(1);
                    String artTitle = artefactRS.getString(2);
                    String artKurzbeschreibung = artefactRS.getString(3);
                    int artAufgabenbereichsId = artefactRS.getInt(4);
                    int artZeitaufwand = artefactRS.getInt(5);
                    int projArtZeitaufwand = artefactRS.getInt(6);

                    JsonObject artefactObj = Json.createObjectBuilder()
                            .add("id", artId)
                            .add("titel", artTitle)
                            .add("kurzbeschreibung", artKurzbeschreibung)
                            .add("aufgabenbereichsId", artAufgabenbereichsId)
                            .add("zeitaufwand", artZeitaufwand)
                            .add("projektZeitaufwand", projArtZeitaufwand)
                            .build();

                    artefactsArray.add(artefactObj);
                }
                artefactRS.close();

                JsonObject projectObj = Json.createObjectBuilder()
                        .add("id", id)
                        .add("titel", title)
                        .add("logo", logo)
                        .add("startdatum", startdatum)
                        .add("kurzbeschreibung", kurzbeschreibung)
                        .add("artefakte", artefactsArray.build())
                        .build();

                projectsArray.add(projectObj);
            }
            projectRS.close();

            String jsonResult = projectsArray.build().toString();

            ResponseBuilder rb = Response.ok(jsonResult, MediaType.APPLICATION_JSON);
            return rb.build();

        } catch (Exception e) {
            ResponseBuilder rb = Response.status(Response.Status.INTERNAL_SERVER_ERROR);
            rb.entity("{\"error\": \"" + e.getMessage() + "\"}");
            return rb.build();
        }
    }

    @GET
    @Path("/Projects")
    @Produces(MediaType.APPLICATION_JSON)
    public Response Projects() {
        try {
            JsonArrayBuilder projectsArray = Json.createArrayBuilder();

            ResultSet projectRS = db.query("SELECT * FROM \"Projekt\"");

            while (projectRS.next()) {
                int id = projectRS.getInt(1);
                String title = projectRS.getString(2);
                String logo = projectRS.getString(3);
                String startdatum = projectRS.getString(4);
                String kurzbeschreibung = projectRS.getString(5);

                JsonArrayBuilder artefactsArray = Json.createArrayBuilder();

                ResultSet artefactRS = db.query(
                    "SELECT a.*, pa.arbeits_zeit FROM \"Artefakt\" a " +
                    "JOIN \"Projekt_Artefakt\" pa ON a.id = pa.artefakt_id " +
                    "WHERE pa.projekt_id = " + id
                );

                while (artefactRS.next()) {
                    int artId = artefactRS.getInt(1);
                    String artTitle = artefactRS.getString(2);
                    String artKurzbeschreibung = artefactRS.getString(3);
                    int artAufgabenbereichsId = artefactRS.getInt(4);
                    int artZeitaufwand = artefactRS.getInt(5);
                    int projArtZeitaufwand = artefactRS.getInt(6);

                    JsonObject artefactObj = Json.createObjectBuilder()
                            .add("id", artId)
                            .add("titel", artTitle)
                            .add("kurzbeschreibung", artKurzbeschreibung)
                            .add("aufgabenbereichsId", artAufgabenbereichsId)
                            .add("zeitaufwand", artZeitaufwand)
                            .add("projektZeitaufwand", projArtZeitaufwand)
                            .build();

                    artefactsArray.add(artefactObj);
                }
                artefactRS.close();

                JsonObject projectObj = Json.createObjectBuilder()
                        .add("id", id)
                        .add("titel", title)
                        .add("logo", logo)
                        .add("startdatum", startdatum)
                        .add("kurzbeschreibung", kurzbeschreibung)
                        .add("artefakte", artefactsArray.build())
                        .build();

                projectsArray.add(projectObj);
            }
            projectRS.close();

            String jsonResult = projectsArray.build().toString();

            ResponseBuilder rb = Response.ok(jsonResult, MediaType.APPLICATION_JSON);
            return rb.build();

        } catch (Exception e) {
            ResponseBuilder rb = Response.status(Response.Status.INTERNAL_SERVER_ERROR);
            rb.entity("{\"error\": \"" + e.getMessage() + "\"}");
            return rb.build();
        }
    }

    public ResultSet min(String table, String column) throws SQLException{
        String query = "SELECT MIN(" + column + ") FROM \"" + table + "\"";

        try {
            return db.query(query);
        } catch (SQLException e) {
            throw e;
        }
    }

    public ResultSet max(String table, String column) throws SQLException{
        String query = "SELECT MAX(" + column + ") FROM \"" + table + "\"";

        try {
            return db.query(query);
        } catch (SQLException e) {
            throw e;
        }
    }
}