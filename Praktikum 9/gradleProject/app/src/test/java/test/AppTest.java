package test;

import org.junit.jupiter.api.Test;
import jakarta.ws.rs.ApplicationPath;

import static org.junit.jupiter.api.Assertions.*;

class AppTest {
    @Test
    void appIsExposedUnderApiPath() {
        ApplicationPath applicationPath = App.class.getAnnotation(ApplicationPath.class);

        assertNotNull(applicationPath, "app should declare a JAX-RS application path");
        assertEquals("/api", applicationPath.value());
    }
}
