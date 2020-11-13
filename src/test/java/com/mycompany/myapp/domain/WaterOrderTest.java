package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class WaterOrderTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WaterOrder.class);
        WaterOrder waterOrder1 = new WaterOrder();
        waterOrder1.setId(1L);
        WaterOrder waterOrder2 = new WaterOrder();
        waterOrder2.setId(waterOrder1.getId());
        assertThat(waterOrder1).isEqualTo(waterOrder2);
        waterOrder2.setId(2L);
        assertThat(waterOrder1).isNotEqualTo(waterOrder2);
        waterOrder1.setId(null);
        assertThat(waterOrder1).isNotEqualTo(waterOrder2);
    }
}
